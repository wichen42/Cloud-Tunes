import { useContext, useEffect, useRef, useState } from 'react';
import './header.css';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import WelcomeBack from '../WelcomeBackForm';
import * as usersActions from '../../store/users';
import  { useHistory } from 'react-router-dom';
import { SessionContext } from '../../Context/SessionContext';

const Header = () => {

    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [signupModal, setSignupModal] = useState(false);
    const [welcomeModal, setWelcomeModal] = useState(false);
    const [buttonName, setButtonName] = useState("");
    const buttonRef = useRef();
    const history = useHistory();
    const sessionUser = useContext(SessionContext);

    console.log(sessionUser);
    

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

    const handleFeed = (e) => {
        e.preventDefault();
        if (sessionUser) {
            history.push(`/users/${sessionUser.id}`);
        } else {
            history.push('/');
        }
    }

    return (
        <div className='header-container'>
            <div className='header'>
                <div className='header-start'>
                    <div className='header-home'
                    onClick={(e) => handleHome(e)}
                    >
                        <div className='home-logo'></div>
                        <div className='home-text'>Home</div>
                    </div>
                    <div className='header-feed'
                    onClick={(e) => handleFeed(e)}
                    >Feed</div>
                    <div className='header-library'>Library</div>
                </div>

                <div className='header-search'>
                    <input type="search"
                    className='search'
                    placeholder='Search'
                    />
                </div>

                <div className='header-end'>
                    <div className='go-plus'>Try Go+</div>
                    <div className='next-pro'>Try Next Pro</div>
                    <div className='header-upload'
                    onClick={(e) => handleUpload(e)}
                    >Upload</div>
                    <div className='header-profile'>{sessionUser.username}</div>
                    <div className='header-icons'>
                        <div className='header-bell'></div>
                        <div className='header-mail'></div>
                        <div className='header-options'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;