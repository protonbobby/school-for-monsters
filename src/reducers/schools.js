import axios from 'axios';

export const LOAD_SCHOOLS = 'LOAD_SCHOOLS';
export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const CREATE_SCHOOL = 'CREATE_SCHOOL';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';

const _loadSchools = schools => ({
  type: LOAD_SCHOOLS,
  schools
})

const _deleteSchool = school => ({
  type: DELETE_SCHOOL,
  school
})

const _createSchool = school => ({
  type: CREATE_SCHOOL,
  school
})

const _updateSchool = school => ({
  type: UPDATE_SCHOOL,
  school
})

const schoolsInitialState = [
  //name: '',
  //address: '',
  //description: 'text',
  //id: 0,
];
const schoolsReducer = (state = schoolsInitialState, action) => {
  switch (action.type) {
    case LOAD_SCHOOLS:
      return action.schools;
    case DELETE_SCHOOL:
      return state.filter(school => school.id !== action.school.id);
    case CREATE_SCHOOL:
      return [...state, action.school];
    case UPDATE_SCHOOL:
      return state.map(school => school.id === action.school.id ? action.school : school);
    default: return state;
  };
};

export const loadSchools = () => dispatch => (
  axios.get('/api/schools')
    .then(res => res.data)
    .then(schools => dispatch(_loadSchools(schools)))
);

export const deleteSchool = (school, history) => dispatch => (
  axios.delete(`/api/schools/${school.id}`)
    .then(res => res.data)
    .then(() => dispatch(_deleteSchool(school)))
    .then(() => history.push('/schools'))
);

export const createSchool = school => dispatch => (
  axios.post('/api/schools', school)
    .then(res => res.data)
    .then(school => dispatch(_createSchool(school)))
);

export const updateSchool = (school, history) => dispatch => (
  axios.put(`/api/schools/${school.id}`, school)
    .then(res => res.data)
    .then(school => dispatch(_updateSchool(school)))
    .then(() => history.push('/schools'))
);

export default schoolsReducer;
