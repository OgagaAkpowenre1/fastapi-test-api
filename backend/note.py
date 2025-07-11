from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from datetime import datetime
from models import Note, User

class NoteCreate(BaseModel):
    content: str

def create_note(note_data: NoteCreate, db: Session, current_user: User) -> Note:
    new_note = Note(
        content = note_data.content,
        createdAt = datetime.now(),
        updatedAt = datetime.now(),
        user_id = current_user.id
    )

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note

def fetch_user_notes(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user.notes

def delete_user_note(user_id: int, note_id: int, db:Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail= "User not found")
    note =  db.query(Note).filter(Note.id == note_id, Note.user_id == user_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    db.delete(note)
    db.commit()
    return note

def edit_note(user_id: int, note_id: int, updated_content: str, db:Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail= "User not found")
    note =  db.query(Note).filter(Note.id == note_id, Note.user_id == user_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    note.content = updated_content
    db.commit()
    return note