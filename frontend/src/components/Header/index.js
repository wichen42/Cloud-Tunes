import { useEffect, useRef, useState } from 'react';
import './header.css';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import WelcomeBack from '../WelcomeBackForm';
import * as usersActions from '../../store/users';
import { Redirect } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(sessionActions.getSession);
    const [openModal, setOpenModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(false);
    const [buttonName, setButtonName] = useState("");
    const buttonRef = useRef();
    

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }

    useEffect(() => {
        dispatch(usersActions.fetchUsers());
    }, [openModal, signupModal, welcomeModal])

    const handleHome = (e) => {
        e.preventDefault();
        console.log(user);
        if(user.username) {
            console.log("Logged In....cannot go to splash");
            <Redirect to='/discover' /> 
        }
        
    }

    return (
        <div className='header'>
            <div>
                <button ref={buttonRef} className='login-button' onClick={() => {
                    setOpenModal(true)
                    setButtonName(buttonRef.current.className);
                    }}>Sign In</button>
                <LoginForm open={openModal} onClose={() => setOpenModal(false)} buttonName={buttonName} />
            </div>


            <div>
                <button className='signup-button' onClick={() => setSignupModal(true)}>Create Account</button>
                <SignupForm signupOpen={signupModal} signupClose={() => setSignupModal(false)} buttonName={buttonName} />
            </div>
            
            <div>
                <button className='welcome-button' onClick={() => setWelcomeModal(true)}>Welcome Back</button>
                <WelcomeBack welcomeOpen={welcomeModal} welcomeClose={() => setWelcomeModal(false)} />
            </div>

            <div>
                <button className='logout-button' onClick={handleClick}>Logout</button>
            </div>
            
            <div>
                <button className='home' onClick={(e) => handleHome(e)}>HOME</button>
            </div>

            <div>
                <button className='upload'>Upload</button>
            </div>

        </div>
    )
}

export default Header;