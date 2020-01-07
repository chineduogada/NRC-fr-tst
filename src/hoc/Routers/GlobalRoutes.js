import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Aux from '../Auxiliary/Auxiliary';
import Starter from '../../components/Starter/Starter';
import Setup from '../../components/Setup/Setup';
import Dashboard from '../../pages/Dashboard/Dashboard';
import AllEmployees from '../../pages/AllEmployees/AllEmployees';
import Employees from '../../pages/Employees/Employees';
import Department from '../../pages/Department/Department';

const globalRoutes = props => {
  // eslint-disable-next-line no-unused-expressions
  return (
    <Aux>
      <Switch>
        {/* <Route path="/" exact component={Starter} /> */}
        <Route path="/" exact component={Dashboard} />
        <Route path="/setup/database" exact component={Setup} />
        <Route path="/setup/superuser" exact component={Setup} />
        <Route path="/training-schedule" exact component={AllEmployees} />
        <Route path="/employee/" exact component={Employees} />
        <Route path="/employee/:id" exact component={Department} />
        <Route path="/department" exact component={Department} />
        <Route path="/department/([0-9]+)" exact component={Department} />
      </Switch>
    </Aux>
  );
};

export default globalRoutes;
