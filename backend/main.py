from enum import Enum
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from models import User
from database import SessionLocal, get_db
from auth import UserCreate, UserLogin, UserUpdate, create_user, login_user, update_user, get_current_user, fetch_all_users, delete_all_users, delete_user
from note import NoteCreate, create_note, fetch_user_notes, delete_user_note, edit_note

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "https://5173-firebase-fastapi-test-api-1748915675389.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev"
], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.get("/")
async def root():
    return{"message": "Hello World"}


# user signup route
@app.post("/users/create")
async def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    #raise HTTPException(status_code=400, detail="Test error")  # hardcoded test
    try:
        return create_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# user login route
@app.post("/users/login")
async def login_user_route(user: UserLogin, db: Session = Depends(get_db)):
    try:
        data = login_user(user, db)
        token = data["access_token"]

        response = JSONResponse(content=data)
        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,
            secure=True,  # set to False for localhost dev
            samesite="Lax"
        )
        return response
        #return login_user(user, db)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# user account edit route
@app.put("/users/{user_id}/edit")
async def update_user_route(user_id: int, updates: UserUpdate, db: Session = Depends(get_db)):
    return update_user(user_id, updates, db)

# fetch all user accounts route
@app.post("/users/fetch/all")
async def fetch_all_users_route(db: Session = Depends(get_db)):
    return fetch_all_users(db)

# delete specific user route
@app.post("/users/{user_id}/delete")
async def delete_user_route(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(user_id, db)
    if deleted:
        return {"message": f"User {user_id} has been deleted"}
    else:
        raise HTTPException(status_code=404, detail=f"User {user_id} not found")

# delete all users route
@app.post("/users/delete/all")
async def delete_all_users_route(db: Session = Depends(get_db)):
    count = delete_all_users(db)
    return {"message": f"{count} users deleted"}

# note creation route
@app.post("/notes/create")
async def create_note_route(note: NoteCreate, db: Session = Depends(get_db), current_user : User = Depends(get_current_user)):
    return create_note(note, db, current_user)

# fetch all user notes route
@app.get("/notes/fetch")
async def fetch_user_notes_route(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return fetch_user_notes(current_user.id, db)

# delete specific note for specific user route
@app.post("/notes/delete/{note_id}")
async def delete_user_note_route(note_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    note = delete_user_note(current_user.id, note_id, db)
    if note:
        return {"message": f"Note {note_id} has been deleted"}
    else:
        raise HTTPException(status_code=404, detail=f"Note {note_id} not found")

#   edit note route
@app.put("/notes/edit/{note_id}")
async def edit_note_route(note_id: int, updated_content: NoteCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    note = edit_note(current_user.id, note_id, updated_content.content, db)
    if note:
        return {"message": f"Note {note_id} has been edited"}
    else:
        raise HTTPException(status_code=404, detail=f"Note {note_id} not found") 