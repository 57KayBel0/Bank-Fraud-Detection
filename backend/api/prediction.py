from fastapi import APIRouter

from models.fraud_request import FraudRequest
from services.fraud_detector import FraudDetector
from database.crud import (
    get_predictions,
    get_dashboard_stats,
    get_chart_data,
    get_fraud_trend,
)

print("FraudRequest annotations:", FraudRequest.__annotations__)

router = APIRouter()

detector = FraudDetector()


@router.post("/predict")
def predict(request: FraudRequest):
    result = detector.predict(request.model_dump())
    return result

@router.get("/history")
def history():

    predictions = get_predictions()

    return [
        {
            "id": p.id,
            "transaction_type": p.transaction_type,
            "amount": p.amount,
            "prediction": p.prediction,
            "probability": p.probability,
            "created_at": p.created_at,
        }
        for p in predictions
    ]

@router.get("/dashboard")
def dashboard():

    return get_dashboard_stats()


@router.get("/fraud-trend")
def fraud_trend():

    return get_fraud_trend()