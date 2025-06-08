import './navbar.css'

const Navbar = () => {
    return (
        <nav className='navbar'>
            <a href="#"><h1>Note Taker</h1></a>
            <div className="user-info">
                <p>username</p>
                <img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fperson-icon-5.png&f=1&nofb=1&ipt=3f2d9b0425ff691815e112ec38ebda4651311e40ba19208cdbfd4f6cc6b7a993" alt="" />
            </div>
        </nav>
    )
}

export default Navbar;