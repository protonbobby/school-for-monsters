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

//______________________selectors_________________________________________
export const fetch = (id) => {
  // type = type.toString();
  // type === 'schools' ? type : type = 'students';
  return axios.get(`/school/${id}`)
    .then(res => res.data);
}

export const matchObject = (obj, matchObj) => {
  return Object.keys(matchObj).reduce((isMatching, key) => {
    return isMatching && obj[key] === matchObj[key]
  }, true);
};

export default createStore(reducer, applyMiddleware(thunk, logger));
