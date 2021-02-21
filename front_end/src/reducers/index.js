import { combineReducers } from 'redux';

import dataReducer from './dataReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    error: errorReducer,
    data: dataReducer
});