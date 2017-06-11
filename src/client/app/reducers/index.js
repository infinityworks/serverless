import * as ActionTypes from '../actions';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import submission from './submission';

const rootReducer = combineReducers({
  submission,
  routing
});

export default rootReducer;
