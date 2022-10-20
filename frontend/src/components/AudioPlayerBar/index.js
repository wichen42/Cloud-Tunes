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

const AudioPlayerBar = () => {
    
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const volLowUrl = `url(${volLow})`;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPause, setPlayPause] = useState(playUrl);
    const audioPlayer = useRef();
    const progressBar = useRef();
    const sliderRef = useRef();
    const [volBackground, setVolbackground] = useState(volLowUrl);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackNum, setTrackNum] = useState(0);

    const tracks = useSelector(trackActions.getTracks);
    const trackList = tracks.map(track => track.trackUrl);

    useEffect(() => {
        audioPlayer.current.play();
        console.log(trackNum);

    }, [trackNum])

    useEffect(() => {
        const seconds = Math.floor(audioPlayer.current.duration)
        setDuration(seconds);
        progressBar.current.max = seconds;
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const handlePlay = (e) => {
        const prevState = isPlaying;

        playPause === playUrl ? setPlayPause(pauseUrl) : setPlayPause(playUrl);

        setIsPlaying(!prevState);

        if (!prevState) {
            audioPlayer.current.play();
            sliderRef.current = requestAnimationFrame(whilePlay);
        } else {
            audioPlayer.current.pause();
            cancelAnimationFrame(sliderRef.current);
        }
    }

    const whilePlay = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        progressBar.current.style.setProperty('--bar-before', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
        sliderRef.current = requestAnimationFrame(whilePlay);
    }

    const volumeBackground = {
        backgroundImage: volBackground
    }
    
    const buttonBackground = {
        backgroundImage: playPause
    }

    const convertTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const min = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const second = Math.floor(seconds % 60);
        const sec = second < 10 ? `0${second}` : `${second}`;
        return `${min}:${sec}`;
    }

    const handleChange = () => {

        audioPlayer.current.currentTime = progressBar.current.value;
        progressBar.current.style.setProperty('--bar-before', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    const handleNext = (e) => {
        if (trackNum >= trackList.length-1 ) {
            setTrackNum(0);
        } else {
            setTrackNum(trackNum + 1);
        }
    }

    const handlePrev = (e) => {
        e.preventDefault();
        if (trackNum <= 0) {
            setTrackNum(4);
        } else {
            setTrackNum(trackNum-1);
        }
    }

    return ( 
        
        <div id='audio-bar-container'>
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
                <button className='shuffle-track'></button>
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
            
            <div>
                <button id='track-volume' style={volumeBackground}></button>
            </div>

            <div className='track-info'>
                <div className='track-details'>
                    <a href="#">Link to artist</a>
                    <span>Track Title</span>
                </div>

                <div className='track-socials'>
                    <button className='track-like'></button>
                    <button className='artist-follow'></button>
                    <button className='playlist-tab'></button>
                </div>
            </div>
        </div>
        </div>
    );
}
 
export default AudioPlayerBar;