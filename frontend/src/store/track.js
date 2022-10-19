import csrfFetch from "./csrf";

export const RECEIVE_TRACK = 'tracks/RECEIVE_TRACK';
export const RECEIVE_TRACKS = 'tracks/RECEIVE_TRACKS';

export const receiveTrack = (track) => ({
    type: RECEIVE_TRACK,
    track
})

export const receiveTracks = (tracks) => ({
    type: RECEIVE_TRACKS,
    tracks
})

const getTrack = trackId => ({tracks}) => tracks ? tracks[trackId] : null;
const getTracks = ({tracks}) => tracks ? Object.values(tracks) : [];

export const fetchTracks = () => async dispatch => {
    const res = await csrfFetch('/api/tracks');
    const data = await res.json();
    console.log("Inside fetchTracks: " + data);
    dispatch(receiveTracks(data));
    return data;
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
        default: 
            return state;
    }
}

export default trackReducer;