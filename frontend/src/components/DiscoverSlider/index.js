import { useRef } from 'react';
import DiscoverSliderItem from '../../DiscoverSliderItem';
import './DiscoverSlider.css';

const DiscoverSlider = ({title, data}) => {

    const slideRef = useRef();

    const scroll = (offset) => {
        slideRef.current.scrollLeft(offset);
    }
    return ( 
        <div className='discover-slider-container'>
            {/* <button onClick={() => scroll(-20)}>left</button> */}
            
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

            {/* <button onClick={() => scroll(20)}>right</button> */}
        </div>

     );
}
 
export default DiscoverSlider;