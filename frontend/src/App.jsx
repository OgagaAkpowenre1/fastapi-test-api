import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import AuthForm from './components/authForm/authForm'
import { AuthProvider, useAuth } from './context/authContext'
import './App.css'
import NoteAppContainer from './components/noteAppContainer/noteAppContainer'

function ProtectedRoute({children}) {
  const {user} = useAuth()
  return user ? children : <Navigate to="/auth" />
}

function App() {
  

  return (
    <AuthProvider>
      <div className='app-container'>
      <Router>
        <Routes>
          
            <Route path='/auth' element={<AuthForm />} />
            <Route path='/app' element={
              <ProtectedRoute>
                <NoteAppContainer />
              </ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/auth" />} />
          
        </Routes>
      </Router>
      </div>
    </AuthProvider>
  )
}

export default App
