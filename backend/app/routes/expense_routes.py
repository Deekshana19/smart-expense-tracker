from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.expense import Expense
from app.schemas.expenses import ExpenseCreate, ExpenseResponse,ExpenseUpdate

router = APIRouter(
    prefix="/expenses",
    tags=["Expenses"]
)


@router.post("/", response_model=ExpenseResponse)
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db)
):
    new_expense = Expense(
        amount=expense.amount,
        description=expense.description,
        category=expense.category,
        payment_method=expense.payment_method,
        expense_date=expense.expense_date
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense
@router.get("/", response_model=list[ExpenseResponse])
def get_expenses(
    db: Session = Depends(get_db)
):
    expenses = db.query(Expense).all()

    return expenses
@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense_by_id(
    expense_id: int,
    db: Session = Depends(get_db)
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return expense

@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    expense_data: ExpenseUpdate,
    db: Session = Depends(get_db)
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    expense.amount = expense_data.amount
    expense.description = expense_data.description
    expense.category = expense_data.category
    expense.payment_method = expense_data.payment_method
    expense.expense_date = expense_data.expense_date

    db.commit()
    db.refresh(expense)

    return expense

@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db)
):
    expense = (
        db.query(Expense)
        .filter(Expense.id == expense_id)
        .first()
    )

    if not expense:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    db.delete(expense)
    db.commit()

    return {
        "message": f"Expense {expense_id} deleted successfully"
    }