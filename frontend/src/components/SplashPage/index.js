import ImageSlider from "../ImageSlider"
import './Splash.css'
import concert from '../../assets/temp_images/concert.jpg';
import musicians from '../../assets/temp_images/musicians.jpg';
import { useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { Redirect } from "react-router-dom";
import { useEffect } from "react";


const slides = [
    {url: `${musicians}`, title: 'musicians-image'},
    {url: `${concert}`, title: 'concert-image'}
];



const SplashPage = () => {
    
    const sessionUser = useSelector(sessionActions.getSession);

    if (sessionUser) return <Redirect to='/discover' />

    return (
        <>
            <div className='splash-container'>
                <div className='splash-slider-container'>
                    <ImageSlider slides={slides} />
                </div>

                
            </div>
        </>
    )
}

export default SplashPage