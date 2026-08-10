from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, case

from database.database import SessionLocal
from database.models import Prediction

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def get_analytics(db: Session = Depends(get_db)):
    total = db.query(Prediction).count()

    fraud = (
        db.query(Prediction)
        .filter(Prediction.prediction == "Fraud")
        .count()
    )

    legitimate = total - fraud

    fraud_rate = round((fraud / total) * 100, 2) if total else 0

    # Pie chart
    pie = [
        {
            "name": "Legitimate",
            "value": legitimate,
        },
        {
            "name": "Fraud",
            "value": fraud,
        },
    ]

    # Line chart
    trend_query = (
        db.query(
            func.date(Prediction.created_at).label("day"),
            func.sum(
                case(
                    (Prediction.prediction == "Fraud", 1),
                    else_=0,
                )
            ).label("fraud")
        )
        .group_by(func.date(Prediction.created_at))
        .order_by(func.date(Prediction.created_at))
        .all()
    )

    trend = [
        {
            "day": str(day),
            "fraud": int(fraud_count or 0),
        }
        for day, fraud_count in trend_query
    ]

    return {
        "transactions": total,
        "fraud_cases": fraud,
        "legitimate_cases": legitimate,
        "fraud_rate": fraud_rate,
        "model_accuracy": 99.97,

        # Charts
        "pie": pie,
        "trend": trend,
    }