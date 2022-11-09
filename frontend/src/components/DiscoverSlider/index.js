import './DiscoverSlider.css';

const DiscoverSlider = ({title, data}) => {



    return ( 
        <div className='discover-slider-container'>
            <div className='discover-slider-header'>{title}</div>
            <div className='discover-slider'>
                {data.map(ele => (
                    <div key={ele.id} className='discover-slider-item'>
                        <img src={ele.profileUrl ? ele.profileUrl : ele.imageUrl} className='discover-slider-item-img' />
                        <div className='discover-slider-item-title'>{ele.title ? ele.title : ele.username}</div>
                    </div>
                ))}
            </div>
        </div>

     );
}
 
export default DiscoverSlider;