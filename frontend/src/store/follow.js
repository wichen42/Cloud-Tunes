import csrfFetch from "./csrf";

export const ADD_FOLLOW = 'follows/ADD_FOLLOW';
export const DELETE_FOLLOW = 'follows/DELETE_FOLLOW';

export const follow = (followData) => ({
    type: ADD_FOLLOW,
    followData
});

export const unfollow = (id) => ({
    type: DELETE_FOLLOW,
    id
});

export const getFollows = ({follows}) => follows ? Object.values(follows) : [];

export const fetchFollows = () => async dispatch => {
    const res = await csrfFetch('/api/follows');
    const data = await res.json();
    dispatch(follow(data));
    return data;
}

export const addFollow = (followData) => async dispatch => {
    const res = await csrfFetch('/api/follows', {
        method: "POST",
        body: JSON.stringify(followData)
    });
    const data = await res.json();
    dispatch(follow(data));
}

export const deleteFollow = (id, followedId) => async dispatch => {
    await csrfFetch(`/api/follows/${followedId}`, {
        method: "DELETE"
    });
    dispatch(unfollow(id));
}

const followReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case ADD_FOLLOW:
            return {...nextState, ...action.followData};
        case DELETE_FOLLOW:
        default:
            return state;
    }
}

export default followReducer;