import axios from 'axios';

export const LOAD_STUDENTS = 'LOAD_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

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

const _updateStudent = (student) => ({
  type: UPDATE_STUDENT,
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
    case UPDATE_STUDENT:
      return state.filter(student => student.id !== action.student.id ? student : action.student);
    default: return state;
  };
};

export const loadStudents = () => {
  return dispatch => {
    axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(_loadStudents(students)))
      .catch(e => console.log(e));
  };
};

export const deleteStudent = (student) => {
  return dispatch => {
    axios.delete(`/api/students/${student.id}`)
      .then(res => res.data)
      .then(() => dispatch(_deleteStudent(student)))
      .catch(e => console.log(e));
  };
};

export const createStudent = (student) => {
  return dispatch => {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(student => dispatch(_createStudent(student)))
      .catch(e => console.log(e));
  };
};

export const updateStudent = (student) => {
  return dispatch => {
    return axios.put(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(student => dispatch(_updateStudent(student)))
      .catch(e => console.log(e));
  };
};

export default studentsReducer;
