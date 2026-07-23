from fastapi import APIRouter
from sqlalchemy import func

from database.database import SessionLocal
from database.models import Prediction

router = APIRouter()


@router.get("/charts")
def get_chart_data():

    db = SessionLocal()

    try:

        predictions = db.query(Prediction).all()

        legitimate = db.query(Prediction).filter(
            Prediction.prediction == "Legitimate"
        ).count()

        fraud = db.query(Prediction).filter(
            Prediction.prediction == "Fraud"
        ).count()

        trend = (
            db.query(
                func.date(Prediction.created_at),
                func.count(Prediction.id),
            )
            .group_by(func.date(Prediction.created_at))
            .all()
        )

        line_data = [
            {
                "day": str(day),
                "fraud": count,
            }
            for day, count in trend
        ]

        pie_data = [
            {
                "name": "Legitimate",
                "value": legitimate,
            },
            {
                "name": "Fraud",
                "value": fraud,
            },
        ]

        return {
            "line": line_data,
            "pie": pie_data,
        }

    finally:

        db.close()