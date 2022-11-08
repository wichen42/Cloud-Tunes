import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import TrackComments from '../TrackComments';
import * as commentActions from '../../store/comment';
import './TrackDisplay.css';

const TrackDisplay = ({track}) => {

    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("https://cloud-tunes-dev.s3.amazonaws.com/pexels-pixabay-159868.jpg");
    const [body, setBody] = useState("");
    const sessionUser = useContext(SessionContext);
    const [commentCounter, setCommentCounter] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (track.imageUrl) {
            setImageUrl(track.imageUrl)
        }
    }, [])

    useEffect(() => {
        dispatch(commentActions.fetchComments());
    }, [commentCounter])

    const comments = useSelector(commentActions.getComments);

    const handleComment = async (e) => {
        e.preventDefault();
        const comment = {user_id: sessionUser.id, track_id: track.id, body: body}
        // console.table(comment);

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

    const handleShowMore = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
        console.log(showMore);
    }

    const handleDeleteTrack = (e) => {
        console.log(track);
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
                        <div className='track-time'>{Math.floor(Math.random()*11)+1} months ago</div>
                        <div className='track-genre'><div>#{track.genre}</div></div>
                    </div>
                </div>

                <div className='track-description'>
                    {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis harum, sunt, iure laboriosam voluptates quaerat reprehenderit maiores asperiores necessitatibus quae molestiae maxime alias ex itaque neque dolorem placeat! Quis, amet? */
                    track.description
                    }
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
                    <div className='comment-options'
                    onClick={(e) => handleShowMore(e)}
                    ><span className='options-ellipsis'>⋯</span> More</div>
                </div>
                { showMore && <div className='comment-options-dropdown'>
                        <div id='comment-options-inner'>Add to Up Next</div>
                        <div id='comment-options-inner'>Add to Playlist</div>
                        <div id='comment-options-inner'
                        onClick={(e) => handleDeleteTrack(e)}
                        >Delete</div>
                    </div>}
                

            </div>
        </div>
            {showComment && <TrackComments comments={comments} trackId={track.id} update={() => setCommentCounter(commentCounter + 1)}/>}
        </div>


     );
}
 
export default TrackDisplay;