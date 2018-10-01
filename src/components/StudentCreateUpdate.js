import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { deleteStudent, createStudent, updateStudent } from '../reducers/students';
import { giveMeOne } from '../selectors';

class StudentCreateUpdate extends Component {
  constructor({ student }) {
    super();
    this.state = {
      first: student ? student.name : '',
      last: student ? student.last : '',
      gpa: student ? student.gpa : '',
      schoolId: student ? student.schoolId : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value, }) };

  componentDidUpdate(prevProps) {
    if (!prevProps.student && this.props.student) {
      this.setState({
        first: this.props.student.first,
        last: this.props.student.last,
        gpa: this.props.student.gpa,
        schoolId: this.props.student.gpa,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { id, createStudent, updateStudent } = this.props;
    let student = {
      first: this.state.first,
      last: this.state.last,
      gpa: this.state.gpa,
      schoolId: this.state.schoolId,
    }

    if (id === undefined) {
      createStudent(student)
    } else {
      student.id = id;
      updateStudent(student)
    }

    this.setState({
      first: '',
      last: '',
      gpa: '',
      schoolId: '',
    })
  }

  render() {
    const { first, last, gpa, schoolId } = this.state;
    const { schools, student, deleteStudent } = this.props;
    const { handleChange, handleSubmit } = this;
    const disabled = !first || !last || !gpa;
    const action = this.props.id ? 'Edit' : 'Add';

    return (
      <div>
        <h1>{action} Student</h1>

        <Container>
          <Link to='/students' replace>
            <Button color='primary'>Back</Button>
          </Link>

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

            <Button color='success' disabled={disabled}
            >Submit</Button>

            <span className='floatRight'>
              <Button disabled={!this.props.id} color='danger' onClick={() => deleteStudent(student)}>Delete</Button>
            </span>

          </Form>
        </Container>
      </div>
    )
  }
};

//_______________________________________________________________
const mapStateToProps = ({ students, schools, }, { id }) => ({
  students,
  student: giveMeOne(students, id),
  schools,
})

const mapDispatchToProps = dispatch => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  createStudent: (student) => dispatch(createStudent(student)),
  updateStudent: (student) => dispatch(updateStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreateUpdate);
