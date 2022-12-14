import './PlayListTrackItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as playListActions from '../../store/playlist';

const PlaylistTrackItem = ({track}) => {
    
    const dispatch = useDispatch();
    const [showRemove, setShowRemove] = useState(false);
    const playlist = useSelector(playListActions.getPlaylist);
    
    const handleRemove = (e) => {
        e.preventDefault();
        let idx = 0;
        for (let i = 0; i < playlist.length; i++) {
            if (playlist[i] === track) idx = i;
        }
        dispatch(playListActions.removeSong(idx));
    }

    return(
        <li key={track.id}
        className='playlist-titles'
        >
            <div className='playlist-track-container'>
                <div className='playlist-track-image-container'>
                    <img src={track.imageUrl}
                    className="playlist-track-image"
                    />
                </div>
                <div className='playlist-track-details-container'
                onMouseEnter={() => setShowRemove(true)}
                onMouseLeave={() => setShowRemove(false)}
                >
                    <div className='playlist-track-title'>{track.title}</div>
                    <div className='playlist-track-artist'>{track.username}</div>
                    {showRemove && (
                        <div className='playlist-track-remove'
                        onClick={(e) => handleRemove(e)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-trash" size='lg'/>
                        </div>
                    )}
                </div>
            </div>
        </li>
    )
}
 
export default PlaylistTrackItem;