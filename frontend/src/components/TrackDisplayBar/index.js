import { useEffect, useState } from 'react';
import './TrackDisplay.css';

const TrackDisplay = (track) => {

    const [imageUrl, setImageUrl] = useState("https://cloud-tunes-dev.s3.amazonaws.com/pexels-pixabay-159868.jpg");

    useEffect(() => {
        if (track.imageUrl) {
            setImageUrl(track.imageUrl)
        }
    }, [])

    return ( 
        <div className='track-display-container'>
            <div className='track-image-container'>
                <img src={imageUrl} className='track-image'/>
            </div>
            <div className='track-details container'>
                <div className='track-info'>
                    <div className='track-artist'>{track.username}</div>
                    <div className='track-title'>{track.title}</div>
                </div>
                <div></div>
            </div>
        </div>
     );
}
 
export default TrackDisplay;