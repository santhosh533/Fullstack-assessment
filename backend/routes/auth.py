from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import get_db
from models import User
import bcrypt

router = APIRouter()

class SignupSchema(BaseModel):
    name: str
    age: int
    address: str
    email: EmailStr
    mobile: str
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

@router.post("/signup")
def signup(data: SignupSchema, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pw = bcrypt.hashpw(data.password.encode("utf-8"), bcrypt.gensalt())
    
    user = User(
        name=data.name, age=data.age, address=data.address,
        email=data.email, mobile=data.mobile,
        password=hashed_pw.decode("utf-8")
    )
    db.add(user)
    db.commit()
    return {"message": "Signup successful"}

@router.post("/login")
def login(data: LoginSchema, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    valid = bcrypt.checkpw(data.password.encode("utf-8"), user.password.encode("utf-8"))
    if not valid:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {"message": "Login successful", "user_name": user.name, "user_id": user.id}