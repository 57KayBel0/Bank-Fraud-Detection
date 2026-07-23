from fastapi import APIRouter

router = APIRouter()


@router.get("/dashboard")
def dashboard():

    return {
        "transactions": 200000,
        "fraud_cases": 268,
        "accuracy": 99.96,
        "model": "Random Forest",
    }