from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.session import get_db
from app.models.expense import Expense

router = APIRouter(
    prefix="/ai-insights",
    tags=["AI Insights"]
)


@router.get("/")
def generate_insights(
    db: Session = Depends(get_db)
):

    expenses = db.query(Expense).all()

    if not expenses:
        return {
            "insights": [
                "No expense data available."
            ]
        }

    total_expenses = sum(
        expense.amount
        for expense in expenses
    )

    total_transactions = len(expenses)

    average_expense = (
        total_expenses / total_transactions
    )

    category_data = (
        db.query(
            Expense.category,
            func.sum(Expense.amount)
        )
        .group_by(Expense.category)
        .all()
    )

    top_category = max(
        category_data,
        key=lambda x: x[1]
    )

    insights = [
        f"Total spending is ₹{total_expenses:.2f}.",
        f"Total transactions recorded: {total_transactions}.",
        f"Average transaction amount is ₹{average_expense:.2f}.",
        f"{top_category[0]} is your highest spending category.",
        f"You spent ₹{top_category[1]:.2f} on {top_category[0]}.",
        f"Reducing {top_category[0]} spending by 10% could save ₹{top_category[1] * 0.1:.2f}."
    ]

    return {
        "insights": insights
    }