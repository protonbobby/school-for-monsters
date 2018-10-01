import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Badge, Button } from 'reactstrap';

import { deleteStudent, createStudent } from '../reducers/students';
import { selected, matchSchool, enrolled } from '../selectors';

class Students extends Component {
  render() {
    const { students, schools, deleteStudent, filter } = this.props;

    return (
      <div>
        <h1>Students</h1>

        <Container>
          <Link to='/students/create' replace>
            <Button color="primary">Add Student</Button>
          </Link>

          <Link to='/students/' replace>
            <Button color={selected(undefined, filter)}>All</Button>
          </Link>

          <Link to='/students/enrolled' replace>
            <Button color={selected('enrolled', filter)}>Enrolled</Button>
          </Link>

          <Link to='/students/unenrolled' replace>
            <Button color={selected('unenrolled', filter)}>Unenrolled</Button>
          </Link>

          <ListGroup>
            {
              students.map(student => {
                return (
                  <ListGroupItem key={student.id}>

                    <Link to={`/students/${student.id}`}>
                      {student.last}, {student.first}
                    </Link>

                    <span className='floatRight'>
                      <Link to={`/schools/${student.schoolId}`}>{matchSchool(schools, student.schoolId)}</Link>

                      <Button color='danger' onClick={() => deleteStudent(student)}>X</Button>
                    </span>

                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </Container>
      </div >
    )
  }
}

//_______________________________________________________________
const mapStateToProps = ({ students, schools }, { filter }) => ({
  students: enrolled(students, filter),
  schools,
  filter,
})

const mapDispatchToProps = dispatch => ({
  deleteStudent: (student) => dispatch(deleteStudent(student)),
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
