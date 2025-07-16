import { useEffect, useState, useRef } from 'react';
import { toast } from "react-toastify"
import { useAuth } from '../../context/authContext';
import './userInfoForm.css';

const UserInfoForm =  ({setShowUserUpdate}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [loading, setLoading] = useState(false)
    const {user, updateUser} = useAuth();
    const formRef = useRef();
    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const payload = {}
            if (username.trim()) payload.username = username
            if (password.trim()) payload.password = password
            if (profilePic.trim()) payload.profile_pic = profilePic

            const res = await fetch((`/api/users/edit`), {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            })

            if (!res.ok) throw new Error("Failed to update user details")
            const updatedUser = await res.json()
            // if (updatedUser){
            //     updateUser(updatedUser)
            // } else {
            //     updateUser(payload)
            // }
            updateUser(updatedUser)
            
            toast.success("User details updated successfully")
            setShowUserUpdate(false)
        } catch (error) {
            console.log("Error updating user details", error)
            toast.error("Error updating user details")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (formRef.current && !formRef.current.contains(e.target)){
                setShowUserUpdate(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>  document.removeEventListener('mousedown', handleClickOutside)
    }, [])
    

    return (
        <div className='user-info-form-wrapper'>
        <div className='user-info-form' ref={formRef}>
            
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="profile_pic">Profile Image</label>
                    <input type="text" name='profile_pic' id='profile_pic' placeholder='Enter profile image URL' onChange={(e) => setProfilePic(e.target.value)} />
                
                </div>

                <button type="submit" disabled={loading}>{loading ? `Updating...` :`Update User Info`}</button>
                <button onClick={() => setShowUserUpdate(false)}>Close Form</button>
            </form>

            
        </div>
        </div>
    )
}

export default UserInfoForm;