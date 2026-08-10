from fastapi import APIRouter

router = APIRouter(
    prefix="/model",
    tags=["Model"],
)


@router.get("")
def model_information():

    return {

        "name": "XGBoost",

        "status": "Active",

        "version": "1.0.0",

        "accuracy": 99.97,

        "precision": 99.91,

        "recall": 99.84,

        "f1_score": 99.88,

        "dataset": "6.3 Million Transactions",

        "framework": "FastAPI",

        "database": "PostgreSQL",

        "frontend": "React"

    }