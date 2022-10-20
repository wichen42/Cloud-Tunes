import { useContext, useState } from 'react';
import { SessionContext } from '../../Context/SessionContext';
import './TrackComments.css';

const TrackComments = ({comments, trackId}) => {
    
    const sessionUser = useContext(SessionContext);
    const trackComments = comments.filter(comment => comment.trackId === trackId);

    const profileImage = sessionUser.imageURL ? sessionUser.imageURL : 'https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg';

    console.table(sessionUser);

    console.log("Inside track comments");
    console.table(trackComments);

    const imageStyle = {
        backgroundImage: 'url(https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg)'
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
                                <div className='comment-time'>{Math.floor(Math.random()*24)} hours ago</div>
                                <div className='comment-delete'>
                                    Delete
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default TrackComments;