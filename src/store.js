import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_STUDENTS = 'LOAD_STUDENTS';

const _loadStudents = (students) => ({
  type: LOAD_STUDENTS,
  students,
});

const studentsInitialState = []

const studentsReducer = (state = studentsInitialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    default: return state;
  };
};


export const loadStudents = () => {
  return (dispatch) => {
    return axios.get('/students')
      .then(res => res.data)
      .then(students => dispatch(_loadStudents(students)))
      .catch(e => console.log(e));
  };
};

//_______________________________________________________________
const LOAD_SCHOOLS = 'LOAD_SCHOOLS';

const _loadSchools = (schools) => ({
  type: LOAD_SCHOOLS,
  schools,
})

const schoolsInitialState = { schools: [], }

const schoolsReducer = (state = schoolsInitialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return { schools: action.schools }
    default: return state;
  };
};

export const loadSchools = () => {
  return (dispatch) => {
    return axios.get('/schools')
      .then(res => res.data)
      .then(schools => dispatch(_loadSchools(schools)))
      .catch(e => console.log(e));
  };
};

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer,
});

export default createStore(reducer, applyMiddleware(thunk, logger));
