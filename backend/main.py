from enum import Enum
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import User
from database import SessionLocal, get_db
from auth import UserCreate, UserLogin, UserUpdate, create_user, login_user, update_user, get_current_user
from note import NoteCreate, create_note

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


# signup route
@app.post("/users/create")
async def register_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        return create_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# login route
@app.post("/users/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        return login_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# user account edit route
@app.put("/users/{user_id}/edit")
async def edit_user(user_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    return update_user(user_id, updates, db)

# create note
@app.post("/notes/create")
async def create_note_for_user(note: NoteCreate, db: Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return create_note(note, db, current_user)