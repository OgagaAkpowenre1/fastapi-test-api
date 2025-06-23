from enum import Enum
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, get_db
from auth import UserCreate, UserLogin, create_user, login_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.get("/")
async def root():
    return{"message": "Hello World"}

@app.post("/users/create")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return create_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/users/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        return login_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))