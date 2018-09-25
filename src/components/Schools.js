import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteSchool, createSchool } from '../store';

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
    const { schools, deleteSchool } = this.props;
    const { name, address, description } = this.state;
    const { handleChange, handleSubmit } = this;
    return (
      <div>
        <h1>Schools</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='schoolName'>Name</label>
          <input
            id='schoolName'
            value={name}
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Monterssori School'
            autoFocus
          ></input>

          <label htmlFor='address'>Address</label>
          <input
            id='address'
            value={address}
            onChange={handleChange}
            type='text'
            name='address'
          ></input>

          <label>
            Description:
            <textarea
              value={description}
              onChange={handleChange}
              name='description' />
          </label>

          <button disabled={!name || !address || !description}>Submit</button>
        </form>
        <ul>
          {
            schools.map(school => {
              return <li key={school.id}>
                {school.name}
                {school.address}
                {school.description}
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
const mapStateToProps = ({ schools }) => ({ schools });
const mapDispatchToProps = dispatch => ({
  deleteSchool: (school) => dispatch(deleteSchool(school)),
  createSchool: (school) => dispatch(createSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schools)
