import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { deleteSchool, createSchool } from '../reducers/schools';

class Schools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      description: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value, }) }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createSchool({
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    });

    this.setState({
      name: '',
      address: '',
      description: '',
    })
  }

  render() {
    const { name, address, description } = this.state;
    const { schools, deleteSchool } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Schools</h1>

        <Container>
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
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label for='description'>Description</Label>
              <Input
                id='description'
                value={description}
                onChange={handleChange}
                type='textarea'
                name='description' />
            </FormGroup>

            <Button
              color='success'
              disabled={!name || !address || !description}
            >Submit</Button>

          </Form>
        </Container>


        <ul>
          {
            schools.map(school => {
              return <li key={school.id}>
                <Link to={`/schools/${school.id}`}>{school.name} </Link>
                ({school.students.length})
                <button onClick={() => deleteSchool(school)}>X</button>
              </li>
            })
          }
        </ul>
      </div>
    )
  }
}

//_______________________________________________________________
const mapStateToProps = ({ schools, students }) => {

  return {
    schools,
    students,
  }
}
const mapDispatchToProps = dispatch => ({
  deleteSchool: (school) => dispatch(deleteSchool(school)),
  createSchool: (school) => dispatch(createSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schools)
