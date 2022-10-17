import './AudioPlayerBar.css';
import sample from '../../assets/temp_music/sample.mp3';
import play from '../../assets/icons/play-solid.svg';
import pause from '../../assets/icons/pause-solid.svg';
import volLow from '../../assets/icons/volume-low-solid.svg';
import volHigh from '../../assets/icons/volume-high-solid.svg';
import volMute from '../../assets/icons/volume-xmark-solid.svg';
import { useEffect, useRef, useState } from 'react';

const AudioPlayerBar = ({tracks}) => {
    
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const volLowUrl = `url(${volLow})`;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPause, setPlayPause] = useState(playUrl);
    const audioPlayer = useRef();
    const [currentSong, setCurrentSong] = useState(sample);
    const [volBackground, setVolbackground] = useState(volLowUrl);
    const [duration, setDuration] = useState(0);

    const trackList = tracks.map(track => track.trackUrl);

    console.log(trackList);
    console.log(volLowUrl);
    console.log(playUrl);

    useEffect(() => {
        setDuration(Math.floor(audioPlayer.current.duration));
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

    const handlePlay = (e) => {
        const prevState = isPlaying;

        playPause === playUrl ? setPlayPause(pauseUrl) : setPlayPause(playUrl);

        setIsPlaying(!prevState);

        if (!prevState) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
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
        const sec = seconds < 10 ? `0${second}` : `${second}`;
        return `${min}:${sec}`;
    }

    return ( 
        <div className='audio-bar'>
            <audio src={trackList[0]} ref={audioPlayer}></audio>
            <button className='prev-track'></button>
            <button className='play-pause'
            style={buttonBackground}
            onClick={(e) => handlePlay(e)}
            ></button>
            <button className='next-track'></button>
            <button className='shuffle-track'></button>
            <button className='repeat-track'></button>

            <div className='track-timeline'>
                <div className='track-start'>0:00</div>
                <div className='track-progress'>
                    <input type="range"
                    className='progress-bar'
                    />
                </div>
                <div className='track-end'>{(duration && !isNaN(duration)) && convertTime(duration)}</div>
            </div>
            
            <button className='track-volume' style={volumeBackground}></button>

            <div className='track-info'>
                <div className='track-details'>
                    <a href="#">Link to artist</a>
                    <span>Track Title</span>
                </div>

                <div className='track-socials'></div>
            </div>
        </div>
    );
}
 
export default AudioPlayerBar;