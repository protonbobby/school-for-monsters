import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { createStudent } from '../reducers/students';

class CreateStudent extends Component {
  constructor({ props }) {
    super();
    this.state = {
      first: '',
      last: '',
      gpa: '',
      schoolId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value, }) };

  handleSubmit(e) {
    e.preventDefault();

    this.props.createStudent({
      first: this.state.first,
      last: this.state.last,
      gpa: this.state.gpa,
      schoolId: this.state.schoolId,
    });

    this.setState({
      first: '',
      last: '',
      gpa: '',
      schoolId: '',
    })
  }

  render() {
    const { first, last, gpa, schoolId } = this.state;
    const { schools } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Add Student</h1>

        <Container>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='first'>First</Label>
              <Input
                id='first'
                value={first}
                onChange={handleChange}
                type='text'
                name='first'
                placeholder='Charlie'
                autoFocus />
            </FormGroup>

            <FormGroup>
              <Label for='last'>Last</Label>
              <Input
                id='last'
                value={last}
                onChange={handleChange}
                type="text"
                name='last'
                placeholder='Brown' />
            </FormGroup>

            <FormGroup>
              <Label for='gpa'>GPA</Label>
              <Input
                id='gpa'
                value={gpa}
                onChange={handleChange}
                type="number"
                step="0.1"
                min='0'
                max='4.0'
                name='gpa'
                placeholder='3.0' />
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
                  schools.map(school => {
                    return <option key={school.id} value={school.id}>{school.name}</option>
                  })
                }
              </Input>
            </FormGroup>

            <Button color='success' disabled={!first || !last || !gpa}
            >Submit</Button>

          </Form>
        </Container>
      </div>
    )
  }
};

//_______________________________________________________________
const mapStateToProps = ({ schools, students }) => {

  return {
    schools,
    students,
  }
}

const mapDispatchToProps = dispatch => ({
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateStudent);
