import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import TrackComments from '../TrackComments';
import './TrackDisplay.css';

const TrackDisplay = ({track}) => {

    const [imageUrl, setImageUrl] = useState("https://cloud-tunes-dev.s3.amazonaws.com/pexels-pixabay-159868.jpg");
    const [body, setBody] = useState("");
    const sessionUser = useContext(SessionContext);
    const [comments, setComments] = useState({});
    const [commentCounter, setCommentCounter] = useState(0);
    const [showComment, setShowComment] = useState(false);

    useEffect(() => {
        if (track.imageUrl) {
            setImageUrl(track.imageUrl)
        }
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            const commentRes = await csrfFetch('/api/comments');
            const commentData = await commentRes.json();
            // console.log(commentData);
            setComments(Object.values(commentData));
            console.table(comments);
        }

        fetchComments();
    }, [commentCounter])

    const handleComment = async (e) => {
        e.preventDefault();
        const comment = {user_id: sessionUser.id, track_id: track.id, body: body}
        console.table(comment);

        const res = await csrfFetch(`/api/tracks/${track.id}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment)
        });

        const data = await res.json();
        setCommentCounter(commentCounter + 1);
        setBody("");
        return data;
    }

    const handleShowComments = (e) => {
        e.preventDefault();
        setShowComment(!showComment);
    }

    return ( 
        <div className='track-container'>
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
                    <form onSubmit={(e) => handleComment(e)}
                    className='comment-form'
                    >
                        <input type="text"
                        placeholder='Write a comment'
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        />
                    </form>
                </div>

                <div className='track-buttons-container'>
                    <div className='track-likes'>Like</div>
                    <div className='track-links'>Copy Link</div>
                    <div className='track-comment'
                    onClick={(e) => handleShowComments(e)}
                    >Comments</div>
                </div>
                

            </div>
        </div>
            {showComment && <TrackComments comments={comments} trackId={track.id}/>}
        </div>


     );
}
 
export default TrackDisplay;