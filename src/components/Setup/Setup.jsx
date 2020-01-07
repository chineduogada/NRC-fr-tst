<<<<<<< HEAD
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Setup.css';
import RegisterDatabase from './RegisterDatabase/RegisterDatabase';
import RegisterSuperUser from './RegisterSuperUser/RegisterSuperUser';

export default function Setup() {
  return (
    <Row className="Setup">
      <Col>
        <Switch>
          <Route path="/setup/database" component={RegisterDatabase} />
          <Route path="/setup/superuser" component={RegisterSuperUser} />
          <Redirect from="/setup" exact to="/setup/database" />
        </Switch>
      </Col>
      {/* <Col></Col> */}
    </Row>
  );
=======
import React from "react";
// import { Row, Col } from "react-bootstrap";
import { Route, Switch, Redirect } from "react-router-dom";
import "./Setup.scss";
import RegisterDatabase from "./RegisterDatabase/RegisterDatabase";
import RegisterSuperUser from "./RegisterSuperUser/RegisterSuperUser";

export default function Setup() {
	return (
		<section className="Setup">
			<div className="Col">
				<Switch>
					<Route path="/setup/db" component={RegisterDatabase} />
					<Route path="/setup/super-user" component={RegisterSuperUser} />
					<Redirect from="/setup" exact to="/setup/db" />
				</Switch>
			</div>
			<div className="Col"></div>
		</section>
	);
>>>>>>> 84f15c05c6d63c8045a505fd9fcf9d3e791b8044
}
