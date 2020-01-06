import React, { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./Starter.module.scss";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

export default class Starter extends Component {
	state = {
		databaseRegistered: false
	};

	checkDbReg() {
		if (this.state.databaseRegistered) {
		} else {
		}
	}

	getStarted() {}

	render() {
		return (
			<div className={classes.Starter}>
				<main className="d-flex flex-column align-items-center justify-content-center">
					<Loader brand="brand here" />

					<div className="msg">
						<p>
							Looks like you haven't setup some params. Lets get you started!
						</p>
						<Link to="/setup/db">
							<Button label="get started" light />
						</Link>
					</div>
				</main>
			</div>
		);
	}
}
