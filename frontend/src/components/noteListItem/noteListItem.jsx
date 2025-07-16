import './noteListItem.css'

const NoteListItem = ({note, onClick, selectedNote}) => {
    
    return (
        <div className={`note-list-item ${selectedNote?.id === note.id ? 'active' : ''}`} onClick={onClick}>
        <p>{note.content.slice(0, 30)|| 'Untitled Note'}</p>
        </div>
    )
}

export default NoteListItem;