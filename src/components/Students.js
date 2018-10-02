import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { createStudent } from '../reducers/students';
import { selected, matchSchool, enrolled } from '../selectors';

class Students extends Component {
  render() {
    const { students, schools, filter } = this.props;
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
                console.log('----.>', student)
                return (
                  <ListGroupItem key={student.id}>

                    <Link to={`/students/${student.id}`} replace>
                      {student.last}, {student.first}
                    </Link>

                    <span className='floatRight'>
                      <Link to={`/schools/${student.schoolId}`}>{student.schoolId === null ? "Not Enrolled" : matchSchool(schools, student.schoolId)}</Link>
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
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
