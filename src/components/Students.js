import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { deleteStudent, createStudent } from '../reducers/students';

class Students extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      schoolId: '',
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
      schoolId: this.state.schoolId
    })

    this.setState({
      firstName: '',
      lastName: '',
      gpa: 0,
      schoolId: '',
    })
  }

  render() {
    const { students, deleteStudent } = this.props;
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Students</h1>

        <Container>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='firstName'>First </Label>
              <Input
                id='firstName'
                value={firstName}
                onChange={handleChange}
                type="text"
                name='firstName'
                placeholder='Charlie'
                autoFocus />
            </FormGroup>

            <FormGroup>
              <Label for='lastName'>Last </Label>
              <Input
                id='lastName'
                value={lastName}
                onChange={handleChange}
                type="text"
                name='lastName'
                placeholder='Brown' />
            </FormGroup>

            <FormGroup>
              <Label for='gpa'>GPA </Label>
              <Input
                id='gpa'
                value={gpa}
                onChange={handleChange}
                type="text"
                name='gpa' />
            </FormGroup>

            <FormGroup>
              <Label for='schoolId'>School</Label>
              <Input
                id='schoolId'
                value={schoolId}
                onChange={handleChange}
                type='select'
                name='schoolId'>
                <option >Not Enrolled</option>
                {
                  this.props.schools.map(school => {
                    return <option key={school.id} value={school.id}>{school.name}</option>
                  })
                }
              </Input>
            </FormGroup>

            <Button
              color='success'
              disabled={!firstName || !lastName || !gpa}
            >Submit
            </Button>
          </Form>
        </Container>


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
