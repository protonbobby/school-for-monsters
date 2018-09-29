import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';

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
          <Link to='/schools/create' replace>
            <Button color='primary'>Create School</Button>
          </Link>


          <ListGroup>
            {
              schools.map(school => {
                return (
                  <ListGroupItem key={school.id}>

                    <Link to={`/schools/${school.id}`}>{school.name} </Link>
                    ({school.students.length})

                    <span className='floatRight'>
                      <Button color='danger' onClick={() => deleteSchool(school)}>X</Button>
                    </span>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </Container>
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
