import React from 'react';
import { connect } from 'react-redux';

import { deleteStudent } from '../store';

const Students = ({ students, deleteStudent }) => {
  return (
    <div>
      <h1>Students</h1>
      <ul>
        {
          students.map(student => {
            return <li key={student.id}>
              {student.firstName} {student.lastName} | GPA: {student.gpa}
              <button onClick={() => deleteStudent(student)}>X</button>
            </li>
          })
        }
      </ul>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students }) => ({ students });
const mapDispatchToProps = dispatch => ({
  deleteStudent: student => dispatch(deleteStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
