import Header from '../header/header';
import './authForm.css'

const AuthForm =  () => {
    return (
        <div className='form-container'>
            {/* <h3>Sign Up</h3> */}
            <Header />
            <form action="submit">
                <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" placeholder='Enter your username' />
                </div>

                <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Enter your password' />
                </div>

                <button type="submit">Sign Up</button>
            </form>

            
        </div>
    )
}

export default AuthForm;