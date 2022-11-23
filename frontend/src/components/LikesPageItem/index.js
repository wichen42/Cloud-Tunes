import './LikesPageItem.css';
import * as trackActions from '../../store/track';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LikesPageItem = ({like}) => {

    const trackList = useSelector(trackActions.getTracks);

    const track = trackList.filter(function (el) {
        return el.id === like.trackId;
    });


    return ( 
        <div className='like-item-container'>
            <div className='like-item-image'>
                <img src={track[0].imageUrl} className='like-item-image-source' />
            </div>
            <div className='like-item-details-container'>
                <div>
                <FontAwesomeIcon icon="fa-solid fa-heart" /> {track[0].title}
                </div>
                <div className=''>
                    {track[0].username}
                </div>
            </div>
        </div>
     );
}
 
export default LikesPageItem;