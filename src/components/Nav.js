import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ students, schools }) => {
  return (
    <div>
      <Link
        to="/"
        replace>Home</Link>

      <Link
        to="/Students"
        replace>Students ({students.length})</Link>

      <Link
        to="/Schools"
        replace>Schools ({schools.length})</Link>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => ({ students, schools });

export default connect(mapStateToProps)(Nav);
