import { useState } from 'react';
import './noteAppContainer.css'
import NoteList from '../noteList/noteList';
import TextBox from '../textBox/textBox';
import Navbar from '../navbar/navbar'

const NoteAppContainer = () => {
    const [showNoteList, setShowNoteList] = useState(false)
    
    return (
        <>
            <Navbar toggleNoteList={() => {setShowNoteList(!showNoteList);console.log(showNoteList)}} showNoteList={showNoteList} />
            <div className='note-app-container'>
            <TextBox />
            <NoteList />
            </div>
        </>
    )
}

export default NoteAppContainer;