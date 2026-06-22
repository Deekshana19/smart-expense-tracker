from pydantic import BaseModel
from datetime import date


class ExpenseCreate(BaseModel):
    amount: float
    description: str | None = None
    category: str
    payment_method: str
    expense_date: date


class ExpenseResponse(BaseModel):
    id: int
    amount: float
    description: str | None = None
    category: str
    payment_method: str
    expense_date: date

    class Config:
        from_attributes = True
        
class ExpenseUpdate(BaseModel):
    amount: float
    description: str | None = None
    category: str
    payment_method: str
    expense_date: date