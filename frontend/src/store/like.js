export const ADD_LIKE = 'likes/ADD_LIKE';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';

export const addLike = (trackId) => ({
    action: ADD_LIKE,
    trackId
});

export const removeLike = (trackId) => ({
    action: REMOVE_LIKE,
    trackId
});


