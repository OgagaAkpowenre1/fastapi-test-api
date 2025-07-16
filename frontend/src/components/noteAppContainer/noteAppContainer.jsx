import { useState, useEffect } from 'react';
import './noteAppContainer.css'
import NoteList from '../noteList/noteList';
import TextBox from '../textBox/textBox';
import Navbar from '../navbar/navbar'
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import UserInfoForm from '../userInfoForm/userInfoForm';

const NoteAppContainer = () => {
    const [showNoteList, setShowNoteList] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)
    const {user} = useAuth()
    const [notes, setNotes] = useState([])
    const [noteContent, setNoteContent] = useState('')
    const [showUserUpdate, setShowUserUpdate] = useState(false)
    

    //console.log(selectedNote);

    const handleCreateNote = async () => {
        try {
            console.log("clicked")
            const res = await fetch('/api/notes/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: "Untitled Note" })
            })
            if (!res.ok) throw new Error("Failed to create note")
            const newNote = await res.json()
            setNotes(prev => [...prev, newNote])
            setSelectedNote(newNote)
        } catch (error) {
            console.error("Error creating note", error)
            toast.error("Error creating note")
        }
    }

    const handleSelectNote = (note) => {
        setSelectedNote(note);
        setNoteContent(note.content); // load into editor
      };
      

    const handleSave = async () => {
        try {
            console.log(noteContent)
            const res = await fetch(`/api/notes/edit/${selectedNote.id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'content': noteContent })
            })
            if (!res.ok) throw new Error("Failed to save note")

            
            // ✅ Update local note content after saving
            setNotes(prev =>
                prev.map(note =>
                    note.id === selectedNote.id
                        ? { ...note, content: noteContent }
                        : note
                )
            )
            setSelectedNote(prev => ({ ...prev, content: noteContent }));
            console.log("Note saved")
        } catch (error) {
            console.log("Error saving note", error)
            toast.error("Error saving note")
        }
    }

    const handleDelete = async () => {
        try {
            console.log("Deleting note ", selectedNote.id)
            const res = await fetch(`/api/notes/delete/${selectedNote.id}`, {
                method: 'POST',
                credentials: 'include'
            })
            if (!res.ok) throw new Error("Failed to delete note")
            setNotes(prev => prev.filter(note => note.id !== selectedNote.id))
            setSelectedNote(null)
            console.log("Deleted successfully")
        } catch (error) {
            console.error("Error deleting note", error)
            toast.error("Error deleting note")
        }
    }

    useEffect(() => {

        const fetchNotes = async () => {
            try {
                const res = await fetch('/api/notes/fetch', {
                    method: 'GET',
                    credentials: 'include'
                })
                if (!res.ok) throw new Error("Failed to fetch notes")
                const data = await res.json()
                setNotes(data)
                //console.log(data)
            } catch (error) {
                console.error("Fetch notes error", error)
                toast.error("Failed to fetch notes")
            }
        };

        fetchNotes();
    }, []);

    
    return (
        <>
            <Navbar toggleNoteList={() => {setShowNoteList(!showNoteList)}} showNoteList={showNoteList} setShowUserUpdate={setShowUserUpdate} />
            <div className='note-app-container'>
            <TextBox 
                className={showNoteList ? 'hidden' : 'visible'} 
                selectedNote={selectedNote} 
                noteContent={noteContent}
                setNoteContent={setNoteContent}
            />
            <NoteList 
                className={showNoteList ? 'visible' : 'hidden'} 
                onSelectNote={handleSelectNote} 
                notes={notes} 
                handleCreateNote={handleCreateNote}
                handleSave={handleSave}
                selectedNote={selectedNote}
                handleDelete={handleDelete}
            />
            {showUserUpdate && <UserInfoForm setShowUserUpdate={setShowUserUpdate} />}
            </div>
        </>
    )
}

export default NoteAppContainer;