import './AudioPlayerBar.css';

const AudioPlayerBar = () => {
    return ( 
        <div className='audio-bar-container'>
            <div className='audio-bar'>
                <div className='playback-buttons'>
                    <button className='prev-track'>
    
                    </button>
                    
                    <button className='play-track'>
    
                    </button>
    
                    <button className='next-track'>
                        
                    </button>
    
                    <button className='shuffle-track'>
    
                    </button>
    
                    <button className='repeat-track'>
    
                    </button>
                </div>
    
                <div className='track-progress-bar'>
                    <div className='track-start'>
    
                    </div>
    
                    <div className='track-progress'>
    
                    </div>
    
                    <div className='track-end'>
    
                    </div>
                    <button className='track-mute'></button>
                </div>
    
    
                <div className='track-info'>
                    <div className='track-title'>
                        Title
                    </div>
    
                    <div className='track-artist'>
                        Artist
                    </div>
                </div>
    
                <div className='track-socials'>
                    <button className='track-like'>
    
                    </button>
    
                    <button className='track-follow'>
    
                    </button>
    
                    <button className='track-playlist'>
    
                    </button>
                </div>
    
            </div>
        </div>

     );
}
 
export default AudioPlayerBar;