import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';

import { createStudent } from '../reducers/students';

class Students extends Component {
  render() {
    const { students, schools } = this.props;
    return (
      <div>
        <h1>Students</h1>

        <Container>
          <Link to='/students/create' replace>
            <Button color="primary">Add Student</Button>
          </Link>

          <ListGroup>
            {
              students.map(student => {
                const findSchool = schools.find(school => school.id === student.schoolId);

                return (
                  <ListGroupItem key={student.id}>

                    <Link to={`/students/${student.id}`} replace>
                      {student.last}, {student.first}
                    </Link>

                    <span className='floatRight'>
                      <Link to={`/schools/${student.schoolId}`} replace>
                        {
                          findSchool ? findSchool['name'] : 'Not Enrolled'
                        }
                      </Link>
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
const mapStateToProps = ({ students, schools, }) => ({ students, schools, })

const mapDispatchToProps = dispatch => ({
  createStudent: (student) => dispatch(createStudent(student)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
