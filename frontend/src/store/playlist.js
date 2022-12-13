export const ADD_SONG = 'playlist/ADD_SONG';
export const REMOVE_SONG = 'playlist/DELETE_SONG';
export const CLEAR_SONGS = 'playlist/CLEAR_SONGS';

export const addSong = (track) => ({
    type: ADD_SONG,
    track
});

export const removeSong = (trackId) =>  ({
    type: REMOVE_SONG,
    trackId
});

export const clearSongs = () => ({
    type: CLEAR_SONGS
});

// export const getPlaylist = ({playlist}) => playlist ? Object.values(playlist) : [];
export const getPlaylist = ({playlist}) => playlist ? playlist : [];

function uniqueId(value, index, self) {
    return self.indexOf(value) === index;
}

const playListReducer = (state = [], action) => {
    Object.freeze(state);
    const nextState = [...state];

    switch (action.type) {
        case ADD_SONG:
            if (nextState.includes(action.track)) {
                const newState = nextState.filter(track => track.id != action.track.id);
                newState.push(action.track);
                return newState;
            } else {
                nextState.push(action.track);
                return nextState;
            }
        case REMOVE_SONG:
            nextState.splice(action.trackId, 1);
            return nextState;
        case CLEAR_SONGS:
            for (const key in nextState) {
                delete nextState[key];
            }
            return nextState;
        default:
            return state;
    }
}

export default playListReducer;