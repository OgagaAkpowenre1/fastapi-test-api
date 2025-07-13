import './noteList.css'
import NoteListItem from '../noteListItem/noteListItem';
import ModifyButtons from '../modifyButtons/modifyButtons';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const NoteList = ({className, onSelectNote, notes, handleCreateNote, handleSave}) => {
    
    return (
        <div className={`note-list-container ${className}`}>
        <div className='note-list'>
        <ul>
        {notes.map((note, index) => 
            <li key={note.id || index}>
                <NoteListItem note={note} onClick={() => onSelectNote(note)} />
            </li>
        )}
        </ul>
        </div>
        <ModifyButtons handleCreateNote={handleCreateNote} handleSave={handleSave} />
        </div>
    )
}

export default NoteList;