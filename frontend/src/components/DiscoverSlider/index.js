import DiscoverSliderItem from '../../DiscoverSliderItem';
import './DiscoverSlider.css';

const DiscoverSlider = ({title, data}) => {


    return ( 
        <div className='discover-slider-container'>
            <div className='discover-slider-header'>{title}</div>
            <div className='discover-slider'>
                {data.map(ele => (
                    < DiscoverSliderItem
                    key={ele.id}
                    imageSource={ele.profileUrl ? ele.profileUrl : ele.imageUrl}
                    title={ele.title ? ele.title : ele.username}
                    />
                ))}
            </div>
        </div>

     );
}
 
export default DiscoverSlider;