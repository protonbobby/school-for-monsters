import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

import students from './reducers/students';
import schools from './reducers/schools';

const reducer = combineReducers({
  students,
  schools,
});

export default createStore(reducer, applyMiddleware(thunk, logger));
