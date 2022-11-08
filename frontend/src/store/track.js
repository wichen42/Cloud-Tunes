import csrfFetch from "./csrf";

export const RECEIVE_TRACK = 'tracks/RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'tracks/RECEIVE_TRACKS';
export const REMOVE_TRACK = 'tracks/REMOVE_TRACK';

export const receiveTrack = (track) => ({
    type: RECEIVE_TRACK,
    track
})

export const receiveTracks = (tracks) => ({
    type: RECEIVE_TRACKS,
    tracks
})

export const removeTrack = (trackId) => ({
    type: REMOVE_TRACK,
    trackId
})

export const getTrack = trackId => ({tracks}) => tracks ? tracks[trackId] : null;
export const getTracks = ({tracks}) => tracks ? Object.values(tracks) : [];

export const fetchTracks = () => async dispatch => {
    const res = await csrfFetch('/api/tracks');
    const data = await res.json();
    dispatch(receiveTracks(data));
    return data;
}

export const deleteTrack = (trackId) => async dispatch => {
    await csrfFetch(`/api/tracks/${trackId}`, {
        method: 'DELETE'
    });
    dispatch(removeTrack(trackId));
    dispatch(fetchTracks());
}

const trackReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_TRACKS:
            return {...nextState, ...action.tracks}
        case RECEIVE_TRACK:
            nextState[action.track.id] = action.track
            return nextState;
        case REMOVE_TRACK:
            delete nextState[action.trackId];
            return nextState;
        default: 
            return state;
    }
}

export default trackReducer;