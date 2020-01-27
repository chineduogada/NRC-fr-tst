import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { getToken } from '../../services/Credentials';
import { Switch, Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Aside from './Aside/Aside';
import MainArea from './MainArea/MainArea';
import classes from './Layout.module.scss';
import AllEmployees from '../../pages/AllEmployees/AllEmployees';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Department from '../../pages/Department/Department';
import Employee from '../../pages/Employee/Employee';
import AddNewEmployee from '../../pages/AddNewEmployee/AddNewEmployee';
import AllTrainingSchedules from '../../pages/AllTrainingSchedules/AllTrainingSchedules';
import TrainingSchedule from '../../pages/TrainingSchedule/TrainingSchedule';
import AllTrainingRecords from '../../pages/AllTrainingRecords/AllTrainingRecords';
import TrainingRecord from '../../pages/TrainingRecord/TrainingRecord';
import AllCareers from '../../pages/AllCareers/AllCareers';
import Career from '../../pages/Career/Career';
import AllJobIncidence from '../../pages/AllJobIncidence/AllJobIncidence';
import JobIncidence from '../../pages/JobIncidence/JobIncidence';
import Import from '../../pages/Import/Import';
import Users from '../../pages/Users/Users';

const Layout = ({ userLoggedIn, signOutHandler }) => {
  // set token
  const token = getToken();
  if (token) {
    axios.defaults.headers = {
      token
    };
  }

  const renderLayout = () => (
    <div className={classes.Layout}>
      {/* Aside */}
      <Aside />
      {/* Main Section */}
      <div className='d-flex flex-column' style={{ position: 'relative' }}>
        {/* Navigation */}
        <Nav triggerSignOut={signOutHandler} />
        <MainArea>
          {/* <AllEmployees /> */}
          <Switch>
            <Route path='/' exact component={Dashboard} />
            <Route
              path='/training-schedules'
              exact
              component={AllTrainingSchedules}
            />
            <Route
              path='/training-schedules/:id'
              exact
              component={TrainingSchedule}
            />
            <Route
              path='/training-records'
              exact
              component={AllTrainingRecords}
            />
            <Route
              path='/training-records/:id'
              exact
              component={TrainingRecord}
            />
            <Route path='/employee/' exact component={AllEmployees} />
            <Route path='/employee/new' exact component={AddNewEmployee} />
            <Route path='/employee/:ippisNo' exact component={Employee} />
            <Route path='/departments' component={Department} />
            <Route path='/careers' exact component={AllCareers} />
            <Route path='/careers/:id' exact component={Career} />
            <Route path='/job-incidence' exact component={AllJobIncidence} />
            <Route path='/job-incidence/:id' exact component={JobIncidence} />
            <Route path='/import' exact component={Import} />
            <Route path='/users' exact component={Users} />
          </Switch>
        </MainArea>
      </div>
    </div>
  );
  return userLoggedIn ? renderLayout() : <Redirect to='/' />;
};

export default Layout;
