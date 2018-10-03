import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, FormGroup, Label, Input, Button, ListGroup, ListGroupItem } from 'reactstrap';

import { deleteSchool, createSchool, updateSchool } from '../reducers/schools';
import { giveMeOne } from '../selectors';

class SchoolCreateUpdate extends Component {
  constructor({ school }) {
    super();
    this.state = {
      name: school ? school.name : '',
      address: school ? school.address : '',
      description: school ? school.description : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
    const { id, createSchool, updateSchool } = this.props;
    let school = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    }

    if (id === undefined) {
      createSchool(school)
    } else {
      school.id = id;
      updateSchool(school)
    }

    this.setState({
      name: '',
      address: '',
      description: '',
    })
      .then(() => this.props.history.push('/schools'))
  }

  render() {
    const { name, address, description } = this.state;
    const { school, students, deleteSchool } = this.props;
    const { handleChange, handleSubmit } = this;
    const disabled = !name || !address || !description;
    const action = this.props.id ? 'Edit' : 'Add';
    return (
      <div>
        <h1>{action} School</h1>

        <Container>
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
                placeholder='Monterssori School'
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
            >Save</Button>

            <span className='floatRight'>
              <Button disabled={!this.props.id} color='danger' onClick={() => {
                if (confirm('Delete School?')) { deleteSchool(school) }
              }}>Delete</Button>
            </span>

          </Form>
        </Container>

        {
          this.props.id ?
            <div>
              <h2>Students</h2>
              <Container>
                <ListGroup>
                  {/* {school.students.map(student => {
                    return <ListGroupItem key={student.id}>
                      <Link to={`/students/${student.id}`} replace>
                        {student.last}, {student.first}
                      </Link>

                      <span className='floatRight'>
                        <Button disabled={!this.props.id} color='warning' onClick={() => { if (confirm('Unenroll student?')) { href = '#' } }
                        }>Unenroll</Button>
                      </span>
                      <span className='floatRight'>GPA: ({student.gpa})</span>
                    </ListGroupItem>
                  })} */}
                </ListGroup>
              </Container>
            </div> : null
        }

      </div >
    )
  };
};

//_______________________________________________________________
const mapStateToProps = ({ schools, students }, { id, }) => ({
  schools,
  school: giveMeOne(schools, id),
  students,
})

const mapDispatchToProps = (dispatch, { history }) => ({
  deleteSchool: (school) => dispatch(deleteSchool(school)),
  createSchool: (school) => dispatch(createSchool(school)),
  updateSchool: (school) => dispatch(updateSchool(school, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreateUpdate)
