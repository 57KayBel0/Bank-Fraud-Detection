from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.dashboard import router as dashboard_router
from api.prediction import router as prediction_router
from api.charts import router as charts_router

from database.database import engine
from database.models import Base

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
        "http://localhost:5173",
        "https://your-vercel-app.vercel.app",  # Change later
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