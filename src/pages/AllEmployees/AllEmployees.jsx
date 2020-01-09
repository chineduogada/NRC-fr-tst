import React, { Component } from "react";
import { getEmployees } from "../../services/employees";
import TableView from "../../components/TableView/TableView";

export default class AllEmployees extends Component {
	state = {
		employees: [],
		columns: [
			{ title: "name", label: "Name" },
			{ title: "department", label: "Department" },
			{ title: "jobType", label: "Job Type" },
			{ title: "time", label: "Time" },
			{ title: "date", label: "Date" },
			{ title: "jobTitle", label: "Job Title" }
		],
		pageSize: 20,
		currentPage: 1
	};

	componentDidMount() {
		const employees = getEmployees();

		this.setState({ employees });
	}

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	render() {
		const { employees, currentPage, columns } = this.state;

		return (
			<TableView
				data={employees}
				columns={columns}
				currentPage={currentPage}
				onPageChange={this.handlePageChange}
				title="employees"
			/>
		);
	}
}
