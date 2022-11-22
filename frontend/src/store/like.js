import csrfFetch from "./csrf";

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';
export const ADD_LIKE = 'like/ADD_LIKE';

export const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
});

export const removeLike = (trackId) => ({
    type: REMOVE_LIKE,
    trackId
});


export const getLikes = ({likes}) => likes ? Object.values(likes) : [];

export const fetchLikes = () => async dispatch => {
    const res = await csrfFetch('/api/likes');
    const data = await res.json();
    dispatch(receiveLikes(data));
}

export const deleteLike = (trackId) => async dispatch => {
    const res = await csrfFetch(`/api/tracks/${trackId}/like`, {
        method: 'DELETE'
    });
    dispatch(removeLike(trackId));
}


const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_LIKES:
            return {...nextState, ...action.likes}
        case REMOVE_LIKE:
            delete nextState[action.trackId];
            return nextState;
        default:
            return state;
    }
}

export default likesReducer;
