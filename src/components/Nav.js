import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ students, schools }) => {
  return (
    <div className='nav'>
      <Link
        to="/"
        replace>Home</Link>

      <Link
        to="/students"
        replace>Students ({students.length})</Link>

      <Link
        to="/schools"
        replace>Schools ({schools.length})</Link>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => ({ students, schools });

export default connect(mapStateToProps)(Nav);
