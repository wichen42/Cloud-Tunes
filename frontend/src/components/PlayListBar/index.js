import './PlayListBar.css';

const PlayListBar = ({tracks}) => {


    return ( 
        <div className='playlist-menu'>
            <ul>
                {tracks.map(track => {
                    return(
                        <li key={track.id}
                        className='playlist-titles'
                        >
                            <div className='playlist-track-container'>
                                <div className='playlist-track-image'></div>
                                <div className='playlist-track-details-container'>
                                    <div className='playlist-track-title'>{track.title}</div>
                                    <div className='playlist-track-artist'>{track.username}</div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default PlayListBar;