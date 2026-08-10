from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.dashboard import router as dashboard_router
from api.prediction import router as prediction_router
from api.charts import router as charts_router

from database.database import engine
from database.models import Base

from api.analytics import router as analytics_router
from api.alerts import router as alerts_router
from api.model import router as model_router

app = FastAPI(
    title="Bank Fraud Detection API",
    version="1.0.0",
)


@app.on_event("startup")
def startup():
    print("=== STARTUP: Creating database tables ===")
    Base.metadata.create_all(bind=engine)
    print("=== STARTUP: Database tables checked/created ===")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Local development
        "https://bank-fraud-detection-five.vercel.app",   # Your deployed frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(charts_router)
app.include_router(analytics_router)
app.include_router(alerts_router)
app.include_router(model_router)


@app.get("/")
def root():
    return {
        "message": "Bank Fraud Detection API is running."
    }