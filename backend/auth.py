from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from models import User
from passlib.context import CryptContext
from fastapi import HTTPException, Depends, Request
from database import SessionLocal, get_db
from fastapi.security import OAuth2PasswordBearer
from auth_utils import create_access_token, verify_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     payload = verify_token(token)
#     if payload is None:
#         raise HTTPException(status_code=401, detail="Invalid or expired token")
#     user = db.query(User).filter(User.id == payload.get("user_id")).first()
#     if user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return user

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if token is None:
        raise HTTPException(status_code=401, detail="No token found in cookies")
    
    payload = verify_token(token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = db.query(User).filter(User.id == payload.get("user_id")).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

class UserCreate(BaseModel):
    username: str
    password: str
    profile_pic: str | None = None

class UserLogin(BaseModel):
    username: str
    password: str

class UserUpdate(BaseModel):
    username: str | None = None
    password: str | None = None
    profile_pic: str | None = None

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password:str, hashed_password:str) -> str:
    return pwd_context.verify(password, hashed_password)

def create_user(user: UserCreate, db: Session) -> User:
    
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise ValueError("Username already exists")

    hashed_pw = hash_password(user.password)
    new_user = User(username=user.username, password=hashed_pw, profile_pic=user.profile_pic)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def login_user(user_login: UserLogin, db: Session):

    user = db.query(User).filter(User.username == user_login.username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(user_login.password, user.password):
        raise HTTPException(status_code=401, detail="Incorrect password or username already taken")

    token = create_access_token(data={"user_id": user.id})
    return {"message": "Login successful", "user_id": user.id, "username": user.username, "profile_pic": user.profile_pic, "access_token": token, "token_type": "bearer"}

def update_user(user_id: int, updates: UserUpdate, db: Session):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if updates.username:
        existing = db.query(User).filter(User.username == updates.username).first()
        if existing and existing.id != user_id:
            raise HTTPException(status_code=401, detail="Username already taken")

        user.username = updates.username

    if updates.username:
        user.password = hash_password(updates.password)

    if updates.profile_pic:
        user.profile_pic = updates.profile_pic

    db.commit()
    db.refresh(user)

    return user

def fetch_all_users(db: Session):
    users = db.query(User).all()
    return users



def delete_user(user_id: int, db: Session):
    user  = db.query(User).filter(User.id == user_id).first()
    if user:
        db.delete(user)
        db.commit()

def delete_all_users(db:Session):
    users = db.query(User).all()
    count = len(users)
    for user in users:
        db.delete(user)
    db.commit()

    return count
    
