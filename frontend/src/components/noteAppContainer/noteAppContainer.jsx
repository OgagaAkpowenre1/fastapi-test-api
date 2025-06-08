import './noteAppContainer.css'
import NoteList from '../noteList/noteList';
import TextBox from '../textBox/textBox';
import Navbar from '../navbar/navbar'

const NoteAppContainer = () => {
    return (
        <>
            <Navbar />
            <div className='note-app-container'>
            <TextBox />
            <NoteList />
            </div>
        </>
    )
}

export default NoteAppContainer;