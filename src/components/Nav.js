import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ students }) => {
  return (
    <div>
      <Link
        to="/"
        replace>Home</Link>

      <Link
        to="/Students"
        replace>Students ({students.length})</Link>

      <Link
        to="/"
        replace>Schools (#)</Link>
    </div>
  )
}

//_______________________________________________________________
const mapStateToProps = ({ students }) => ({ students });

export default connect(mapStateToProps)(Nav);
