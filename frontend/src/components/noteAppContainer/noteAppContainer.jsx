import { useState } from 'react';
import './noteAppContainer.css'
import NoteList from '../noteList/noteList';
import TextBox from '../textBox/textBox';
import Navbar from '../navbar/navbar'

const NoteAppContainer = () => {
    const [showNoteList, setShowNoteList] = useState(false)
    
    return (
        <>
            <Navbar toggleNoteList={() => {setShowNoteList(!showNoteList)}} showNoteList={showNoteList} />
            <div className='note-app-container'>
            <TextBox className={showNoteList ? 'hidden' : 'visible'} />
            <NoteList className={showNoteList ? 'visible' : 'hidden'} />
            </div>
        </>
    )
}

export default NoteAppContainer;