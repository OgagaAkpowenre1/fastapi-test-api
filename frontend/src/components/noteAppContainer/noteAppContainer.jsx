import './noteAppContainer.css'
import NoteList from '../noteList/noteList';
import TextBox from '../textBox/textBox';

const NoteAppContainer = () => {
    return (
        <div className='note-app-container'>
        <TextBox />
        <NoteList />
        </div>
    )
}

export default NoteAppContainer;