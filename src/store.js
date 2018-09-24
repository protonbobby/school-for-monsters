import { createStore, applyMiddleware, combineReducers } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const LOAD_STUDENTS = 'LOAD_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const CREATE_STUDENT = 'CREATE_STUDENT';

const _loadStudents = (students) => ({
  type: LOAD_STUDENTS,
  students,
});

const _deleteStudent = (student) => ({
  type: DELETE_STUDENT,
  student,
});

const _createStudent = (student) => ({
  type: CREATE_STUDENT,
  student,
})

const studentsInitialState = []
const studentsReducer = (state = studentsInitialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id);
    case CREATE_STUDENT:
      return [...state, action.student]
    default: return state;
  };
};

export const loadStudents = () => {
  return dispatch => {
    axios.get('/students')
      .then(res => res.data)
      .then(students => dispatch(_loadStudents(students)))
      .catch(e => console.log(e));
  };
};

export const deleteStudent = (student) => {
  return dispatch => {
    axios.delete(`/student/${student.id}`)
      .then(res => res.data)
      .then(() => dispatch(_deleteStudent(student)))
      .catch(e => console.log(e));
  };
};

export const createStudent = (student) => {
  return dispatch => {
    return axios.post('/students', student)
      .then(res => res.data)
      .then(student => dispatch(_createStudent(student)))
      .catch(e => console.log(e));
  };
};

//_______________________________________________________________
const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
const DELETE_SCHOOL = 'DELETE_SCHOOL';

const _loadSchools = (schools) => ({
  type: LOAD_SCHOOLS,
  schools,
})

const _deleteSchool = (school) => ({
  type: DELETE_SCHOOL,
  school,
})

const schoolsInitialState = [];
const schoolsReducer = (state = schoolsInitialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return action.schools;
    case DELETE_SCHOOL:
      return state.filter(school => school.id !== action.school.id);
    default: return state;
  };
};

export const loadSchools = () => {
  return dispatch => {
    axios.get('/schools')
      .then(res => res.data)
      .then(schools => dispatch(_loadSchools(schools)))
      .catch(e => console.log(e));
  };
};

export const deleteSchool = school => {
  return dispatch => {
    axios.delete(`/schools/${school.id}`)
      .then(res => res.data)
      .then(() => dispatch(_deleteSchool(school)))
      .catch(e => console.log(e));
  };
};

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer,
});

export default createStore(reducer, applyMiddleware(thunk, logger));
