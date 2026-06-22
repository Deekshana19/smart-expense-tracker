from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    amount = Column(Float, nullable=False)

    description = Column(String(255), nullable=True)

    category = Column(String(100), nullable=False)

    payment_method = Column(String(50), nullable=False)

    expense_date = Column(Date, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())