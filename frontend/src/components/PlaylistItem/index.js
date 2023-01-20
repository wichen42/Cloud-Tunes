import { useState } from 'react';
import './PlaylistItem.css';
import { useEffect } from 'react';
import csrfFetch from '../../store/csrf';
import * as followActions from '../../store/follow';
import * as playlistActions from '../../store/playlist';
import * as likeActions from '../../store/like';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import heart_white from '../../assets/icons/heart-solid-white.svg';
import heart_orange from '../../assets/icons/heart-solid-orange.svg';
import follow_white from '../../assets/icons/user-plus-solid-white.svg';
import follow_orange from '../../assets/icons/follow-orange.svg';

const whiteFollowStyle = {
    backgroundImage: `url('${follow_white}')`, 
    backgroundSize: '28px 28px', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center',
};

const orangeFollowStyle = {
    backgroundImage: `url('${follow_orange}')`, 
    backgroundSize: '28px 28px', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center',
};

const whiteLikeStyle = {
    backgroundImage: `url('${heart_white}')`,
    backgroundSize: '22px 22px', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center'
};

const orangeLikeStyle = {
    backgroundImage: `url('${heart_orange}')`,
    backgroundSize: '30px 30px', 
    backgroundRepeat: 'no-repeat', 
    backgroundPosition: 'center'
};

const PlaylistItem = ({track, sessionUser, user, setTrackImage, setTrackPlay, setTrack}) => {

    const dispatch = useDispatch();
    const likeData = useSelector(likeActions.getLikes);
    const followData = useSelector(followActions.getFollows);
    const [likeList, setLikeList] = useState([]);
    const [followList, setFollowList] = useState([]);
    const [showButtons, setShowButtons] = useState(false);
    const [following, setFollowing] = useState(false);
    const [trackUser, setTrackUser] = useState({});
    const [render, setRender] = useState(false);
    const [followStyle, setFollowStyle] = useState(whiteFollowStyle);
    const [likeStyle, setLikeStyle] = useState(whiteLikeStyle);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        setTrackUser(user);
    }, []);

    useEffect(() => {
        setFollowList(followData)
    }, [followData])

    useEffect(() => {
        setLikeList(likeData)
    }, [likeData])

    useEffect(() => {
        if (hover) {
            // Find Users that are followed
            const followMatch = followList.some(function (el) {
                return el.followerId === sessionUser.id && el.followedId === trackUser.id;
            });
            // Change styling for followed Users
           if (followMatch) {
            setFollowing(true);
            // setFollowStyle(orangeFollowStyle);
            
           } else {
            setFollowing(false);
            // setFollowStyle(whiteFollowStyle);
           };

           // Find tracks that are liked
           const likeMatch = likeList.some(function (el) {
            return el.userId === sessionUser.id && el.trackId === track.id;
           });
           // Change styling for liked tracks
           if (likeMatch) {
            setLikeStyle(orangeLikeStyle);
           } else {
            setLikeStyle(whiteLikeStyle);
           }
        }
    }, [hover, following])

    const handlePlay = (e) => {
        e.preventDefault();
        dispatch(playlistActions.addSong(track));
    }
    
    const handleLike = (e) => {
        e.preventDefault();
        if (likeStyle === whiteLikeStyle) {
            console.log("start like logic");
        } else if (likeStyle === orangeLikeStyle) {
            console.log("start unlike logic");
        }
    }

    const handleFollow = async (e) => {
        e.preventDefault();
        const followData = {followerId: sessionUser.id, followedId: trackUser.id}
        if (followStyle === whiteFollowStyle) {
            console.log("dispatch addFollow")
            // setFollowStyle(orangeFollowStyle);
            setFollowing(true);
            dispatch(followActions.addFollow(followData));
        } else if (followStyle === orangeFollowStyle) {
            console.log("dispatch deleteFollow");
            // setFollowStyle(whiteFollowStyle);
            setFollowing(false);
            console.log(track.userId);
            dispatch(followActions.deleteFollow(track.userId));
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        setTrackImage(track.imageUrl);
        setTrackPlay();
        setTrack(track);
    }

    return ( 
        <div 
            className='discover-track-playlist-details'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            onClick={(e) => handleClick(e)}
            >
                {showButtons && 
                    <div className='discover-playlist-buttons' 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    >
                        <div className='discover-playlist-buttons-container'>
                            {/* <div className='discover-playlist-play'
                            onClick={(e) => handlePlay(e)} 
                            ><FontAwesomeIcon icon="fa-solid fa-play" /></div>

                            <div className='discover-playlist-like'
                            onClick={(e) => handleLike(e)}
                            style={likeStyle}                     
                            ></div>

                            <div className='discover-playlist-follow'
                            onClick={(e) => handleFollow(e)}
                            style={following ? orangeFollowStyle : whiteFollowStyle}
                            ></div> */}
                        </div>
                    </div>
                }
                    <span className='playlist-track-name'>{track.username} - </span> <span>&nbsp;{track.title}</span>

        </div>
     );
}
 
export default PlaylistItem;