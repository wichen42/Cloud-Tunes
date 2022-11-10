import { useRef } from 'react';
import DiscoverSliderItem from '../../DiscoverSliderItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './DiscoverSlider.css';
import { useState } from 'react';
import { useEffect } from 'react';


const DiscoverSlider = ({title, data}) => {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [pos, setPos] = useState(5);
    const slideRef = useRef();

    const scroll = (offset) => {
        slideRef.current.scrollLeft += offset;
        /* 5 900 */
        if (slideRef.current.scrollLeft <= 5) {
            setShowLeft(false);
        } else {
            setShowLeft(true);
        }
        console.log(slideRef.current.scrollLeft);
    }
    return ( 
        <div className='discover-slider-container'>
            
            <div
                className='slide-left'
                style={ showLeft ? {display: 'block'} : {display: 'none'} }
                onClick={() => scroll(-300)}
                >
                    <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
                </div>

            <div>
                <div className='discover-slider-header'>{title}</div>
                <div className='discover-slider snaps-inline' ref={slideRef}>


                    {data.map(ele => (
                        < DiscoverSliderItem
                        key={ele.id}
                        imageSource={ele.profileUrl ? ele.profileUrl : ele.imageUrl}
                        title={ele.title ? ele.title : ele.username}
                        />
                    ))}


                </div>
            </div>
            
            <div
                className='slide-right'
                onClick={() => scroll(300)}
                >
                    <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
                </div>

        </div>

     );
}
 
export default DiscoverSlider;