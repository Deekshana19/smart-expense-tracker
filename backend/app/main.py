from fastapi import FastAPI
from sqlalchemy import text
from app.routes.expense_routes import router as expense_router
from app.database.database import Base, engine
from app.models.expense import Expense
from fastapi.middleware.cors import CORSMiddleware
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.analytics_routes import router as analytics_router
from app.routes.ai_insights_routes import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Smart Expense Tracker API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
       "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(expense_router)
app.include_router(dashboard_router)
app.include_router(analytics_router)
app.include_router(ai_router)

@app.get("/")
def home():
    return {"message": "Smart Expense Tracker Backend Running"}

@app.get("/test-db")
def test_db():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "success",
            "message": "Database connected successfully"
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }