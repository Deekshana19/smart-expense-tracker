from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.models.expense import Expense

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/total-expenses")
def get_total_expenses(
    db: Session = Depends(get_db)
):
    total = db.query(
        func.sum(Expense.amount)
    ).scalar()

    return {
        "total_expenses": total or 0
    }

@router.get("/expense-count")
def get_expense_count(
    db: Session = Depends(get_db)
):
    count = db.query(
        Expense
    ).count()

    return {
        "count": count
    }

@router.get("/category-summary")
def get_category_summary(
    db: Session = Depends(get_db)
):
    result = (
        db.query(
            Expense.category,
            func.sum(Expense.amount)
        )
        .group_by(
            Expense.category
        )
        .all()
    )

    return [
        {
            "category": row[0],
            "total": float(row[1])
        }
        for row in result
    ]