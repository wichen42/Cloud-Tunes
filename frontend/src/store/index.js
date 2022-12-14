import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import commentReducer from './comment';
import followReducer from './follow';
import likesReducer from './like';
import playListReducer from './playlist';
import sessionReducer from './session';
import trackReducer from './track';
import userReducer from './users';

const rootReducer = combineReducers({
    session: sessionReducer,
    users: userReducer,
    tracks: trackReducer,
    comments: commentReducer,
    playlist: playListReducer,
    follows: followReducer,
    likes: likesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

export default configureStore;
