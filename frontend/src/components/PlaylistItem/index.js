import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PlaylistItem.css';
import { useEffect } from 'react';
import csrfFetch from '../../store/csrf';

const PlaylistItem = ({track, users, sessionUser}) => {

    const [showButtons, setShowButtons] = useState(false);
    const [follow, setFollow] = useState('Follow');
    const [followList, setFollowList] = useState([]);
    const [followData, setFollowData] = useState({});

    useEffect(() => {
        const fetchFollows = async () => {
            const res = await csrfFetch('/api/follows')
            const data = await res.json();
            setFollowList(Object.values(data));
        }
        fetchFollows();
    }, [])

    useEffect(() => {
        const user = users.filter(function (el) {
            return el.username === track.username;
        })
        // console.log(followList);
        if (user[0]) {
            setFollowData({followedId: user[0].id, followerId: sessionUser.id})
            console.log(followData);
        }
        followList.forEach((follow) => {
            if (Object.entries(follow).sort().toString() === Object.entries(followData).sort().toString()) {
                setFollow("Following");
                setFstyle(followingStyle);
            }
        });
    }, [followList])
    
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
        const user = users.filter(function (el) {
            return el.username === track.username;
        })
        const data = {follower_id: sessionUser.id, followed_id: user[0].id}
        if (user[0].id !== sessionUser.id) {
            if (follow === "Follow") {
                setFollow("Following");
                setFstyle(followingStyle)

                await csrfFetch(`/api/follows`, {
                    method: "POST",
                    body: JSON.stringify(data)
                });
            } else {
                setFollow("Follow");
                setFstyle(followStyle)

                await csrfFetch(`/api/follows/${user[0].id}`, {
                    method: "DELETE"
                });
            }
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