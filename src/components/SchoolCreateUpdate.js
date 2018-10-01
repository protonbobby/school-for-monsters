import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { createSchool, updateSchool } from '../reducers/schools';
import { findSchool } from '../selectors';

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

    if (this.props.id === undefined) {
      this.props.createSchool({
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
      })
    } else {
      this.props.updateSchool({
        id: this.props.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
      })
    }

    this.setState({
      name: '',
      address: '',
      description: '',
    })

    this.props.history.push('/schools');
  }

  render() {
    const { name, address, description } = this.state;
    const { id } = this.props;
    const { handleChange, handleSubmit } = this;
    const disabled = !name || !address || !description;
    const action = id ? 'Edit' : 'Add';
    return (
      <div>
        <h1>{action} School</h1>

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

          </Form>
        </Container>

      </div>
    )
  };
};

//_______________________________________________________________
const mapStateToProps = ({ schools, }, { id, history, }) => ({
  schools,
  school: findSchool(schools, id),
  history,
})

const mapDispatchToProps = dispatch => ({
  createSchool: (school) => dispatch(createSchool(school)),
  updateSchool: (school) => dispatch(updateSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SchoolCreateUpdate)
