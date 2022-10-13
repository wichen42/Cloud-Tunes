import csrfFetch from "./csrf";

export const RECEIVE_USER = 'users/RECEIVE_USER';
export const RECEIVE_USERS = 'users/RECEIVE_USERS';

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const getUsers = ({users}) => users ? Object.values(users) : [];

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch('/api/users');
    const data = await res.json();
    dispatch(receiveUsers(data));
    return data;
}

export const createUser = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    dispatch(receiveUser(data.user));
}

const userReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = {...state};

    switch (action.type) {
        case RECEIVE_USERS:
            return {...nextState, ...action.users};
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;  
            return nextState;          
        default:
            return state;
    }
}

export default userReducer;