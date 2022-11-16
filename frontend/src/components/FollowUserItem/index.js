import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './FollowUserItem.css';

const FollowUserItem = ({artist, tracks, follows, users}) => {

    const [follow, showFollow] = useState(false);
    const [count, showCount] = useState(false)
    // console.log(artist);
    // console.log(follows);

    const userTracks = tracks.filter(function (el) {
        return el.username === artist.username;
    });

    const userFollows = follows.filter(function (el) {
        return el.followedId === artist.id;
    })
    console.log(`${artist.username}: ${userFollows.length}`);
    console.log(`${artist.username}: ${userTracks.length}`);

    return ( 
        <div className='artist-follow-container'>
            <div className='artist-follow-details'>
                <div className='artist-follow-image'>
                    <img src={artist.profileUrl} className='artist-follow-image-source'/>
                </div>
                <div className='artist-follow-info'>
                    <div className='artist-follow-username'>{artist.username}</div>
                    <div className='artist-follow-stats'>
                        <div className='artist-follow-count'
                        onMouseEnter={() => showFollow(true)}
                        onMouseLeave={() => showFollow(false)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-users" /> 
                            <div className='artist-follow-info'>{userFollows.length}</div>
                            {follow && (
                                <div className='artist-follow-tooltip'>{userFollows.length} Followers</div>
                            )}
                        </div>
                        <div className='artist-follow-tracks'
                        onMouseEnter={() => showCount(true)}
                        onMouseLeave={() => showCount(false)}
                        >
                            <FontAwesomeIcon icon="fa-solid fa-lines-leaning" />
                            {count && (
                                <div className='artist-track-tooltip'>{userTracks.length} Tracks</div>
                            )}
                            <div className='artist-follow-track-info'>{userTracks.length}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default FollowUserItem;