import { useEffect, useState } from 'react';
import './TrackDisplay.css';

const TrackDisplay = ({track}) => {

    const [imageUrl, setImageUrl] = useState("https://cloud-tunes-dev.s3.amazonaws.com/pexels-pixabay-159868.jpg");


    useEffect(() => {
        if (track.imageUrl) {
            setImageUrl(track.imageUrl)
        }
    }, [])

    return ( 
        <div className='track-display-container'
        key={track.id}
        >
            <div className='track-image-container'>
                <img src={imageUrl} className='track-image'/>
            </div>
            <div className='track-details container'>
                <div className='track-info'>
                    <div className='track-name-title'>
                        <div className='tnt-image'><button></button></div>
                        <div>
                            <div className='track-artist'>{track.username}</div>
                            <div className='track-title'>{track.title}</div>
                        </div>
                    </div>
                    <div className='track-create-genre'>
                        <div className='track-time'>{Math.floor(Math.random()*12)} months ago</div>
                        <div className='track-genre'><div>#{track.genre}</div></div>
                    </div>
                </div>

                <div className='track-description'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis harum, sunt, iure laboriosam voluptates quaerat reprehenderit maiores asperiores necessitatibus quae molestiae maxime alias ex itaque neque dolorem placeat! Quis, amet?
                </div>

                <div className='track-comments'>
                    <input type="text"
                    placeholder='Write a comment'
                    />
                </div>

                <div className='track-buttons-container'>
                    <div className='track-likes'>Like</div>
                    <div className='track-links'>Copy Link</div>
                    <div className='track-comment'>Comments</div>
                </div>
            </div>
        </div>
     );
}
 
export default TrackDisplay;