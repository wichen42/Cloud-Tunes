import csrfFetch from "./csrf";

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

export const getComments = ({comments}) => comments ? Object.values(comments) : [];

export const fetchComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    const data = await res.json();
    dispatch(receiveComments(data));
    return data;
}

export const deleteComment = (commentId) => async dispatch => {
    await csrfFetch(`/api/comments/${commentId}`, {
        method: 'delete'
    })
    dispatch(removeComment(commentId));
    dispatch(fetchComments());
}

const commentReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {...nextState, ...action.comments};
        case REMOVE_COMMENT:
            delete nextState.commentId;
            return nextState;
        default:
            return state;
    }
}

export default commentReducer;