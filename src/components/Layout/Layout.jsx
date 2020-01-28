import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, Redirect } from "react-router-dom";
import { getToken } from "../../services/Credentials";
import Nav from "../Nav/Nav";
import Aside from "./Aside/Aside";
import MainArea from "./MainArea/MainArea";
import classes from "./Layout.module.scss";
import AllEmployees from "../../pages/AllEmployees/AllEmployees";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Department from "../../pages/Department/Department";
import Employee from "../../pages/Employee/Employee";
import AddNewEmployee from "../../pages/AddNewEmployee/AddNewEmployee";
import AllTrainingSchedules from "../../pages/AllTrainingSchedules/AllTrainingSchedules";
import TrainingSchedule from "../../pages/TrainingSchedule/TrainingSchedule";
import AllTrainingRecords from "../../pages/AllTrainingRecords/AllTrainingRecords";
import TrainingRecord from "../../pages/TrainingRecord/TrainingRecord";

export default class Layout extends Component {

  state = {
    currentTab: "dashboard"
  }

  handleAsideTabChange = (tab) => {
    this.setState({currentTab: tab})
  }

  token = getToken();
  if(token) {
    axios.defaults.headers = {
      token
    };
  }

  renderLayout = () => (
    <div className={classes.Layout}>
      {/* Aside */}
      <Aside currentTab={this.state.currentTab} onAsideTabChange={this.handleAsideTabChange}  />
      {/* Main Section */}
      <div className="d-flex flex-column">
        {/* Navigation */}
        <Nav triggerSignOut={this.props.signOutHandler} />
        <MainArea>
          {/* <AllEmployees /> */}
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route
              path="/training-schedules"
              exact
              component={AllTrainingSchedules}
            />
            <Route
              path="/training-schedules/new"
              exact
              component={AllTrainingSchedules}
            />
            <Route
              path="/training-schedules/:id"
              exact
              component={TrainingSchedule}
            />
            <Route
              path="/training-records"
              exact
              component={AllTrainingRecords}
            />
            <Route
              path="/training-records/:id"
              exact
              component={TrainingRecord}
            />
            <Route path="/employee/" exact component={AllEmployees} />
            <Route path="/employee/new" exact component={AddNewEmployee} />
            <Route path="/employee/:ippisNo" exact component={Employee} />
            <Route path="/departments" component={Department} />
          </Switch>
        </MainArea>
      </div>
    </div>
  );

  render() {
    return this.props.userLoggedIn ? this.renderLayout() : <Redirect to="/" />;
  }
}
