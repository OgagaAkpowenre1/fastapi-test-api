from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from models import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password:str, hashed_password:str) -> str:
    return pwd_context.verify(password, hashed_password)

def create_user(user: UserCreate, db: Session) -> User:
    
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise ValueError("Username already exists")

    hashed_pw = hash_password(user.password)
    new_user = User(username=user.username, password=hashed_pw)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(user_login: UserLogin, db: Session):

    user = db.query(User).filter(User.username == user_login.username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(user_login.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect password")

    return {"message": "Login successful", "user_id": user.id, "username": user.username}