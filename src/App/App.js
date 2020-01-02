import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Starter from "../components/Starter/Starter";
import Setup from "../components/Setup/Setup";

const App = () => {
	return (
		<Switch>
			<Route path="/starter" component={Starter} />
			<Route path="/setup" component={Setup} />

			<Redirect from="/" exact to="/starter" />
		</Switch>
	);
};

export default App;
