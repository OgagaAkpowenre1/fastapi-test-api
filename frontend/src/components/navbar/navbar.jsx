import './navbar.css'
import { useState } from 'react';
import UserModal from '../userModal/userModal';
import { useAuth } from '../../context/authContext';

const Navbar = ({toggleNoteList, showNoteList, setShowUserUpdate}) => {
    const [showModal, setShowModal] = useState(false);
    const {user} = useAuth();


    const toggleModal = () => {
        setShowModal(!showModal)
    }


    return (
        <nav className='navbar'>
            <a href="#"><h1>Note Taker</h1></a>
            <div className="right-items">
            {!showNoteList && <i class="fa-solid fa-bars" onClick={toggleNoteList}></i>}
            {showNoteList && <i class="fa-solid fa-xmark" onClick={toggleNoteList}></i>}
                <p>{user.username}</p>
                <img 
                    src={user?.profilePic || "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fperson-icon-5.png&f=1&nofb=1&ipt=3f2d9b0425ff691815e112ec38ebda4651311e40ba19208cdbfd4f6cc6b7a993"} 
                    alt="" 
                    onClick={toggleModal} 
                />
                {showModal && <UserModal setShowUserUpdate={setShowUserUpdate} />}
            </div>
        </nav>
    )
}

export default Navbar;