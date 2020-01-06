import React, { Component } from "react";
import "./Employees.scss";
import Button from "../Button/Button";
import Searchbox from "../Searchbox/Searchbox";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import { getEmployees } from "../../services/employees";

export default class Employees extends Component {
	state = {
		employees: [],
		pageSize: 20,
		currentPage: 1
	};

	componentDidMount() {
		const employees = getEmployees();

		this.setState({ employees });
	}

	handlePageChange = page => {
		console.log(page);
	};

	render() {
		const { employees, currentPage } = this.state;

		return (
			<section className="Employees">
				<h4>Employees</h4>

				<div className="d-flex justify-content-end">
					<Button label="add new" fill />
					<Button label="print" />
				</div>

				<header>
					<div className="d-flex justify-content-between mt-2">
						<Searchbox />

						<Filter />
					</div>
					<div className="TableHeader">
						<div className="TableRow">
							<div className="TableCol">
								<h6>Name</h6>
							</div>
							<div className="TableCol">
								<h6>Department</h6>
							</div>
							<div className="TableCol">
								<h6>Job Type</h6>
							</div>
							<div className="TableCol">
								<h6>Job Title</h6>
							</div>
						</div>
					</div>
				</header>

				<main>
					<div className="TableBody">
						{employees.map(employee => (
							<div key={employee.id} className="TableRow">
								<div className="TableCol">
									<h6>{employee.name}</h6>
								</div>
								<div className="TableCol">
									<h6>{employee.department}</h6>
								</div>
								<div className="TableCol">
									<h6>{employee.jobType}</h6>
								</div>
								<div className="TableCol">
									<h6>{employee.jobTitle}</h6>
								</div>
							</div>
						))}
					</div>
				</main>
				<footer>
					<Pagination
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
					/>
				</footer>
			</section>
		);
	}
}
