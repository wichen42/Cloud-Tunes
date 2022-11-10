import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DiscoverSliderItem.css';

const DiscoverSliderItem = ({imageSource, title}) => {

    const [showButton, setShowButton] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        console.log(title);
    }

    return ( 
        <div 
        className='discover-slider-item'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        >
            {showButton && 
            <div className='slider-hover-item'
            onClick={(e) => handleClick(e)}
            ><FontAwesomeIcon icon="fa-solid fa-circle-play" className='slider-play'/>
            </div>}

            <img src={imageSource} 
            className='discover-slider-item-img' 
            />
            <div className='discover-slider-item-title'>{title}</div>
        </div>
     );
}
 
export default DiscoverSliderItem;