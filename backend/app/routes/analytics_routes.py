from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.models.expense import Expense

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/category-breakdown")
def category_breakdown(
    db: Session = Depends(get_db)
):
    result = (
        db.query(
            Expense.category,
            func.sum(Expense.amount)
        )
        .group_by(Expense.category)
        .all()
    )

    return [
        {
            "category": row[0],
            "amount": float(row[1])
        }
        for row in result
    ]

@router.get("/monthly-summary")
def monthly_summary(
    db: Session = Depends(get_db)
):
    result = (
        db.query(
            Expense.expense_date,
            func.sum(Expense.amount)
        )
        .group_by(Expense.expense_date)
        .order_by(Expense.expense_date)
        .all()
    )

    return [
        {
            "date": str(row[0]),
            "amount": float(row[1])
        }
        for row in result
    ]