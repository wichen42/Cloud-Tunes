import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PlaylistItem.css';

const PlaylistItem = ({track}) => {

    const [showButtons, setShowButtons] = useState(false);

    const handlePlay = (e) => {
        e.preventDefault();
        console.log("Play");
    }

    const handleLike = (e) => {
        e.preventDefault();
        console.log("Like");
    }

    const handleFollow = (e) => {
        e.preventDefault();
        console.log("Follow");
    }


    return ( 
        <div 
            className='discover-track-playlist-details'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            >
                {showButtons && 
                    <div className='discover-playlist-buttons'>
                        <div className='discover-playlist-buttons-container'>
                            <div className='discover-playlist-play'
                            onClick={(e) => handlePlay(e)} 
                            ><FontAwesomeIcon icon="fa-solid fa-play" /></div>
                            <div className='discover-playlist-like'
                            onClick={(e) => handleLike(e)}
                            ><FontAwesomeIcon icon="fa-solid fa-heart" /></div>
                            <div className='discover-playlist-follow'
                            onClick={(e) => handleFollow(e)}
                            ><FontAwesomeIcon icon="fa-solid fa-user-plus" /></div>
                        </div>
                    </div>
                }
                    <span className='playlist-track-name'>{track.username} - </span> <span>&nbsp;{track.title}</span>

        </div>
     );
}
 
export default PlaylistItem;