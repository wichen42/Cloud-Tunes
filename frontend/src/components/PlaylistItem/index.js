import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PlaylistItem.css';
import { useEffect } from 'react';
import csrfFetch from '../../store/csrf';
import * as followActions from '../../store/follow';
import * as playlistActions from '../../store/playlist';
import { useDispatch, useSelector } from 'react-redux';

const PlaylistItem = ({track, users, sessionUser, followList, user, followData}) => {

    const followStyle = {
        color: "white"
    }

    const followingStyle = {
        color: "#FF5500"
    }

    const noStyle = {
        color: "black"
    }

    const dispatch = useDispatch();
    const [showButtons, setShowButtons] = useState(false);
    const [follow, setFollow] = useState();
    const [trackUser, setTrackUser] = useState({});
    const [fStyle, setFstyle] = useState(followStyle);
    const [render, setRender] = useState(false);

    useEffect(() => {
        setTrackUser(user);
        followList.forEach((follow) => {
            if (Object.entries(follow).sort().toString() === Object.entries(followData).sort().toString()) {
                setFollow(false);
                setFstyle(followingStyle);
            } else {
                setFollow(true)
                setFstyle(followStyle)
            }
        });
    }, []);

    const handlePlay = (e) => {
        e.preventDefault();
        dispatch(playlistActions.addSong(track));
    }
    
    const handleLike = (e) => {
        e.preventDefault();
        console.log("Like");
        console.log(followList);
    }

    const handleFollow = async (e) => {
        e.preventDefault();

            if (follow === true) {
                setFollow(false);
                setFstyle(followingStyle)

                // await csrfFetch(`/api/follows`, {
                //     method: "POST",
                //     body: JSON.stringify(followData)
                // });

                dispatch(followActions.addFollow(followData));
                setRender(!render);
            } else {
                setFollow(true);
                setFstyle(followStyle)
                // await csrfFetch(`/api/follows/${track.userId}`, {
                //     method: "DELETE"
                // })
                dispatch(followActions.deleteFollow(track.userId));
                setRender(!render);
            }
    }




    return ( 
        <div 
            className='discover-track-playlist-details'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            >
                {showButtons && 
                    <div className='discover-playlist-buttons' >
                        <div className='discover-playlist-buttons-container'>
                            <div className='discover-playlist-play'
                            onClick={(e) => handlePlay(e)} 
                            ><FontAwesomeIcon icon="fa-solid fa-play" /></div>
                            <div className='discover-playlist-like'
                            onClick={(e) => handleLike(e)}                          
                            ><FontAwesomeIcon icon="fa-solid fa-heart" /></div>
                            <div className='discover-playlist-follow'
                            onClick={(e) => handleFollow(e)}
                            style={fStyle}  
                            ><FontAwesomeIcon icon="fa-solid fa-user-plus" /></div>
                        </div>
                    </div>
                }
                    <span className='playlist-track-name'>{track.username} - </span> <span>&nbsp;{track.title}</span>

        </div>
     );
}
 
export default PlaylistItem;