import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as playListActions from '../../store/playlist';
import './SplashTrackItem.css';

const SplashTrackItem = ({track}) => {

    const dispatch = useDispatch();
    const [showPlay, setShowPlay] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(playListActions.addSong(track));
    }

    return ( 
        <div className='splash-track-item-container'>
            <div className='splash-track-item-image-container'
            onMouseEnter={() => setShowPlay(true)}
            onMouseLeave={() => setShowPlay(false)}
            >
                <img src={track.imageUrl} className='splash-track-img' />
                {showPlay && (
                    <div className='splash-track-play'
                    onClick={(e) => handleClick(e)}
                    ></div>
                )}
            </div>
            <div className='splash-track-details-container'>
                <div className='splash-track-title'>
                    {track.title}
                </div>
                <div className='splash-track-username'>
                    {track.username}
                </div>

            </div>
        </div>
     );
}
 
export default SplashTrackItem;