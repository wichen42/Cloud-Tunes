import './AudioPlayerBar.css';
import sample from '../../assets/temp_music/sample.mp3';
import play from '../../assets/icons/play-solid.svg';
import pause from '../../assets/icons/pause-solid.svg';
import { useEffect, useRef, useState } from 'react';

const AudioPlayerBar = ({tracks}) => {
    
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPause, setPlayPause] = useState(playUrl);
    const audioPlayer = useRef();
    const [currentSong, setCurrentSong] = useState(sample);

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

    
    const buttonBackground = {
        backgroundImage: playPause
    }

    return ( 
        <div className='audio-bar'>
            <audio src={currentSong} ref={audioPlayer}></audio>
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
                <div className='track-end'>3:23</div>
            </div>
            
            <div className='track-volume'></div>

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