import './AudioPlayerBar.css';
import sample from '../../assets/temp_music/sample.mp3';

const AudioPlayerBar = () => {
    return ( 
        <div className='audio-bar'>
            <button className='prev-track'></button>
            <button className='play-pause'></button>
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