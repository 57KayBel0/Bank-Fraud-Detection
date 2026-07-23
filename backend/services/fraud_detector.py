from pathlib import Path
from database.crud import save_prediction

import joblib
import pandas as pd


BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "models_saved" / "fraud_model.pkl"
ENCODER_PATH = BASE_DIR / "models_saved" / "label_encoder.pkl"


class FraudDetector:

    def __init__(self):

        print("Loading trained fraud detection model...")

        self.model = joblib.load(MODEL_PATH)
        self.encoder = joblib.load(ENCODER_PATH)

        print("Model loaded successfully!")

    def predict(self, data: dict):

        # Create DataFrame from request
        df = pd.DataFrame([data])

        # Encode transaction type
        df["type"] = self.encoder.transform(df["type"])

        # Ensure feature order matches training
        df = df[
            [
                "type",
                "amount",
                "oldbalanceOrg",
                "newbalanceOrig",
                "oldbalanceDest",
                "newbalanceDest",
                "isFlaggedFraud",
            ]
        ]

        # Predict
        prediction = self.model.predict(df)[0]

        probability = self.model.predict_proba(df)[0][1]

        prediction_text = (
            "Fraud"
            if prediction == 1
            else "Legitimate"
        )

        save_prediction(
            transaction_type=data["type"],
            amount=data["amount"],
            old_balance=data["oldbalanceOrg"],
            new_balance=data["newbalanceOrig"],
            prediction=prediction_text,
            probability=float(probability),
        )

        return {
            "prediction": prediction_text,
            "probability": round(float(probability), 4),
        }