<<<<<<< HEAD
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Starter.module.css';
import Button from '../Button/Button';
import Auth from '../../pages/Auth/Auth';
=======
import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Starter.module.scss";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
>>>>>>> 84f15c05c6d63c8045a505fd9fcf9d3e791b8044

export default class Starter extends Component {
  state = {
    databaseRegistered: true
  };

  checkDbReg() {
    if (this.state.databaseRegistered) {
    } else {
    }
  }

  renderSetup() {
    return (
      <div className={classes.Starter}>
        <main className="d-flex flex-column align-items-center justify-content-center">
          <h3>Brand here</h3>
          <h2>Loading...</h2>

<<<<<<< HEAD
          <div className="msg">
            <p>
              Looks like you haven't setup some params. Lets get you started!
            </p>
            <Link to="/setup/database">
              <Button label="get started" light />
            </Link>
          </div>
        </main>
      </div>
    );
  }
=======
	render() {
		return (
			<div className={classes.Starter}>
				<main className="d-flex flex-column align-items-center justify-content-center">
					<Loader brand="brand here" />
>>>>>>> 84f15c05c6d63c8045a505fd9fcf9d3e791b8044

  render() {
    return this.state.databaseRegistered ? <Auth /> : this.renderSetup();
  }
}
