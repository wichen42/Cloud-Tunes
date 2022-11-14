import PlaylistItem from '../PlaylistItem';
import './Playlist.css';

const Playlist = ({tracks}) => {


    const playlistItems = tracks.map(track => <PlaylistItem track={track} key={track.id}/>);

    return ( 
        <div className='discover-playlist-container'>
            <div className='discover-playlist-image-container'>
                <img src="https://cloud-tunes-dev.s3.amazonaws.com/playlist-background-square.jpg"
                className='discover-playlist-image'
                />
            </div>

            <div className='discover-playlist-details-container'>
                    {playlistItems}
            </div>
        </div> 

    );
}
 
export default Playlist;