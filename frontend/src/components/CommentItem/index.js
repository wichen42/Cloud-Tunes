import { useSelector } from "react-redux";
import * as userActions from '../../store/users';
import csrfFetch from "../../store/csrf";

const CommentItem = ({commentId, userId, trackId, body, itemUpdate}) => {
    
    const user = useSelector(userActions.getUser(userId));

    console.log(user);
    console.log(userId)
    console.log(trackId)
    console.log(body)

    const imageStyle = {
        backgroundImage: 'url(https://cloud-tunes-dev.s3.amazonaws.com/user-regular.svg)'
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await csrfFetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        console.log("comment deleted...");
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