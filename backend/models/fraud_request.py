from pydantic import BaseModel


class FraudRequest(BaseModel):

    type: str

    amount: float

    oldbalanceOrg: float

    newbalanceOrig: float

    oldbalanceDest: float

    newbalanceDest: float

    isFlaggedFraud: int