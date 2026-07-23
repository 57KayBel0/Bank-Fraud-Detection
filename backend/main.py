from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.dashboard import router as dashboard_router
from api.prediction import router as prediction_router
from api.charts import router as charts_router

from database.database import engine
from database.models import Base

# Create database tables if they don't exist
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bank Fraud Detection API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router)
app.include_router(dashboard_router)
app.include_router(charts_router)


@app.get("/")
def root():
    return {
        "message": "Bank Fraud Detection API is running."
    }