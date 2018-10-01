import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { deleteSchool, createSchool } from '../reducers/schools';

class Schools extends Component {


  render() {
    const { schools, deleteSchool } = this.props;
    return (
      <div>
        <h1>Schools</h1>

        <Container>
          <Link to='/schools/create' replace>
            <Button color='primary'>Add School</Button>
          </Link>

          <ListGroup>
            {
              schools.map(school => {
                return (
                  <ListGroupItem key={school.id}>

                    <Link to={`/schools/${school.id}`} replace>{school.name} </Link>
                    ({school.students.length || 0})

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
};

//_______________________________________________________________
const mapStateToProps = ({ schools, students }) => ({
  schools,
  students,
});

const mapDispatchToProps = dispatch => ({
  deleteSchool: (school) => dispatch(deleteSchool(school)),
  createSchool: (school) => dispatch(createSchool(school)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
