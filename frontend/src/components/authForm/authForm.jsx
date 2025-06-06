import { useState } from 'react';
import Header from '../header/header';
import './authForm.css'

const AuthForm =  () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/signup?username=${username}&password=${password}`)
            const data = await response.json()
            console.log("Signup response", data)
        } catch (error) {
            console.log("Signup error", error)
        }
    }

    return (
        <div className='form-container'>
            {/* <h3>Sign Up</h3> */}
            <Header />
            <form action="submit" onSubmit={signUp}>
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            
        </div>
    )
}

export default AuthForm;