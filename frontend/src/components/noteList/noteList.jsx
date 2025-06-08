import './noteList.css'
import NoteListItem from '../noteListItem/noteListItem';

const NoteList = () => {

    return (
        <div className='note-list'>
        <ul>
        {[...Array(9)].map((_, index) => 
            <li>
                <NoteListItem key={index} />
            </li>
        )}
        </ul>
        </div>
    )
}

export default NoteList;