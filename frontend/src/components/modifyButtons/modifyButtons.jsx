import './modifyButtons.css'
import { toast } from 'react-toastify';

const ModifyButtons = ({handleCreateNote, handleSave}) => {
    return (
        <div className='button-container'>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCreateNote}>New</button>
        </div>
    )
}

export default ModifyButtons;