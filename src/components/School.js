import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSchool } from '../reducers/schools';

class School extends Component {
  constructor({ school }) {
    super()
    this.state = {
      name: school ? school.name : '',
      address: school ? school.address : '',
      description: school ? school.description : '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  handleChange(e) { this.setState({ [e.target.name]: e.target.value }) }

  componentDidUpdate(prevProps) {
    if (!prevProps.school && this.props.school) {
      this.setState({
        name: this.props.school.name,
        address: this.props.school.address,
        description: this.props.school.description,
      })
    }
  }

  onSave(e) {
    e.preventDefault();

    this.props.updateSchool({
      id: this.props.school.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
    });

    this.setState({
      name: '',
      address: '',
      description: '',
    })

    this.props.history.push('/schools');
  }

  render() {
    const { name, address, description } = this.state;
    const { handleChange, onSave } = this;

    const disabled = !name || !address || !description;

    return (
      <div>
        <form onSubmit={onSave}>

          <label htmlFor='name'>Name</label>
          <input
            id='name'
            value={name}
            onChange={handleChange}
            name='name'
            autoFocus />

          <label htmlFor='address'>Address</label>
          <input
            id='address'
            value={address}
            onChange={handleChange}
            name='address' />

          <label>
            Description:
            <textarea
              value={description}
              onChange={handleChange}
              name='description' />
          </label>

          <button disabled={disabled}>Update</button>
        </form>
      </div>
    )
  }
}

//_______________________________________________________________
const mapStateToProps = ({ schools }, { match, history }) => {
  const school = schools.find(school => school.id === match.params.id * 1)
  // if (school) {
  //   const students = students.filter(student => student.school.id === student.schoolId);
  // }
  return {
    school,
    history,
    //students
  }
}
const mapDispatchToProps = dispatch => ({
  updateSchool: (school) => dispatch(updateSchool(school)),
})

export default connect(mapStateToProps, mapDispatchToProps)(School);
