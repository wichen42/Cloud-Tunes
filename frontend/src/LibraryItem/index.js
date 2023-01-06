import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as playlistActions from '../store/playlist';

const LibraryItem = ({track, users}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [showButton, setShowButton] = useState(false);

    const handleUser = (e) => {
        e.preventDefault();
        const user = users.find( (data) => {
            return data.username === track.username
        });
        history.push(`/users/${user.id}`);
    }

    const handlePlay = (e) => {
        e.preventDefault();
        dispatch(playlistActions.addSong(track));
    }

    return(
        <div key={track.id}
        className="track-item"
        >
        <div className='track-item-image-container'
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        >
            {showButton && (
                <div className="library-track-play"
                onClick={(e) => handlePlay(e)}
                ></div>
            )}
            <img src={track.imageUrl} className='library-track-image'/>
        </div>
        <div className='track-detail-container'>
            <div>{track.title}</div>
        </div>
        <div className='track-detail-container'>
            <div className='library-track-username'
            onClick={(e) => handleUser(e)}
            >{track.username}</div>
        </div>
        </div>
       ) 
}
 
export default LibraryItem;