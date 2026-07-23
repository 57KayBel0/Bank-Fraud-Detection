from pathlib import Path

import joblib
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from tabulate import tabulate

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
    ConfusionMatrixDisplay,
    RocCurveDisplay,

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

REPORT_DIR = BASE_DIR / "reports" / "images"

REPORT_DIR.mkdir(
    parents=True,
    exist_ok=True,
)

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

def evaluate_model(
    model,
    name,
    X_train,
    X_test,
    y_train,
    y_test,
):

    print("\n" + "=" * 60)
    print(f"TRAINING {name.upper()}")
    print("=" * 60)

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    probabilities = model.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)
    probabilities = model.predict_proba(X_test)[:, 1]

    roc = roc_auc_score(y_test, probabilities)

# -------------------------------
# Confusion Matrix
# -------------------------------

    ConfusionMatrixDisplay.from_predictions(
        y_test,
        predictions,
    )

    plt.title(f"{name} Confusion Matrix")

    plt.savefig(
        REPORT_DIR / f"{name}_confusion_matrix.png"
    )

    plt.close()

    # -------------------------------
    # ROC Curve
    # -------------------------------

    RocCurveDisplay.from_predictions(
        y_test,
        probabilities,
    )

    plt.title(f"{name} ROC Curve")

    plt.savefig(
        REPORT_DIR / f"{name}_roc_curve.png"
    )

    plt.close()

    return {
        "name": name,
        "model": model,
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1": f1,
        "roc": roc,
    }


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

    rf = RandomForestClassifier(
        n_estimators=100,
        random_state=42,
        n_jobs=-1,
        class_weight="balanced",
    )

    xgb = XGBClassifier(
        n_estimators=200,
        max_depth=6,
        learning_rate=0.1,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        eval_metric="logloss",
    )

    rf_result = evaluate_model(
        rf,
        "Random Forest",
        X_train,
        X_test,
        y_train,
        y_test,
    )

    xgb_result = evaluate_model(
        xgb,
        "XGBoost",
        X_train,
        X_test,
        y_train,
        y_test,
    )

    results = [rf_result, xgb_result]

    print("\n")
    print("=" * 75)
    print("MODEL COMPARISON")
    print("=" * 75)

    table = []

    for r in results:
        table.append([
            r["name"],
            round(r["accuracy"], 4),
            round(r["precision"], 4),
            round(r["recall"], 4),
            round(r["f1"], 4),
            round(r["roc"], 4),
        ])

    print(
        tabulate(
            table,
            headers=[
                "Model",
                "Accuracy",
                "Precision",
                "Recall",
                "F1",
                "ROC-AUC",
            ],
            tablefmt="fancy_grid",
        )
    )

    best = max(results, key=lambda x: x["f1"])

    print(f"\nBest Model: {best['name']}")

    save_model(best["model"])