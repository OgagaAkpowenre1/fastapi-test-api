import './userModal.css'
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UserModal = ({setShowUserUpdate}) => {

    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        toast.info("Logging out...")
        logout()
        navigate('/auth')
        toast.success("Logged out!")
    }


    return (
        <div className='user-modal'>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => setShowUserUpdate(true)}>Update User Details</button>
        </div>
    )
}

export default UserModal;