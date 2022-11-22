import { useContext, useState } from 'react';
import './header.css';
import  { useHistory, useParams} from 'react-router-dom';
import { SessionContext } from '../../Context/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileDropdown from '../ProfileDropdown';
import OptionsDropdown from '../OptionsDropdown';

const Header = () => {

    const history = useHistory();
    const sessionUser = useContext(SessionContext);
    const [profileClicked, setProfileClicked] = useState(false);
    const [optionsClicked, setOptionsClicked] = useState(false);
    const [homeStyle, setHomeStyle] = useState({});
    const [uploadStyle, setUploadStyle] = useState({});
    const [headerStyle, setHeaderStyle] = useState({});
    const [optionStyle, setOptionStyle] = useState({});

    if (!sessionUser) return null;
    
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
        e.preventDefault()
        if (!profileClicked) {
            setProfileClicked(true);
            setHeaderStyle({backgroundColor: "black"});
        } else {
            setProfileClicked(false);
            setHeaderStyle({backgroundColor: "transparent"});
        }
    }

    const handleProfileOut = () => {
        setHeaderStyle({backgroundColor: "transparent"});
        setProfileClicked(false);
    }

    const handleOptions = (e) => {
        e.preventDefault();
        setOptionsClicked(!optionsClicked);
    }

    const handleOptionOut = () => {
        setOptionStyle({backgroundColor: "transparent"});
        setOptionsClicked(false);
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
                    onMouseEnter={() => setUploadStyle({backgroundColor: "black"})}
                    onMouseLeave={() => setUploadStyle({backgroundColor: "transparent"})}
                    style={uploadStyle}
                    >Upload</div>
                    <div className='header-profile'
                    onClick={(e) => handleProfile(e)}
                    onMouseEnter={() => setHeaderStyle({backgroundColor: "black"})}
                    onMouseLeave={() => handleProfileOut()}
                    style={headerStyle}
                    >
                        <div>
                            {sessionUser.user ? sessionUser.user.username : sessionUser.username} &nbsp;  <FontAwesomeIcon icon="fa-solid fa-chevron-down" size='xs'/>
                        </div>
                        {profileClicked && <ProfileDropdown />}
                    </div>
                    <div className='header-icons'>
                        <div className='header-options'
                        onClick={(e) => {handleOptions(e)}}
                        onMouseEnter={() => setOptionStyle({backgroundColor: "black"})}
                        onMouseLeave={() => handleOptionOut()}
                        style={optionStyle}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            {optionsClicked && <OptionsDropdown />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;