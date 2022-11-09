import './DiscoverSliderItem.css';

const DiscoverSliderItem = ({imageSource, title}) => {

    const handleClick = (e) => {
        e.preventDefault();
        console.log(imageSource);
    }

    return ( 
        <div 
        className='discover-slider-item'
        >
            <img src={imageSource} 
            className='discover-slider-item-img' 
            onClick={(e) => handleClick(e)}
            />
            <div className='discover-slider-item-title'>{title}</div>
        </div>
     );
}
 
export default DiscoverSliderItem;