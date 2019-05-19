import React from 'react';
import AppBar from '../components/AppBar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Patient from './Patient';
import Patients from './Patients';
import PageNotFound from './PageNotFound';

const App = (props) => {
  const { authState } = props;

  if (authState !== 'signedIn') {
    return null;
  }

  return (
    <div>
      <AppBar />
      <Router>
        <Switch>
          <Route
            path="/patients/new"
            exact
            component={Patient}
          />
          <Route
            path="/patients/:id"
            component={Patient}
          />
          <Route
            path="/patients"
            component={Patients}
          />
          <Redirect
            from="/"
            to="/patients"
          />
          <Route
            component={PageNotFound}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
