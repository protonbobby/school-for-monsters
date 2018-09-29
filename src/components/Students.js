import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';

import { deleteStudent, createStudent } from '../reducers/students';

class Students extends Component {

  render() {
    const { students, deleteStudent } = this.props;
    return (
      <div>
        <h1>Students</h1>

        <Container>
          <Link to='/students/create' replace>
            <Button color="primary" >Create Student</Button>
          </Link>

          <ListGroup>
            {
              students.map(student => {
                return <ListGroupItem key={student.id}>
                  {student.last}, {student.first}

                  <span className='floatRight'>
                    <Link to={`/schools/${student.schoolId}`}>{this.props.matchSchool(student.schoolId)}</Link>
                    <button onClick={() => deleteStudent(student)}>X</button>
                  </span>

                </ListGroupItem>
              })
            }
          </ListGroup>
        </Container>

      </div >
    )
  }
}


//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => {
  const matchSchool = (schoolId) => {
    const school = schools.find(school => {
      return school.id === schoolId
    })
    return school.name
  }

  return { students, schools, matchSchool };
}
const mapDispatchToProps = dispatch => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
