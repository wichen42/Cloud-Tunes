import './ImageSlider.css'
import { useEffect, useState } from "react";
import LoginForm from '../LoginForm';
import SignupWithUsername from '../SignupWithUsername';



const ImageSlider = ({slides}) => {

    const [loginModal, setLoginModal] = useState(false);
    const [swUsername, setswUsername] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dotOneColor, setDotOneColor] = useState({backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF"})
    const [dotTwoColor, setDotTwoColor] = useState({backgroundColor: "transparent", border: "1px solid #FFFFFF"})


    const changeIndex = () => {
        if (currentIndex === 0) {
            
            setCurrentIndex(1)
        } else if (currentIndex === 1){
            setCurrentIndex(0)
        }
    }

    const changeDotColor = () => {
        if (currentIndex === 0) {
            setDotOneColor({backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF"})
            setDotTwoColor({backgroundColor: "transparent", border: "1px solid #FFFFFF"})
        } else if (currentIndex === 1){
            setDotOneColor({backgroundColor: "transparent", border: "1px solid #FFFFFF"})
            setDotTwoColor({backgroundColor: "#FFFFFF", border: "1px solid #FFFFFF"})
        }
    }

        useEffect(() => {
            const time = setInterval(() => {
                changeIndex();
            }, 4500);

            changeDotColor();

            return () => {
                clearInterval(time)
                clearInterval(changeDotColor)
            }
        }, [currentIndex])


    const slideStyle = {
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`,
        transition: "ease-in-out .5s"
    }

    const slideOne = (e) => {
        e.preventDefault();
        setCurrentIndex(0);
    }

    const slideTwo = (e) => {
        e.preventDefault();
        setCurrentIndex(1);
    }

/* 
    width: 20%;
    height: 55%;
*/

    return(

        <>
            <LoginForm open={loginModal} onClose={() => setLoginModal(false)}/>
            <SignupWithUsername swuOpen={swUsername} swuClose={() => setswUsername(false) }/>
            <div className="slider-container" >
                <div className='slider-header'>
                    <div className='slider-logo'>
                        <div className='slider-logo-text'>
                        Cloud Tunes
                        </div>
                    </div>
                    <div className='slider-sessions-container'>
                        <div className='slider-signin'
                        onClick={() => setLoginModal(true)}
                        >Sign In</div>
                        <div className='slider-signup'
                        onClick={() => setswUsername(true)}
                        >Create Account</div>
                        <div className='slider-creators'>For Creators</div>
                    </div>
                </div>
                <div className='dotOne' onClick={(e) => slideOne(e)} style={dotOneColor}></div>
                <div className='dotTwo' onClick={(e) => slideTwo(e)} style={dotTwoColor}></div>
                <div className="background-image" style={slideStyle}>
            </div>
        </div>
        </>

    )
}

export default ImageSlider;