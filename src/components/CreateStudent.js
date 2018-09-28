import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudent } from '../reducers/students';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      last: '',
      gpa: '',
      schoolId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value }) };

  handleSubmit(e) {
    e.preventDefault();

    this.props.createStudent({
      first: this.state.first,
      last: this.state.last,
      gpa: this.state.gpa,
      schoolId: this.state.schoolId,
    })

    this.setState({
      first: '',
      last: '',
      gpa: '',
      schoolId: '',
    })
  }

  render() {
    const { firstName, lastName, gpa, schoolId } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Add Student</h1>

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

            <Button color='success' disabled={!firstName || !lastName || !gpa}
            >Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
};

const mapStateToProps = ({ students, schools }) => ({ students, schools });

const mapDispatchToProps = dispatch => ({
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
