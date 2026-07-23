from pathlib import Path

import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder


# ==================================================
# Paths
# ==================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_PATH = BASE_DIR / "data" / "raw" / "Fraud.csv"

MODEL_PATH = BASE_DIR / "models_saved" / "fraud_model.pkl"

ENCODER_PATH = BASE_DIR / "models_saved" / "label_encoder.pkl"

# ==================================================
# Load Dataset
# ==================================================

def load_data():

    print("=" * 60)
    print("Loading Fraud Dataset...")
    print("=" * 60)

    df = pd.read_csv(DATA_PATH)

    print("Dataset Loaded Successfully!")

    # ------------------------------------------
    # Use a smaller sample while developing
    # Remove this line later to train on all data
    # ------------------------------------------

    df = df.sample(
        n=200000,
        random_state=42,
    )

    return df


# ==================================================
# Explore Dataset
# ==================================================

def explore_data(df):

    print("\nDataset Shape:")
    print(df.shape)

    print("\nMissing Values")
    print(df.isnull().sum())

    print("\nFraud Distribution")
    print(df["isFraud"].value_counts())


# ==================================================
# Data Preprocessing
# ==================================================

def preprocess_data(df):

    print("\nPreprocessing dataset...")

    # Remove account identifiers

    df = df.drop(
        columns=[
            "nameOrig",
            "nameDest",
        ]
    )

    # Encode transaction type

    encoder = LabelEncoder()

    df["type"] = encoder.fit_transform(df["type"])

    joblib.dump(
        encoder,
        ENCODER_PATH,
    )

    print("\nLabel Encoder saved successfully!")

    # Features

    X = df.drop(
        columns=[
            "isFraud",
            "step",
        ]
    )

    # Target

    y = df["isFraud"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.20,
        random_state=42,
        stratify=y,
    )

    print(f"\nTraining samples : {len(X_train)}")
    print(f"Testing samples  : {len(X_test)}")

    return X_train, X_test, y_train, y_test


# ==================================================
# Train Model
# ==================================================

def train_model(
    X_train,
    X_test,
    y_train,
    y_test,
):

    print("\n" + "=" * 60)
    print("TRAINING RANDOM FOREST MODEL")
    print("=" * 60)

    model = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced",
    )

    model.fit(
        X_train,
        y_train,
    )

    predictions = model.predict(X_test)

    print("\nModel Performance")
    print("-" * 40)

    print(f"Accuracy : {accuracy_score(y_test, predictions):.4f}")
    print(f"Precision: {precision_score(y_test, predictions):.4f}")
    print(f"Recall   : {recall_score(y_test, predictions):.4f}")
    print(f"F1 Score : {f1_score(y_test, predictions):.4f}")

    print("\nClassification Report")
    print(classification_report(y_test, predictions))

    print("\nConfusion Matrix")
    print(confusion_matrix(y_test, predictions))

    return model


# ==================================================
# Save Model
# ==================================================

def save_model(model):

    MODEL_PATH.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        model,
        MODEL_PATH,
    )

    print("\nModel saved successfully!")
    print(MODEL_PATH)


# ==================================================
# Main
# ==================================================

if __name__ == "__main__":

    dataframe = load_data()

    explore_data(dataframe)

    X_train, X_test, y_train, y_test = preprocess_data(dataframe)

    model = train_model(
        X_train,
        X_test,
        y_train,
        y_test,
    )

    save_model(model)

    print("\nTraining pipeline completed successfully!")