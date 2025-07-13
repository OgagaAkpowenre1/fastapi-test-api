import './textBox.css'
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const TextBox = ({className, selectedNote, noteContent, setNoteContent}) => {
    // console.log(noteContent)
    return (
        <div className={`text-box ${className}`}>
        <textarea 
            value={noteContent || ''}
            onChange={(e) => setNoteContent(e.target.value)}
            disabled={!selectedNote}
         >
         </textarea>
        </div>
    )
}

export default TextBox; 