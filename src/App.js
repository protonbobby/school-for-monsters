import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { loadStudents } from './reducers/students';
import { loadSchools } from './reducers/schools';
import NavBar from './components/NavBar';
import Students from './components/Students';
import StudentCreateUpdate from './components/StudentCreateUpdate';
import Schools from './components/Schools';
import SchoolCreateUpdate from './components/SchoolCreateUpdate';

class App extends Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadSchools();
  }

  render() {
    return (
      <div>
        <hr />
        <Router >
          <div >

            <Route component={({ location }) => <NavBar path={location.pathname} />} />

            <Route exact path="/" render={() => <img src="../dist/images/monsterPNG.png" id="homeImg"></img>} />

            <Route exact path="/schools" component={Schools} replace />

            <Route exact path="/students" component={Students} replace />

            <Switch>
              <Route path="/schools/create" component={({ history }) => <SchoolCreateUpdate history={history} />} />
              <Route path="/schools/:id" component={({ history, match }) => <SchoolCreateUpdate history={history} id={match.params.id * 1} />} />
              <Route path="/students/create" component={({ history }) => <StudentCreateUpdate history={history} />} />
              <Route path="/students/:id" component={({ history, match }) => <StudentCreateUpdate history={history} id={match.params.id * 1} />} />
            </Switch>

          </div>
        </Router>
      </div>
    )
  }
};

//_______________________________________________________________
const mapStateToProps = ({ students, schools }) => ({
  students,
  schools,
});

const mapDispatchToProps = (dispatch) => ({
  loadStudents: () => dispatch(loadStudents()),
  loadSchools: () => dispatch(loadSchools()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
