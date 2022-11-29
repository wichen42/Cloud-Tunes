import ImageSlider from "../ImageSlider"
import './Splash.css'
import concert from '../../assets/temp_images/concert.jpg';
import musicians from '../../assets/temp_images/musicians.jpg';
import splash1 from '../../assets/temp_images/splash-1.jpg';
import splash2 from '../../assets/temp_images/splash2.jpg';
import { useDispatch, useSelector } from "react-redux";
import * as trackActions from '../../store/track';
import * as sessionActions from '../../store/session';
import { Redirect, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useState } from "react";
import LoginForm from "../LoginForm";
import DiscoverSlider from "../DiscoverSlider";
import SplashTracks from "../SplashTracks";



const SplashPage = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector(sessionActions.getSession);
    const [loginModal, setLoginModal] = useState(false);
    const [tracks, setTracks] = useState([]);


    const slides = [
        {url: `${musicians}`, title: 'musicians-image'},
        {url: `${concert}`, title: 'concert-image'}
    ];

    const handleMore = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setLoginModal(true);
    }

    if (sessionUser) return <Redirect to='/discover' />

    return (
        <>
            <LoginForm open={loginModal} onClose={() => setLoginModal(false)}/>
            <div className='splash-container'>
                <div className='splash-slider-container'>
                    <ImageSlider slides={slides} />
                </div>
                <div className="splash-main-header">
                    <p>Hear what's trending for free in the CloudTunes Community</p>
                </div>
                <div className="splash-tracks-container">
                    <SplashTracks />
                </div>
                <div className="splash-content-container">
                    <div className="splash-1-container">
                        <img src={splash1} className='splash1-img' />
                    </div>
                    <div className="splash-1-text">
                        <div className="splash-1-header-container">
                            <p className="splash-1-header">Never stop listening</p>
                            <div className="gradient-bar"></div>
                        </div>
                        <div className="splash-1-text-container">
                            <p className="splash-1-p">CloudTunes is a Soundcloud clone </p>
                            <p className="splash-1-p">created with React, Redux, Ruby, </p>
                            <p className="splash-1-p">and Amazon S3 Cloud Storage.</p>
                        </div>
                        <div className="splash-1-button-container">
                            <div className="splash-button"
                            onClick={() => window.open("https://github.com/wichen42/Cloud-Tunes")}
                            >
                            <FontAwesomeIcon icon={faGithub} />  &nbsp;GitHub
                            </div>

                            <div className="splash-button"
                            onClick={() => window.open("https://www.linkedin.com/in/wchen42/")}
                            >
                            <FontAwesomeIcon icon={faLinkedin} />  &nbsp;LinkedIn
                            </div>
                        </div>
                    </div>
                </div>
                <div className="splash-2-text">
                        <div className="splash-2-text-container">
                            <p className="splash-2-header">Calling all creators</p>
                            <p className="splash-2-text-p">Get on CloudTunes to connect with fans, share</p>
                            <p className="splash-2-text-p">your sounds, and grow your audience. What are</p>
                            <p className="splash-2-text-p">you waiting for?</p>
                            <div className="splash-2-button"
                            onClick={(e) => handleMore(e)}
                            > 
                                Find Out More
                            </div>
                        </div>
                        <div className="splash-2-content">
                            <img src={splash2} className='splash-2-img' />
                        </div>
                    </div>
                
            </div>
        </>
    )
}

export default SplashPage