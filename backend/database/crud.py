from database.database import SessionLocal
from database.models import Prediction
from collections import defaultdict

def save_prediction(
    transaction_type,
    amount,
    old_balance,
    new_balance,
    prediction,
    probability,
):
    db = SessionLocal()

    try:
        record = Prediction(
            transaction_type=transaction_type,
            amount=amount,
            old_balance=old_balance,
            new_balance=new_balance,
            prediction=prediction,
            probability=probability,
        )

        db.add(record)
        db.commit()

    finally:
        db.close()


def get_predictions():

    db = SessionLocal()

    try:

        predictions = (
            db.query(Prediction)
            .order_by(Prediction.id.desc())
            .all()
        )

        return predictions

    finally:

        db.close()

def get_dashboard_stats():

    db = SessionLocal()

    try:

        predictions = db.query(Prediction).all()

        total = len(predictions)

        fraud = sum(
            1
            for p in predictions
            if p.prediction == "Fraud"
        )

        legitimate = total - fraud

        fraud_rate = (
            round((fraud / total) * 100, 2)
            if total > 0
            else 0
        )

        return {
            "transactions": total,
            "fraud_cases": fraud,
            "legitimate_cases": legitimate,
            "fraud_rate": fraud_rate,
            "model": "XGBoost",
            "model_accuracy": 99.97,
        }

    finally:

        db.close()
def get_chart_data():

    db = SessionLocal()

    try:

        predictions = db.query(Prediction).all()

        fraud = sum(
            1
            for p in predictions
            if p.prediction == "Fraud"
        )

        legitimate = sum(
            1
            for p in predictions
            if p.prediction == "Legitimate"
        )

        return {
            "fraud": fraud,
            "legitimate": legitimate,
        }

    finally:

        db.close()


def get_fraud_trend():

    db = SessionLocal()

    try:

        predictions = db.query(Prediction).all()

        trend = defaultdict(int)

        for prediction in predictions:

            day = prediction.created_at.strftime("%Y-%m-%d")

            if prediction.prediction == "Fraud":

                trend[day] += 1

        data = []

        for day in sorted(trend.keys()):

            data.append({
                "day": day,
                "fraud": trend[day],
            })

        return data

    finally:

        db.close()