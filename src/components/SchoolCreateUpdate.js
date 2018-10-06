import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';

import { deleteSchool, createSchool, updateSchool } from '../reducers/schools';
import { updateStudent } from '../reducers/students';


class SchoolCreateUpdate extends Component {
  constructor({ school }) {
    super();
    this.state = {
      name: school ? school.name : '',
      address: school ? school.address : '',
      description: school ? school.description : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(e) { this.setState({ [e.target.name]: e.target.value }) };

  componentDidUpdate(prevProps) {
    if (!prevProps.school && this.props.school) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const _school = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    }

    if (!this.props.id) {
      this.props.createSchool(_school)
    } else {
      _school['id'] = this.props.school.id;
      this.props.updateSchool(_school)
    }

    this.props.history.push('/schools');
  }

  enrollment(student, school, action = false) {
    let _student;
    if (action) {
      _student = Object.assign(student, { schoolId: school.id });
    } else {
      _student = Object.assign(student, { schoolId: null });
    }
    this.props.updateStudent(_student);
  }

  render() {
    const { name, address, description } = this.state;
    const { school, students, deleteSchool } = this.props;
    const { handleChange, handleSubmit } = this;
    const disabled = !name || !address || !description;
    const action = this.props.id ? 'Edit' : 'Add';

    if (!this.state) {
      return null;
    }

    return (
      <div>
        <Container>
          <h1>{action} School</h1>

          <Link to='/schools' replace>
            <Button color='primary'>Back</Button>
          </Link>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                id='name'
                value={name}
                onChange={handleChange}
                type='text'
                name='name'
                placeholder='Monsterssori School'
                autoFocus />
            </FormGroup>

            <FormGroup>

              <Label for='address'>Address</Label>
              <Input
                id='address'
                value={address}
                onChange={handleChange}
                type='text'
                name='address'
                placeholder='123 Fake Street'
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for='description'>Description</Label>
              <Input
                id='description'
                value={description}
                onChange={handleChange}
                type='textarea'
                name='description'
                placeholder='Very spooky place!' />
            </FormGroup>

            <Button
              color='success'
              disabled={disabled}
            >Save
            </Button>

            <span className='floatRight'>
              <Button
                style={!this.props.id ? { display: 'none' } : null}
                color='danger'
                onClick={() => {
                  if (confirm('Delete School?')) { deleteSchool(school) }
                }}>Delete
              </Button>
            </span>

          </Form>
        </Container>
        <br />

        {
          school && this.props.id ?
            <div>
              <Container>
                <h2>Enrolled Students</h2>

                <ListGroup>
                  {
                    students
                      .filter(student => student.schoolId === school.id)
                      .map(student => {
                        return (
                          <ListGroupItem key={student.id}>
                            <Link to={`/students/${student.id}`} replace>
                              {student.last}, {student.first}
                            </Link>

                            <span className='floatRight'>
                              <Button
                                disabled={!this.props.id}
                                color='warning'
                                onClick={() => {
                                  if (confirm('Unenroll student?')) {
                                    this.enrollment(student, school)
                                  }
                                }
                                }>Unenroll</Button>
                            </span>
                          </ListGroupItem>
                        )
                      })
                  }
                </ListGroup>

                <br />

                <ListGroup>
                  <h2>Unenrolled Students</h2>
                  {
                    students
                      .filter(student => student.schoolId === null)
                      .map(student => {
                        return (
                          <ListGroupItem key={student.id}>
                            <Link to={`/students/${student.id}`} replace>
                              {student.last}, {student.first}
                            </Link>

                            <span className='floatRight'>
                              <Button
                                disabled={!this.props.id}
                                color='warning'
                                onClick={() => {
                                  if (confirm('Enroll student?')) {
                                    this.enrollment(student, school, true)
                                  }
                                }
                                }>Enroll</Button>
                            </span>
                          </ListGroupItem>
                        )
                      })
                  }
                </ListGroup>

              </Container>
            </div> : null
        }

      </div >
    )
  };
};

//_______________________________________________________________
const mapStateToProps = ({ schools, students }, { id, }) => {
  const school = schools.find(school => school.id === id);

  return {
    school,
    students,
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  deleteSchool: (school) => dispatch(deleteSchool(school, history)),
  createSchool: (school) => dispatch(createSchool(school)),
  updateSchool: (school) => dispatch(updateSchool(school, history)),

  updateStudent: (student) => dispatch(updateStudent(student)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreateUpdate);
