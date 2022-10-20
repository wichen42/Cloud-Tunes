import { useContext, useRef, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import './TrackComments.css';

const TrackComments = ({comments, trackId, update}) => {
    
    const sessionUser = useContext(SessionContext);
    const trackComments = comments.filter(comment => comment.trackId === trackId);
    const [commentId, setCommentId] = useState('');
    const id = useRef();

    console.table(sessionUser);

    console.log("Inside track comments");
    console.table(trackComments);

    const imageStyle = {
        backgroundImage: 'url(https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg)'
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const trackId = e.target.value;
        // console.log(trackId);
        const res = await csrfFetch(`/api/comments/${trackId}`, {
            method: 'DELETE',
        });
        console.log("comment deleted...");
        update();
    }

    return ( 
        <div className='track-comments-list'>
            <ul className='comments-list'>
                {trackComments.map(comment => {
                    return(
                        <li key={comment.id}
                        className='comment-item'
                        >   
                            <div className='comment-user'>
                                <div className='comment-image' style={imageStyle}></div>
                                <div className='comment-details-container'>
                                    <div className='comment-username'>{sessionUser.username}</div>
                                    <div className='comment-body'>{comment.body}</div>
                                </div>
                            </div>

                            <div className='comment-tail'>
                                <div className='comment-time'>{Math.floor(Math.random()*22)+2} hours ago</div>
                                <button className='comment-delete'
                                value={comment.id}
                                ref={id}
                                onClick={(e) => handleDelete(e)}
                                ></button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default TrackComments;