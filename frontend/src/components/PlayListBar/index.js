import { useDispatch } from 'react-redux';
import * as playlistActions from '../../store/playlist';
import './PlayListBar.css';

const PlayListBar = ({tracks, close}) => {

    const dispatch = useDispatch();

    const handleClose = (e) => {
        e.preventDefault();
        close();
    }

    const handleClear = (e) => {
        e.preventDefault();
        console.log("clear")
        dispatch(playlistActions.clearSongs());
    }

    return ( 
        
        <div className='playlist-menu'>

            <div className='playlist-header'>
                <div className='playlist-header-text'>Next Up</div>
                <div className='playlist-header-buttons'>
                    <div className='playlist-clear-button'
                    onClick={(e) => handleClear(e)}
                    >Clear</div>
                    <div className='playlist-close-button'
                    onClick={(e) => handleClose(e)}
                    >X</div>
                </div>
            </div>
            <div className='playlist-info-container'>
                <ul className='playlist-track-ul'>
                    {tracks.map(track => {
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
                                    <div className='playlist-track-details-container'>
                                        <div className='playlist-track-title'>{track.title}</div>
                                        <div className='playlist-track-artist'>{track.username}</div>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
            
        </div>
     );
}
 
export default PlayListBar;