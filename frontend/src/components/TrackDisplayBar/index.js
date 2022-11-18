import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import TrackComments from '../TrackComments';
import * as commentActions from '../../store/comment';
import * as trackActions from '../../store/track';
import * as likeActions from '../../store/like';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TrackDisplay.css';

const TrackDisplay = ({track}) => {

    const likeStyle = {
        color: "white",
        backgroundColor: "#FF5500"
    }

    const unlikeStyle = {
        color: "black"
    }

    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("https://cloud-tunes-dev.s3.amazonaws.com/pexels-pixabay-159868.jpg");
    const [body, setBody] = useState("");
    const sessionUser = useContext(SessionContext);
    const likeList = useSelector(likeActions.getLikes);
    const [commentCounter, setCommentCounter] = useState(0);
    const [showComment, setShowComment] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [liked, setLiked] = useState(false);
    const [lStyle, setLstyle] = useState(unlikeStyle)

    useEffect(() => {
        if (track.imageUrl) setImageUrl(track.imageUrl);
        if (sessionUser.id === track.userId) setShowMore(true);

        dispatch(commentActions.fetchComments());

    }, [])

    useEffect(() => {
        dispatch(commentActions.fetchComments());
    }, [commentCounter])

    const comments = useSelector(commentActions.getComments);

    const findLike = (trackId) => {
        const like = likeList.filter(function (el) {
            return el.trackId === trackId;
        });

        return like[0];
    }

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
        if (sessionUser.id === track.userId) {
            dispatch(trackActions.deleteTrack(track.id));
        }
    }

    const handleLike = async (e) => {
        e.preventDefault(); 
        if (liked === false) {
            setLiked(!liked)
            setLstyle(likeStyle);
            // const res = await csrfFetch(`/api/tracks/${track.id}/like`, {
            //     method: 'POST'
            // });
            // // const data = await res.json()
            // dispatch(likeActions.fetchLikes());
            const likeData = findLike(track.id);
            if (likeData) {
                console.log(likeData);
            } else {
                console.log("Like not found");
            }
        } else {
            setLiked(!liked)
            setLstyle(unlikeStyle);
            // const res = await csrfFetch(`/api/tracks/${track.id}/like`, {
            //     method: 'DELETE'
            // });
            // // const data = await res.json();
            // dispatch(likeActions.deleteLike(track.id));
            const likeData = findLike(track.id);
            if (likeData) {
                console.log(likeData);
            } else {
                console.log("Like not found");
            }
        }
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
                    <div className='track-likes'
                    onClick={(e) => handleLike(e)}
                    style={lStyle}
                    >Like</div>
                    <div className='track-links'>Copy Link</div>
                    <div className='track-comment'
                    onClick={(e) => handleShowComments(e)}
                    >Comments</div>
                    {showMore && (
                        <div className='comment-options'
                        onClick={(e) => handleDeleteTrack(e)}
                        >Delete</div>
                    )}
                </div>
      
                

            </div>
        </div>
            {showComment && <TrackComments comments={comments} trackId={track.id} update={() => setCommentCounter(commentCounter + 1)}/>}
        </div>


     );
}
 
export default TrackDisplay;