import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as playlistActions from '../../store/playlist';
import './PlayListBar.css';
import PlaylistTrackItem from '../PlayListTrackItem';
import { useEffect } from 'react';

const PlayListBar = ({tracks, close}) => {

    const dispatch = useDispatch();
    const [remove, showRemove] = useState(false);
    const [trackList, setTrackList] = useState([]);
    
    useEffect(() => {
        setTrackList(tracks);
    }, [tracks]);

    const handleClose = (e) => {
        e.preventDefault();
        close();
    }

    const handleClear = (e) => {
        e.preventDefault();
        setTrackList([]);
        dispatch(playlistActions.clearSongs());
    }

    const playListItem = trackList.map(track => 
        {
            return <PlaylistTrackItem track={track}/>
        }
    )

    return ( 
        
        <div className='playlist-menu'>

            <div className='playlist-header'>
                <div className='playlist-header-text'
                id='playlist-header-text-id'
                >Next Up</div>
                <div className='playlist-header-buttons'>
                    <div className='playlist-clear-button'
                    id="playlist-clear-id"
                    onClick={(e) => handleClear(e)}
                    >Clear</div>
                    <div className='playlist-close-button'
                    onClick={(e) => handleClose(e)}
                    >X</div>
                </div>
            </div>
            <div className='playlist-info-container'>
                <ul className='playlist-track-ul'>
                    {playListItem}
                </ul>
            </div>
            
        </div>
     );
}
 
export default PlayListBar;