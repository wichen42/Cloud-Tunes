import { useContext, useEffect, useRef, useState } from 'react';
import './header.css';
import LoginForm from '../LoginForm';
import SignupForm from '../SignupForm';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import WelcomeBack from '../WelcomeBackForm';
import * as usersActions from '../../store/users';
import  { useHistory} from 'react-router-dom';
import { SessionContext } from '../../Context/SessionContext';
import ProfileDropdown from '../ProfileDropdown';
import OptionsDropdown from '../OptionsDropdown';

const Header = () => {

    const history = useHistory();
    const sessionUser = useContext(SessionContext);
    const [profileClicked, setProfileClicked] = useState(false);
    const [optionsClicked, setOptionsClicked] = useState(false);

    if (!sessionUser) return null;

    console.log(sessionUser);

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
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

    const handleProfile = (e) => {
        e.preventDefault();
        setProfileClicked(!profileClicked);
    }

    const handleOptions = (e) => {
        e.preventDefault();
        setOptionsClicked(!optionsClicked);
    }

    const handleLibrary = (e) => {
        e.preventDefault();
        history.push('/library');
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
                    <div className='header-library'
                    onClick={(e) => handleLibrary(e)}
                    >Library</div>
                </div>

                <div className='header-search'>
                    <input type="search"
                    className='search'
                    placeholder='Search functionality coming soon'
                    />
                </div>

                <div className='header-end'>
                    <div className='go-plus'
                    onClick={() => window.open('https://www.appacademy.io/', '_blank')}
                    >Try App Academy</div>
                    <div className='next-pro'>Try Next Pro</div>
                    <div className='header-upload'
                    onClick={(e) => handleUpload(e)}
                    >Upload</div>
                    <div className='header-profile'
                    onClick={(e) => handleProfile(e)}
                    tabIndex="1"
                    >
                        <div>
                            {sessionUser ? sessionUser.username : "username"} ⌄
                        </div>
                        {profileClicked && <ProfileDropdown />}
                    </div>
                    <div className='header-icons'>
                        {/* <div className='header-bell'></div>
                        <div className='header-mail'></div> */}
                        <div className='header-options'
                        tabIndex="2"
                        onClick={(e) => {handleOptions(e)}}
                        >
                            {optionsClicked && <OptionsDropdown />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;