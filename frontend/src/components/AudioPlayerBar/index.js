import './AudioPlayerBar.css';
import sample from '../../assets/temp_music/sample.mp3';
import play from '../../assets/icons/play-solid.svg';
import pause from '../../assets/icons/pause-solid.svg';
import { useEffect, useState } from 'react';

const AudioPlayerBar = () => {
    
    const playUrl = `url(${play})`;
    const pauseUrl = `url(${pause})`;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playPause, setPlayPause] = useState(playUrl);


    const handlePlay = (e) => {
        console.log(isPlaying);
        setIsPlaying(!isPlaying);

        isPlaying ? setPlayPause(pauseUrl) : setPlayPause(playUrl);
    }

    
    const buttonBackground = {
        backgroundImage: playPause
    }

    return ( 
        <div className='audio-bar'>
            <audio className='track'>
                <source src={sample} type='audio/mpeg'/>
            </audio>
            <button className='prev-track'></button>
            <button className='play-pause'
            style={buttonBackground}
            onClick={(e) => handlePlay(e)}
            ></button>
            <button className='next-track'></button>
            <button className='repeat-track'></button>

            <div className='track-timeline'>
                <div className='track-start'></div>
                <div className='track-progress'></div>
                <div className='track-end'></div>
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