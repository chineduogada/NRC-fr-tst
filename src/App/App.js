import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Starter from "../components/Starter/Starter";
import Setup from "../components/Setup/Setup";
import Employees from "../components/Employees/Employees";

const App = () => {
	return (
		<Switch>
			<Route path="/starter" component={Starter} />
			<Route path="/setup" component={Setup} />
			<Route path="/employees" component={Employees} />

			<Redirect from="/" exact to="/starter" />
		</Switch>
	);
};

export default App;
