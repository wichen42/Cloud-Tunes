export const ADD_SONG = 'playlist/ADD_SONG';
export const REMOVE_SONG = 'playlist/DELETE_SONG';

export const addSong = (track) => ({
    type: ADD_SONG,
    track
})

export const removeSong = (trackId) =>  ({
    type: REMOVE_SONG,
    trackId
})

export const getPlaylist = ({playlist}) => playlist ? Object.values(playlist) : [];

const playListReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case ADD_SONG:
            nextState[action.track.id] = action.track;
            return nextState;
        case REMOVE_SONG:
            delete nextState[action.trackId];
            return nextState;
        default:
            return state;
    }
}

export default playListReducer;