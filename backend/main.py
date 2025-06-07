from enum import Enum
import random
from users import users
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    uid: int = Field(default_factory=lambda: random.randint(0, 100))
    username: str
    password: str

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@app.get("/")
async def root():
    return{"message": "Hello World"}

@app.get("/users")
async def get_users():
    return{"users": users}

@app.post("/signup")
async def signup(user: User):
    if any(u["username"].lower() == user.username.lower() for u in users):
        raise HTTPException(status_code=409, detail="Username already taken")

    hashed_password = hash_password(user.password)
    user.password = hashed_password
    users.append(user.dict())
    user_dict = user.dict()
    user_dict.pop("password")
    return {"message": "User created", "user": user_dict}