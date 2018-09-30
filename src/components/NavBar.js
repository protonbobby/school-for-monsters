import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { currentNav } from '../selectors';

const NavBar = ({ students, schools, path }) => {
  return (
    <div className='nav'>
      <Link to="/"
        style={currentNav('/', path)}
        replace>Home</Link>

      <Link to="/students"
        style={currentNav('/students', path, true)}
        replace>Students ({students.length})</Link>

      <Link to="/schools"
        style={currentNav('/schools', path, true)}
        replace>Schools ({schools.length})</Link>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => ({ students, schools });

export default connect(mapStateToProps)(NavBar);
