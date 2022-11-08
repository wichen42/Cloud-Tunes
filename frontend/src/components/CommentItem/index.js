import { useDispatch, useSelector } from "react-redux";
import * as userActions from '../../store/users';
import csrfFetch from "../../store/csrf";
import * as commentActions from '../../store/comment';
import { useEffect } from "react";

const CommentItem = ({commentId, userId, trackId, body, itemUpdate}) => {
    
    const dispatch = useDispatch();
    const user = useSelector(userActions.getUser(userId));
    const comments = useSelector(commentActions.getComments);
    useEffect(() => {
        dispatch(commentActions.fetchComments());
    }, [])

    const imageStyle = {
        backgroundImage: 'url(https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg)'
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(commentActions.deleteComment(commentId));
        itemUpdate();
    }
    
    return ( 
        <li key={commentId}
        className='comment-item'
        >   
            <div className='comment-user'>
                <div className='comment-image' style={imageStyle}></div>
                <div className='comment-details-container'>
                    <div className='comment-username'>{user.username}</div>
                    <div className='comment-body'>{body}</div>
                </div>
            </div>

            <div className='comment-tail'>
                <div className='comment-time'>{Math.floor(Math.random()*22)+2} hours ago</div>
                <div className="comment-buttons">
                    <div className='comment-edit'>Edit</div>
                    <div className="delete-container">
                        <button className='comment-delete'
                        onClick={(e) => handleDelete(e)}></button>
                    </div>
                </div>

            </div>
        </li>
    )
}
 
export default CommentItem;