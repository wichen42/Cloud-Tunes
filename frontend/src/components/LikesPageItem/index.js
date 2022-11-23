import './LikesPageItem.css';
import * as trackActions from '../../store/track';
import * as playListActions from '../../store/playlist';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const LikesPageItem = ({like}) => {

    const dispatch = useDispatch();
    const trackList = useSelector(trackActions.getTracks);
    const [showPlay, setShowPlay] = useState(false);

    const track = trackList.filter(function (el) {
        return el.id === like.trackId;
    });

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(playListActions.addSong(track[0]));
    }

    return ( 
        <div className='like-item-container'>
            <div className='like-item-image'
            onMouseEnter={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}
            >
                <img src={track[0].imageUrl} className='like-item-image-source' />
                {showPlay && (<div className='like-item-play'
                onClick={(e) => handleClick(e)}
                ></div>)}

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