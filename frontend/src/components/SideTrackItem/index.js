import './SideTrackItem.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as playlistActions from '../../store/playlist';

const SideTrackItem = ({track}) => {  

    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(playlistActions.addSong(track));
    }
    return ( 
        <div className='side-track-container'>
            <div className='side-track-image'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            >   
                {hover && (
                    <div className='side-track-image-hover'
                    onClick={(e) => handleClick(e)}
                    ></div>
                )}
                <img src={track.imageUrl} className='side-track-image-source'/>
            </div>
            <div className='side-track-details'
            >
                <div className='side-track-username'
                >{track.username}</div>
                <div className='side-track-title'>{track.title}</div>
            </div>
        </div>
     );
}
 
export default SideTrackItem;  