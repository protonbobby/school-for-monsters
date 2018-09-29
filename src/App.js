import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { loadStudents } from './reducers/students';
import { loadSchools } from './reducers/schools';
import Nav from './components/Nav';
import School from './components/School';
import Students from './components/Students';
import Schools from './components/Schools';
import CreateStudent from './components/CreateStudent';

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

            <Route component={Nav} />

            <Route exact path="/" render={() => <img src="../dist/images/avenueq-monsters.jpg" id="homeImg"></img>} />

            <Route exact path="/students" component={Students} />
            <Route exact path="/schools" component={Schools} />

            <Switch>
              <Route path='/schools/create' component={School} />
              <Route path="/schools/:id" component={School} />
            </Switch>

            <Switch>
              <Route path="/students/create" component={CreateStudent} />
              <Route path='/students/:id' component={CreateStudent} />
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
