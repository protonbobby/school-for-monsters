import axios from 'axios';

export const LOAD_STUDENTS = 'LOAD_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

const _loadStudents = students => ({
  type: LOAD_STUDENTS,
  students
});

const _deleteStudent = student => ({
  type: DELETE_STUDENT,
  student
});

const _createStudent = student => ({
  type: CREATE_STUDENT,
  student
})

const _updateStudent = student => ({
  type: UPDATE_STUDENT,
  student
})

const studentsInitialState = [
  // first: '',
  // last: '',
  // gpa: 0,
  // schoolId: 0,
  // id: 0,
]
const studentsReducer = (state = studentsInitialState, action) => {
  switch (action.type) {
    case LOAD_STUDENTS:
      return action.students;
    case DELETE_STUDENT:
      return state.filter(student => student.id !== action.student.id);
    case CREATE_STUDENT:
      return [...state, action.student]
    case UPDATE_STUDENT:
      return state.map(student => student.id === action.student.id ? action.student : student);
    default: return state;
  };
};

export const loadStudents = () => dispatch => (
  axios.get('/api/students')
    .then(res => res.data)
    .then(students => dispatch(_loadStudents(students)))
);

export const deleteStudent = (student, history) => dispatch => (
  axios.delete(`/api/students/${student.id}`)
    .then(res => res.data)
    .then(() => dispatch(_deleteStudent(student)))
    .then(() => history.push('/students'))
);

export const createStudent = student => dispatch => (
  axios.post('/api/students', student)
    .then(res => res.data)
    .then(student => dispatch(_createStudent(student)))
);

export const updateStudent = (student, history) => dispatch => (
  axios.put(`/api/students/${student.id}`, student)
    .then(res => res.data)
    .then(student => dispatch(_updateStudent(student)))
    .then(() => history.push('/students'))
);

export default studentsReducer;
