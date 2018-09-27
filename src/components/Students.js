import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { deleteStudent, createStudent } from '../reducers/students';

class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      enrolled: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value, }) }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createStudent({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa,
      enrolled: this.state.enrolled,
    })

    this.setState({
      firstName: '',
      lastName: '',
      gpa: 0,
      enrolled: false,
    })
  }

  render() {
    const { students, deleteStudent } = this.props;
    const { firstName, lastName, gpa, enrolled } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Students</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First </label>
          <input
            id='firstName'
            value={firstName}
            onChange={handleChange}
            type="text"
            name='firstName'
            placeholder='Charlie'
            autoFocus />

          <label htmlFor='lastName'>Last </label>
          <input
            id='lastName'
            value={lastName}
            onChange={handleChange}
            type="text"
            name='lastName'
            placeholder='Brown' />

          <label htmlFor='gpa'>GPA </label>
          <input
            id='gpa'
            value={gpa}
            onChange={handleChange}
            type="text"
            name='gpa' />

          <button disabled={!firstName || !lastName || !gpa}>Submit
            </button>
        </form>

        <ul>
          {
            students.map(student => {
              return <li key={student.id}>
                {student.firstName} {student.lastName} | GPA: {student.gpa}
                <Link to={`/schools/${student.schoolId}`}>{this.props.matchSchool(student.schoolId)}</Link>
                <button onClick={() => deleteStudent(student)}>X</button>
              </li>
            })
          }
        </ul>

      </div >
    )
  }
}


//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => {
  const matchSchool = (schoolId) => {
    const school = schools.find(school => {
      return school.id === schoolId
    })
    return school.name
  }

  return { students, schools, matchSchool };
}
const mapDispatchToProps = dispatch => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
