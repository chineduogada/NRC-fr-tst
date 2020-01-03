import React, { Component } from "react";
import classes from "./Employees.module.css";
import Button from "../Button/Button";
import { Row, Col, DropdownButton, Dropdown } from "react-bootstrap";
import Searchbox from "../Searchbox/Searchbox";
import Filter from "../Filter/Filter";

export default class Employees extends Component {
	render() {
		return (
			<section className={classes.Employee}>
				<h4>Employees</h4>

				<header>
					<div className="d-flex justify-content-end">
						<Button label="add new" fill />
						<Button label="print" />
					</div>
					<div className="d-flex justify-content-between mt-2">
						<Searchbox />

						<Filter />
					</div>
					<Row className={classes.TableHeader}>
						<Col>Name</Col>
						<Col>Department</Col>
						<Col>Job Type</Col>
						<Col>Job Title</Col>
					</Row>
				</header>
				<main></main>
				<footer></footer>
			</section>
		);
	}
}
