import './AudioPlayerBar.css';
import play from '../../assets/icons/play-solid.svg';
import pause from '../../assets/icons/pause-solid.svg';
import volLow from '../../assets/icons/volume-low-solid.svg';
import one from '../../assets/icons/1-solid.svg';
import volHigh from '../../assets/icons/volume-high-solid.svg';
import volMute from '../../assets/icons/volume-xmark-solid.svg';
import heart from '../../assets/icons/heart-solid.svg';
import heart_orange from '../../assets/icons/heart-solid-orange.svg';
import follow from '../../assets/icons/user-plus-solid.svg';
import follow_orange from '../../assets/icons/follow-orange.svg';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as playlistActions from '../../store/playlist';
import * as userActions from '../../store/users';
import * as likeActions from '../../store/like';
import * as sessionActions from '../../store/session';
import * as followActions from '../../store/follow';
import PlayListBar from '../PlayListBar';
import { useHistory } from 'react-router-dom';

const AudioPlayerBar = () => {
    
    const dispatch = useDispatch();
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const volLowUrl = `url(${volLow})`;
    const heartUrl = `url(${heart})`;
    const heartOrangeUrl = `url(${heart_orange})`;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPause, setPlayPause] = useState(playUrl);
    const audioPlayer = useRef();
    const progressBar = useRef();
    const audioVolume = useRef();
    const sliderRef = useRef();
    const [volBackground, setVolbackground] = useState(volLowUrl);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackNum, setTrackNum] = useState();
    const [playListClicked, setPlayListClicked] = useState(false);
    const [showVol, setShowVol] = useState(false);
    const [volume, setVolume] = useState(5);
    const [repeat, setRepeat] = useState(false);
    const [clear, setClear] = useState(false);
    const playlist = useSelector(playlistActions.getPlaylist);
    const users = useSelector(userActions.getUsers);
    const follows = useSelector(followActions.getFollows);
    const [likeStyle, setLikeStyle] = useState({backgroundImage: heartUrl});
    const [followStyle, setFollowStyle] = useState({backgroundImage: `url${follow}`});
    const [like, setLike] = useState(false);
    const [followStatus, setFollowStatus] = useState(false);
    const sessionUser = useSelector(sessionActions.getSession);
    const likeList = useSelector(likeActions.getLikes);
    const [userLikes, setUserLikes] = useState([]);
    const [userFollow, setUserFollow] = useState([]);
    const [user, setUser] = useState({});
    const [end, setEnd] = useState(0);
    const history = useHistory();

    useEffect(() => {
        dispatch(likeActions.fetchLikes());
        dispatch(followActions.fetchFollows());

    }, []);

    useEffect(() => {
        console.log(end);
        console.log(playlist);
    }, [end])

    useEffect(() => {
        setUser(sessionUser);
    }, [sessionUser])

    useEffect(() => {
        if (user) {
            const data = follows.filter(function (el) {
                return el.followerId === user.id;
            });
            setUserFollow(data);
        }
    }, [follows])

    useEffect(() => {
        audioPlayer.current.play();
    }, [trackNum]);

    useEffect(() => {
        if (playlist.length > 0) {
            setPlayPause(pauseUrl);
            setIsPlaying(true);
            setTrackNum(0);
            audioPlayer.current.play();
            sliderRef.current = requestAnimationFrame(whilePlay);
        };

    }, [playlist]);

    useEffect(() => {
        if (typeof trackNum === "number"){
            // check if the current playing track is in userLikes.
            const hasLikedTrack = (likes, trackId) => {
                return likes.find((track) => track.trackId === trackId) !== undefined;
            }
            if (playlist[trackNum] && userFollow.some(data => data.followedId === playlist[trackNum].userId)) {
                setFollowStatus(true);
            } else {
                setFollowStatus(false);
            }
            if (playlist[trackNum] && hasLikedTrack(userLikes, playlist[trackNum].id)) {
                setLike(true);
            } else if (!playlist[trackNum] || !hasLikedTrack(userLikes, playlist[trackNum].id)) {
                setLike(false);
            }
        } 
        if (isNaN(trackNum)) {
            setLike(false);
            setFollowStatus(false);
        };
    }, [(playlist && trackNum), playlist])

    useEffect(() => {
        setPlayPause(playUrl);
        setIsPlaying(false);
        setTrackNum();
    }, [clear])
    
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds;

        const handleEnded = () => {
            console.log("track ends");
            console.log(trackNum);
            handleNext();
        }

        audioPlayer.current.addEventListener('ended', handleEnded)

    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    useEffect(() => {
        console.log("track ended");
    }, [audioPlayer?.current?.ended])

    useEffect(() => {
        if (volume <= 0 && volume < 5) {
            setVolbackground(`url(${volMute})`);
        } else if (volume > 6) {
            setVolbackground(`url(${volHigh})`);
        } else {
            setVolbackground(volLowUrl);
        }
        
    }, [volume]);

    useEffect(() => {
        if (like) {
            setLikeStyle({
                backgroundImage: heartOrangeUrl,
                backgroundSize: '120%'
            });
        } else if (like === false) {
            setLikeStyle({backgroundImage: heartUrl});
        }


    }, [like]);

    useEffect(() => {
        if (followStatus) {
            setFollowStyle({
                backgroundImage: `url(${follow_orange})`,
                backgroundSize: '108%',
            });
        } else {
            setFollowStyle({backgroundImage: `url(${follow})`});
        }
    }, [followStatus]);

    useEffect(() => {
        if (user) {
            const userList = likeList.filter(function (el) {
                return el.userId === user.id;
            });
            setUserLikes(userList);
        }

    }, [likeList])
    
    const handlePlay = (e) => {
        const prevState = isPlaying;

        playPause === playUrl ? setPlayPause(pauseUrl) : setPlayPause(playUrl);
        setIsPlaying(!prevState);

        if (!prevState) {
            if(!trackNum) setTrackNum(0);
            audioPlayer.current.play();
            sliderRef.current = requestAnimationFrame(whilePlay);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(sliderRef.current);
        };
    };


    const whilePlay = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--bar-before', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
        sliderRef.current = requestAnimationFrame(whilePlay);
    };

    const volumeBackground = {
        backgroundImage: volBackground
    };
    
    const buttonBackground = {
        backgroundImage: playPause
    };

    const convertTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const min = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const second = Math.floor(seconds % 60);
        const sec = second < 10 ? `0${second}` : `${second}`;
        return `${min}:${sec}`;
    };

    const handleChange = () => {

        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--bar-before', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    };

    const handleNext = () => {
        if (trackNum >= playlist.length-1 ) {
            setTrackNum(0);
        } else {
            setTrackNum(trackNum + 1);
        };
    };

    const handleShuffle = (e) => {
        dispatch(playlistActions.shufflePlaylist());
    }; 

    const handlePrev = (e) => {
        e.preventDefault();
        console.log(trackNum);
        if (trackNum === 0) {
            setTrackNum(playlist.length-1);
        } else {
            setTrackNum(trackNum-1);
        };
    };

    const handlePlaylist = (e) => {
        e.preventDefault();
        setPlayListClicked(!playListClicked); 
    };

    const handleArtist = (e) => {
        e.preventDefault();
        const user = users.filter(function (el) {
            return el.username === playlist[trackNum].username;
        });
        history.push(`/users/${user[0].id}`);
    };

    const handleShowVolume = (e) => {
        e.preventDefault();
        setShowVol(!showVol);
    };

    const handleVolume = (e) => {
        setVolume(e.target.value);
        audioPlayer.current.volume = (volume / 10);
    };

    const handleLike = (e) => {
        e.preventDefault();
        if (isNaN(trackNum)) {
            console.log("no track selected");
        } else if (!isNaN(trackNum)) {
            if (like) { 
                // console.log("unliked");
                dispatch(likeActions.deleteLike(playlist[trackNum].id))            
            } else {
                // console.log("liked");
                dispatch(likeActions.addLike(playlist[trackNum].id))
            }
        }
        setLike(!like);
    };

    const handleFollow = (e) => {
        e.preventDefault();
        if (isNaN(trackNum)) {
            console.log("no track selected");
        } else if (!isNaN(trackNum)) {
            if (followStatus) {
                console.log("unfollow");
                dispatch(followActions.deleteFollow(playlist[trackNum].userId));
            } else {
                console.log("follow");
                const followData = {followedId: playlist[trackNum].userId, followerId: sessionUser.id}
                dispatch(followActions.addFollow(followData));
            }
        }
        setFollowStatus(!followStatus);
    }

    const handleRepeat = (e) => {
        e.preventDefault();
        if (isNaN(trackNum)) {
            console.log("no track selected");
        } else if(!isNaN(trackNum)) {
            if (repeat) {
                setRepeat(false);
                audioPlayer.current.loop = false;
            } else {
                setRepeat(true);
                audioPlayer.current.loop = true;
            }
        }
    }

    return ( 
        <>


        <div id='audio-bar-container'>
        {showVol && (
            <div className='volume-slider-container'>
                <input type="range" 
                min="-1" max="11"
                className='track-volume-slider'
                ref={audioVolume}
                defaultValue={volume}
                onMouseLeave={() => setShowVol(false)}
                onChange={(e) => handleVolume(e)}
                ></input>
            </div>
        )}
            <div className='audio-bar'>
            <audio src={playlist[trackNum] ? playlist[trackNum].trackUrl : ""} 
            ref={audioPlayer} id='myAudio'></audio>
            <div className='button-container'>
                <button className='prev-track'
                onClick={(e) => handlePrev(e)}
                ></button>
                <button className='play-pause'
                style={buttonBackground}
                onClick={(e) => handlePlay(e)}
                ></button>
                <button className='next-track'
                onClick={() => handleNext()}></button>
                <button className='shuffle-track'
                onClick={(e) => handleShuffle(e)}
                ></button>
                <button className='repeat-track'
                onClick={(e) => handleRepeat(e)}
                ></button>
                {repeat && (
                    <img src={one} alt="one" className='audio-one' />
                )}
            </div>


            <div className='track-timeline'>
                <div className='track-start'>{convertTime(currentTime)}</div>
                <div className='track-progress'>
                    <input type="range"
                    className='progress-bar'
                    ref={progressBar}
                    onChange={handleChange}
                    defaultValue="0"
                    />
                </div>
                <div className='track-end'>{(duration && !isNaN(duration)) ? convertTime(duration) : ""}</div>
            </div>
            
            <div className='track-volume-container'>
                <button id='track-volume' style={volumeBackground}
                onClick={(e) => handleShowVolume(e)}
                onMouseEnter={() => {
                    setTimeout(() => {
                        setShowVol(true);
                    }, 250);
                }}
                >

                </button>

            </div>

            <div className='track-info'>
                <div className='audio-track-image'>
                     {playlist[trackNum] && <img src={playlist[trackNum] ? playlist[trackNum].imageUrl : ""} />}
                </div>
                <div className='track-details'>
                    {playlist[trackNum] && <span className='audio-artist-link'
                    onClick={(e) => handleArtist(e)}
                    >{playlist[trackNum] ? playlist[trackNum].username : ""}</span >}
                    {playlist[trackNum] && <span>{playlist[trackNum] ? playlist[trackNum].title : ""}</span>}
                </div>

                <div className='track-socials'>
                    <button className='track-like'
                    style={likeStyle}
                    onClick={(e) => handleLike(e)}
                    ></button>
                    <button className='artist-follow'
                    onClick={(e) => handleFollow(e)}
                    style={followStyle}
                    ></button>
                    <button className='playlist-tab'
                    onClick={(e) => handlePlaylist(e)}
                    ></button>
                </div>
                {playListClicked && <PlayListBar tracks={playlist} clear={() => setClear(!clear)} close={() => setPlayListClicked(!playListClicked )}/>}
            </div>
        </div>
        </div>
        </>
    );
}
 
export default AudioPlayerBar;