from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
)

from sqlalchemy.orm import declarative_base

from datetime import datetime

Base = declarative_base()


class Prediction(Base):

    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)

    transaction_type = Column(String)

    amount = Column(Float)

    old_balance = Column(Float)

    new_balance = Column(Float)

    prediction = Column(String)

    probability = Column(Float)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )