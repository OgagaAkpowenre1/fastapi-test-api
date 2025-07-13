import { useState } from 'react';
import Header from '../header/header';
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext';
import './authForm.css'

const AuthForm =  () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const BASE_URL = 'https://8000-firebase-fastapi-test-api-1748915675389.cluster-jbb3mjctu5cbgsi6hwq6u4btwe.cloudworkstations.dev';

    const navigate = useNavigate()
    const { login } = useAuth()


    const signUp = async (e) => {
        e.preventDefault()
        toast.info("Authenticating...")
        try {

            //Create new user 
            // console.log("Creating new user")
            const createRes = await fetch(`/api/users/create`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })

            //Create new user response data
            const createData = await createRes.json()
            // console.log("Creation response", createData)

            if (createRes.ok){
                toast.success("Account created succesfully!")
                login({ username: createData.username, profilePic: createData.profile_pic }) // or whatever you have
                navigate('/app')
            } else if (createRes.status === 400 && createData.detail === "Username already exists") {
                //Login existing user
                // console.log("Logging in user")
                const loginRes = await fetch(`/api/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                })

                //Login user response
                const loginData = await loginRes.json()
                // console.log("Login response", loginData)

                if (!loginRes.ok) {
                    console.log("Login error reached")
                    throw new Error(loginData.detail || "Login failed");
                }
                login({ username: loginData.username, profilePic: loginData.profile_pic }) // or whatever you have
                navigate('/app')
                toast.success("Logged in successfully!")
            } else {
                // console.log("Creation error reached")
                throw new Error(createData.detail || "Signup failed")
            }

            // Show app page
            // console.log("Auth success — show app now");
            // optionally save token or set logged-in state here
            
        } catch (error) {
            console.log("Signup error", error)
            toast.error(error.message || "An error occurred!")
        }
    }

    return (
        <div className='form-container'>
            {/* <h3>Sign Up</h3> */}
            <Header />
            <form onSubmit={signUp}>
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <button type="submit">Sign Up/Sign In</button>
            </form>

            
        </div>
    )
}

export default AuthForm;