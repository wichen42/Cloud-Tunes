import { useContext, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { SessionContext } from '../../Context/SessionContext';
import csrfFetch from '../../store/csrf';
import * as userActions from '../../store/users';
import CommentItem from '../CommentItem';
import './TrackComments.css';

const TrackComments = ({comments, trackId, update}) => {
    
    const trackComments = comments.filter(comment => comment.trackId === trackId);
    const id = useRef();
    const users = useSelector(userActions.getUsers);
    console.table(users);
    // console.log(trackId);
    // console.log("Inside track comments");
    console.table(trackComments);



    return (
        <ul className='comments-list'>
            {trackComments.map(comment => {
                return(
                    <CommentItem commentId={comment.id} userId={comment.userId} trackId={comment.trackId} body={comment.body} itemUpdate={() => update}/>
                )
            })}
        </ul>
    );
}
 
export default TrackComments;