import CommentItem from '../CommentItem';
import './TrackComments.css';

const TrackComments = ({comments, trackId, update}) => {
    
    const trackComments = comments.filter(comment => comment.trackId === trackId);

    // console.table(users);
    // console.table(trackComments);

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