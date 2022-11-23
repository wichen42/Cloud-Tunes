import './AudioPlayerBar.css';
import sample from '../../assets/temp_music/sample.mp3';
import play from '../../assets/icons/play-solid.svg';
import pause from '../../assets/icons/pause-solid.svg';
import volLow from '../../assets/icons/volume-low-solid.svg';
import volHigh from '../../assets/icons/volume-high-solid.svg';
import volMute from '../../assets/icons/volume-xmark-solid.svg';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as trackActions from '../../store/track';
import * as playlistActions from '../../store/playlist';
import * as userActions from '../../store/users';
import * as likeActions from '../../store/like';
import PlayListBar from '../PlayListBar';
import { useHistory } from 'react-router-dom';

const AudioPlayerBar = () => {
    
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const volLowUrl = `url(${volLow})`;
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
    const [artist, setArtist] = useState("");
    const [title, setTitle] = useState("");
    const [volume, setVolume] = useState(5);

    const tracks = useSelector(trackActions.getTracks);
    const playlist = useSelector(playlistActions.getPlaylist);
    const users = useSelector(userActions.getUsers);
    const likeList = useSelector(likeActions.getLikes);
    const trackList = playlist.map(track => track.trackUrl);
    const history = useHistory();

    useEffect(() => {
        audioPlayer.current.play();       
        // setArtist(trackList[trackNum].username) 
    }, [trackNum]);
    
    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);
    
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

    const handleNext = (e) => {
        if (trackNum >= trackList.length-1 ) {
            setTrackNum(0);
        } else {
            setTrackNum(trackNum + 1);
        };
    };

    const handlePrev = (e) => {
        e.preventDefault();
        if (trackNum <= 0) {
            setTrackNum(4);
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
        console.log(volume);
        audioPlayer.current.volume = (volume / 10);
    };

    const handleLike = (e) => {
        e.preventDefault();
        console.log(playlist[trackNum]);
    };

    const handleFollow = (e) => {
        e.preventDefault();
        console.log(playlist[trackNum].username);
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
            <audio src={trackList[trackNum]} ref={audioPlayer} id='myAudio'></audio>
            <div className='button-container'>
                <button className='prev-track'
                onClick={(e) => handlePrev(e)}
                ></button>
                <button className='play-pause'
                style={buttonBackground}
                onClick={(e) => handlePlay(e)}
                ></button>
                <button className='next-track'
                onClick={(e) => handleNext(e)}></button>
                <button className='shuffle-track'           
                ></button>
                <button className='repeat-track'></button>
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
                    onClick={(e) => handleLike(e)}
                    ></button>
                    <button className='artist-follow'
                    onClick={(e) => handleFollow(e)}
                    ></button>
                    <button className='playlist-tab'
                    onClick={(e) => handlePlaylist(e)}
                    ></button>
                </div>
                {playListClicked && <PlayListBar tracks={playlist} close={() => setPlayListClicked(!playListClicked )}/>}
            </div>
        </div>
        </div>
        </>
    );
}
 
export default AudioPlayerBar;