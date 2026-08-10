from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import SessionLocal
from database.models import Prediction

router = APIRouter(
    prefix="/alerts",
    tags=["Alerts"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def get_alerts(db: Session = Depends(get_db)):

    alerts = (
        db.query(Prediction)
        .filter(Prediction.prediction == "Fraud")
        .order_by(Prediction.created_at.desc())
        .limit(20)
        .all()
    )

    return alerts