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