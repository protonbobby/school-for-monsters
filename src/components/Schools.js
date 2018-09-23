import React from 'react';
import { connect } from 'react-redux';

import { deleteSchool } from '../store';

const Schools = ({ schools, deleteSchool }) => {
  return (
    <div>
      <h1>Schools</h1>
      <ul>
        {
          schools.map(school => {
            return <li key={school.id}>
              {school.name}
              {school.address}
              {school.description}
              <button onClick={() => deleteSchool(school)}>X</button>
            </li>
          })
        }
      </ul>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ schools }) => ({ schools });
const mapDispatchToProps = dispatch => ({
  deleteSchool: school => dispatch(deleteSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schools)
