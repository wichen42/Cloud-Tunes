import { useRef } from 'react';
import DiscoverSliderItem from '../../DiscoverSliderItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './DiscoverSlider.css';


const DiscoverSlider = ({title, data}) => {

    const slideRef = useRef();
    const right = <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
    const left = <FontAwesomeIcon icon="fas fa-arrow-left" />

    const scroll = (offset) => {
        slideRef.current.scrollLeft(offset);
    }
    return ( 
        <div className='discover-slider-container'>

            <div>
                <div className='discover-slider-header'>{title}</div>
                <div className='discover-slider snaps-inline' ref={slideRef}>
                <div
                className='slide-left'
                onClick={() => scroll(-20)}
                >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
                </div>

                {data.map(ele => (
                    < DiscoverSliderItem
                    key={ele.id}
                    imageSource={ele.profileUrl ? ele.profileUrl : ele.imageUrl}
                    title={ele.title ? ele.title : ele.username}
                    />
                ))}

                <div
                className='slide-right'
                onClick={() => scroll(20)}
                >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
                </div>
                </div>
            </div>

        </div>

     );
}
 
export default DiscoverSlider;