import { useState } from 'react';
import './PlaylistItem.css';

const PlaylistItem = ({track}) => {

    const [showButtons, setShowButtons] = useState(false);


    return ( 
        <div 
            className='discover-track-playlist-details'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            >
                {showButtons && 
                    <div className='discover-playlist-buttons'>
                    </div>
                }
                    <span className='playlist-track-name'>{track.username} - </span> <span>&nbsp;{track.title}</span>

        </div>
     );
}
 
export default PlaylistItem;