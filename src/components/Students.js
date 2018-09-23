import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students }) => {
  return (
    <div>
      <h1>Students</h1>
      <ul>
        {
          students.map(student => {
            return <li key={student.id}>
              {student.firstName} {student.lastName} | GPA: {student.gpa}
            </li>
          })
        }
      </ul>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students }) => ({ students });

export default connect(mapStateToProps)(Students);
