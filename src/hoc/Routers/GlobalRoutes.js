import React from "react";
import { Switch, Route } from "react-router-dom";
import Aux from "../Auxiliary/Auxiliary";
import Starter from "../../components/Starter/Starter";
import Setup from "../../components/Setup/Setup";
import Dashboard from "../../pages/Dashboard/Dashboard";
import AllEmployees from "../../pages/AllEmployees/AllEmployees";
import Employees from "../../pages/Employees/Employees";
import Department from "../../pages/Department/Department";

const globalRoutes = props => {
	// eslint-disable-next-line no-unused-expressions
	return <Aux></Aux>;
};

export default globalRoutes;
