import './noteList.css'
import NoteListItem from '../noteListItem/noteListItem';
import ModifyButtons from '../modifyButtons/modifyButtons';


const NoteList = ({className}) => {

    return (
        <div className={`note-list-container ${className}`}>
        <div className='note-list'>
        <ul>
        {[...Array(9)].map((_, index) => 
            <li>
                <NoteListItem key={index} />
            </li>
        )}
        </ul>
        </div>
        <ModifyButtons />
        </div>
    )
}

export default NoteList;