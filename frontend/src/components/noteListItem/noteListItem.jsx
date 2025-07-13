import './noteListItem.css'

const NoteListItem = ({note, onClick}) => {
    console.log(note)
    return (
        <div className='note-list-item' onClick={onClick}>
        <p>{note.content.slice(0, 30)|| 'Untitled Note'}</p>
        </div>
    )
}

export default NoteListItem;