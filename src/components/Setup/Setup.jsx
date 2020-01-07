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
}
