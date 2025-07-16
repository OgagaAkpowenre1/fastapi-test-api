import './modifyButtons.css'
import { toast } from 'react-toastify';

const ModifyButtons = ({handleCreateNote, handleSave, handleDelete}) => {
    return (
        <div className='button-container'>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCreateNote}>New</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ModifyButtons;