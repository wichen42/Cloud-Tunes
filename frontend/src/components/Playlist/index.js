import { useState } from 'react';
import PlaylistItem from '../PlaylistItem';
import './Playlist.css';

const Playlist = ({tracks, users, sessionUser, followList, likeList}) => {
    
    const [trackImage, setTrackImage] = useState();

    const shuffledTracks = [];
    const playlistTracks = [...new Map(tracks.map(track => [track["username"], track]).values())]

    playlistTracks.forEach(track => shuffledTracks.push(track[1]));

    const playlistItems = shuffledTracks.slice(0,12).map((track) => {
        const trackUser = users.filter(function (el) {
            return el.username === track.username;
        });
        const followData = {followedId: track.userId, followerId: sessionUser.id}
        return <PlaylistItem track={track} user={trackUser[0]} key={track.id} sessionUser={sessionUser} followList={followList} setTrackImage={setTrackImage} likeList={likeList}/>
    });


    return ( 
        <div className='playlist-box'>
            <div className='discover-playlist-container-header'>
                More of what you like
            </div>

            <div className='discover-playlist-container'>
            <div className='discover-playlist-container-body'>
                <div className='discover-playlist-image-container'>
                    <img src={trackImage ? trackImage : "https://cloud-tunes-dev.s3.amazonaws.com/playlist-background-square.jpg"}
                    className='discover-playlist-image'
                    />
                </div>
    
                <div className='discover-playlist-details-container' id='playlist-scrollbar'>
                        {playlistItems}
                </div>
            </div>

        </div> 
        </div>


    );
}
 
export default Playlist;