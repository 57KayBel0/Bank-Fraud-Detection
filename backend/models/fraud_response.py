from pydantic import BaseModel


class FraudResponse(BaseModel):
    prediction: str
    probability: float