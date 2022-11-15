import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PlaylistItem.css';
import { useEffect } from 'react';
import csrfFetch from '../../store/csrf';

const PlaylistItem = ({track, users, sessionUser, followList, user, followData}) => {

    const [showButtons, setShowButtons] = useState(false);
    const [follow, setFollow] = useState('Follow');
    const [trackUser, setTrackUser] = useState({});

    useEffect(() => {
        setTrackUser(user);
        followList.forEach((follow) => {
            if (Object.entries(follow).sort().toString() === Object.entries(followData).sort().toString()) {
                setFollow("Following");
                setFstyle(followingStyle);
            }
        });
    }, []);


    const handlePlay = (e) => {
        e.preventDefault();
        console.log("Play");
    }
    
    // const [likeStyle, setLikeStyle] = useState()
    const handleLike = (e) => {
        e.preventDefault();
        console.log("Like");
    }

    const handleFollow = async (e) => {
        e.preventDefault();

        const data = {follower_id: sessionUser.id, followed_id: trackUser.id}
            if (follow === "Follow") {
                setFollow("Following");
                setFstyle(followingStyle)
                console.log(trackUser);

                await csrfFetch(`/api/follows`, {
                    method: "POST",
                    body: JSON.stringify(followData)
                });
            } else {
                setFollow("Follow");
                setFstyle(followStyle)
                console.log(trackUser);
                await csrfFetch(`/api/follows/${trackUser.id}`, {
                    method: "DELETE"
                })
            }
    }

    const followStyle = {
        color: "white"
    }

    const followingStyle = {
        color: "#FF5500"
    }

    const [fStyle, setFstyle] = useState(followStyle);

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