import React, { Component } from "react";
import classes from "./Employee.module.scss";

export default class Employee extends Component {
	state = {};
	render() {
		return (
			<section className={classes.Employee}>
				<header>
					<div className={classes.ImgWrapper}></div>
				</header>
				<main></main>
				<footer></footer>
			</section>
		);
	}
}
