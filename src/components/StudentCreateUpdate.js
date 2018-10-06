import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { deleteStudent, createStudent, updateStudent } from '../reducers/students';

class StudentCreateUpdate extends Component {
  constructor({ student }) {
    super();
    this.state = {
      first: student ? student.first : '',
      last: student ? student.last : '',
      gpa: student ? student.gpa : 2.0,
      schoolId: student ? student.schoolId : 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value, }) };

  componentDidUpdate(prevProps) {
    if (!prevProps.student && this.props.student) {
      this.setState({
        first: this.props.student.first,
        last: this.props.student.last,
        gpa: this.props.student.gpa,
        schoolId: this.props.student.schoolId,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const _student = {
      first: this.state.first,
      last: this.state.last,
      gpa: this.state.gpa,
      schoolId: this.state.schoolId * 1,
    }

    if (_student.schoolId === 0) { _student.schoolId = null }

    if (!this.props.id) {
      this.props.createStudent(_student)
    } else {
      _student['id'] = this.props.student.id;
      this.props.updateStudent(_student)
    }

    this.setState({
      first: '',
      last: '',
      gpa: '',
      schoolId: 0,
    })

    this.props.history.push('/students')
  }

  render() {
    const { first, last, gpa, schoolId } = this.state;
    const { schools, student, deleteStudent } = this.props;
    const { handleChange, handleSubmit } = this;
    const disabled = !first || !last || !gpa;
    const action = this.props.id ? 'Edit' : 'Add';

    if (!this.state) {
      return null;
    }

    return (
      <div>
        <Container>
          <h1>{action} Student</h1>

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
                placeholder='2.0' />
            </FormGroup>

            <FormGroup>
              <Label for='schoolId'>School</Label>
              <Input
                id='schoolId'
                value={schoolId}
                onChange={handleChange}
                type='select'
                name='schoolId'>
                <option value={0}>Not Enrolled</option>
                {
                  schools.map(school => {
                    return <option key={school.id} value={school.id}>{school.name}</option>
                  })
                }
              </Input>
            </FormGroup>

            <Button color='success' disabled={disabled}>Submit</Button>

            <span className='floatRight'>
              <Button
                style={!this.props.id ? { display: 'none' } : null} color='danger'
                onClick={() => {
                  if (confirm('Delete Student?')) { deleteStudent(student) }
                }}>Delete
              </Button>
            </span>

          </Form>
        </Container>
      </div>
    )
  }
};

//_______________________________________________________________
const mapStateToProps = ({ students, schools, }, { id, }) => {
  const student = students.find(student => student.id === id);

  return {
    student,
    schools,
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  deleteStudent: (student) => dispatch(deleteStudent(student, history)),
  createStudent: (student) => dispatch(createStudent(student)),
  updateStudent: (student) => dispatch(updateStudent(student, history)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreateUpdate);
