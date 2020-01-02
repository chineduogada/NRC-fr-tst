import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Starter.css";
import Button from "../Button/Button";

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
			<main className="d-flex flex-column align-items-center justify-content-center">
				<h3>Brand here</h3>
				<h2>Loading...</h2>

				<div className="msg">
					<p>Looks like you haven't setup some params. Lets get you started!</p>
					<Link to="/setup/db">
						<Button label="get started" light />
					</Link>
				</div>
			</main>
		);
	}
}
