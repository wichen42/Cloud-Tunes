import ImageSlider from "../ImageSlider"
import './Splash.css'
import concert from '../../assets/temp_images/concert.jpg';
import musicians from '../../assets/temp_images/musicians.jpg';


const slides = [
    {url: `${musicians}`, title: 'musicians-image'},
    {url: `${concert}`, title: 'concert-image'}
];
console.log(concert)

const SplashPage = () => {


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