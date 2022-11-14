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
                            asdas
                    </div>
                }
                <div className='playlist-track-name-container'
                >

                    <div className='playlist-track-name'
                    >{track.username} - </div> 
                    <div>&nbsp;{track.title}</div>
                </div>

        </div>
     );
}
 
export default PlaylistItem;