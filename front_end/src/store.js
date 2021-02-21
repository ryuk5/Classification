import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// initial state
const initialState = {};

// variable for the middleware
const middleware = [thunk];

//Creation of the store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;