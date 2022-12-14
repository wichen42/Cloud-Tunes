import csrfFetch, { storeCSRFToken } from "./csrf";

const SET_SESSION = 'session/SET_SESSION';
const REMOVE_SESSION = 'session/REMOVE_SESSION';

export const setSession = user => ({
    type: SET_SESSION,
    user
})

export const removeSession = () => ({
    type:REMOVE_SESSION
})

export const fetchSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setSession(data));
    return data;
}

export const getSession = ({session}) => session ? session.user : null;

export const login = ({username, password}) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password
        })
    });
    
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setSession(data.user));
    return res;
}

export const logout = () => async dispatch => {
    await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem("currentUser", null);
    dispatch(removeSession());
}

export const signup = ({username, password }) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({username, password})
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setSession(data.user));
    return res;
}

export const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem("currentUser");
    }
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setSession(data.user))
    return data;
}

// const initialState = {user: null}
const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))};

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case SET_SESSION:
            nextState["user"] = action.user;
            return nextState;
            // return {...state, user: action.user}
        case REMOVE_SESSION:
            nextState["user"] = null;
            return nextState;
        default:
            return state;
    }
}

export default sessionReducer;