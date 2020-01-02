import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Setup.css";
import RegisterDatabase from "./RegisterDatabase/RegisterDatabase";
import RegisterSuperUser from "./RegisterSuperUser/RegisterSuperUser";

export default function Setup() {
	return (
		<div className="setup row">
			<div className="col">
				<Switch>
					<Route path="/setup/db" component={RegisterDatabase} />
					<Route path="/setup/super-user" component={RegisterSuperUser} />
					<Redirect from="/setup" exact to="/setup/db" />
				</Switch>
			</div>
			<div className="col"></div>
		</div>
	);
}
