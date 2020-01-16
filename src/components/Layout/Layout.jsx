import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { getToken } from "../../services/Credentials";
import { Switch, Route } from "react-router-dom";
import Nav from "../Nav/Nav";
import Aside from "./Aside/Aside";
import MainArea from "./MainArea/MainArea";
import classes from "./Layout.module.scss";
import AllEmployees from "../../pages/AllEmployees/AllEmployees";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Department from "../../pages/Department/Department";
import Employee from "../../pages/Employee/Employee";
import AddNewEmployee from "../../pages/AddNewEmployee/AddNewEmployee";

const Layout = props => {
	// set token
	const token = getToken();
	// console.log(token);
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
			<div className="d-flex flex-column">
				{/* Navigation */}
				<Nav triggerSignOut={props.signOutHandler} />
				<MainArea>
					{/* <AllEmployees /> */}
					<Switch>
						{/* <Route path="/" exact component={Starter} /> */}
						<Route path="/" exact component={Dashboard} />
						<Route path="/training-schedule" exact component={AllEmployees} />
						<Route path="/employee/" exact component={AllEmployees} />
						<Route path="/employee/new" exact component={AddNewEmployee} />
						<Route path="/employee/:ippisNo" exact component={Employee} />
						<Route path="/department" exact component={Department} />
						<Route path="/department/([0-9]+)" exact component={Department} />
					</Switch>
				</MainArea>
			</div>
		</div>
	);

	return true ? renderLayout() : <Redirect to="/signin" />;
};

export default Layout;
