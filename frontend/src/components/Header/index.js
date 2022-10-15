import { useEffect, useRef, useState } from 'react';
import './header.css';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import WelcomeBack from '../WelcomeBackForm';
import * as usersActions from '../../store/users';
import  { useHistory } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const user = useSelector(sessionActions.getSession);
    const [openModal, setOpenModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(false);
    const [buttonName, setButtonName] = useState("");
    const buttonRef = useRef();
    const history = useHistory();
    

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout())
    }

    useEffect(() => {
        dispatch(usersActions.fetchUsers());
    }, [openModal, signupModal, welcomeModal])

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    const handleDiscover = (e) => {
        e.preventDefault();
        history.push('/discover')
    }

    const handleUpload = (e) => {
        e.preventDefault();
        history.push('/upload');
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
                <button onClick={(e) => handleUpload(e)}>Upload</button>
            </div>

            <div>
                <button onClick={(e) => handleDiscover(e)}>Discover</button>
            </div>
            <br />
            <div>
                <h1>TEMP NAVABR FOR TESTING</h1>
            </div>
        </div>
    )
}

export default Header;