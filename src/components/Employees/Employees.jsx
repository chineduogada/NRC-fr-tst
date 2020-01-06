import React, { Component } from "react";
import "./Employees.scss";
import Button from "../Button/Button";
import Searchbox from "../Searchbox/Searchbox";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";

export default class Employees extends Component {
	state = {
		pageSize: 20,
		currentPage: 1
	}

	render() {
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
						<div className="TableRow">
							<div className="TableCol">
								<h6>richCode</h6>
							</div>
							<div className="TableCol">
								<h6>Software dev</h6>
							</div>
							<div className="TableCol">
								<h6>NYSC</h6>
							</div>
							<div className="TableCol">
								<h6>Whatever!</h6>
							</div>
						</div>
						<div className="d-flex TableRow">
							<div className="TableCol">
								<h6>richCode</h6>
							</div>
							<div className="TableCol">
								<h6>Software dev</h6>
							</div>
							<div className="TableCol">
								<h6>NYSC</h6>
							</div>
							<div className="TableCol">
								<h6>Whatever!</h6>
							</div>
						</div>
						<div className="d-flex TableRow">
							<div className="TableCol">
								<h6>richCode</h6>
							</div>
							<div className="TableCol">
								<h6>Software dev</h6>
							</div>
							<div className="TableCol">
								<h6>NYSC</h6>
							</div>
							<div className="TableCol">
								<h6>Whatever!</h6>
							</div>
						</div>
						<div className="d-flex TableRow">
							<div className="TableCol">
								<h6>richCode</h6>
							</div>
							<div className="TableCol">
								<h6>Software dev</h6>
							</div>
							<div className="TableCol">
								<h6>NYSC</h6>
							</div>
							<div className="TableCol">
								<h6>Whatever!</h6>
							</div>
						</div>
					</div>
				</main>
				<footer>
					<Pagination />
				</footer>
			</section>
		);
	}
}
