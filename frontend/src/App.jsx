import { useState } from 'react'
import AuthForm from './components/authForm/authForm'
import Header from './components/header/header'
import './App.css'
import NoteAppContainer from './components/noteAppContainer/noteAppContainer'

function App() {
  return (
    <div className='app-container'>
      {/* <Header /> */}
     {/* <AuthForm /> */}
     <NoteAppContainer />
    </div>
  )
}

export default App
