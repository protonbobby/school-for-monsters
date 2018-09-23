import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import { loadStudents, loadSchools } from './store';
import Nav from './components/Nav';
import Students from './components/Students';

class App extends Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadSchools();
  }

  render() {
    return (
      <div>
        <hr />
        <Router>
          <div>
            <Route component={Nav} />
            <Route path="/students" component={Students} />
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
  loadSchools: () => dispatch(loadSchools())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
