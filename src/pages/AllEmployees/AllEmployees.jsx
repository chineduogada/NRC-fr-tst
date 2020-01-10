import React, { Component } from "react";
import TableView from "../../components/TableView/TableView";
import getAllEmployees from "../../mock/employee/allEmployees";

export default class AllEmployees extends Component {
	state = {
		employees: [],
		columns: [
			{ key: "name", label: "Name" },
			{ key: "department", label: "Department" },
			{ key: "district", label: "District" }
		],
		pageSize: 20,
		currentPage: 1
	};

	componentDidMount() {
		const employees = [];

		getAllEmployees.data.rows.forEach(employee => {
			employees.push(this.mapToViewModel(employee));
		});

		this.setState({ employees });
	}

	mapToViewModel(employee) {
		return {
			id: employee.ippisNo,
			name: `${employee.firstName} ${employee.lastName}`,
			department: employee.employeeJob.department.description,
			district: employee.employeeJob.district.siteName
		};
	}

	renderAllEmp() {
		console.log(this.state.employees);
	}

	handlePageChange = page => {
		this.setState({ currentPage: page });
	};

	render() {
		const { employees, currentPage, columns } = this.state;

		this.renderAllEmp();

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
