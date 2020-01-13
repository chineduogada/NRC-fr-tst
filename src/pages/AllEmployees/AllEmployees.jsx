import React, { Component } from "react";
import axios from "axios";
import TableView from "../../components/TableView/TableView";

export default class AllEmployees extends Component {
	state = {
		employees: [],
		columns: [
			{ key: "name", label: "Name" },
			{ key: "department", label: "Department" },
			{ key: "district", label: "District" },
			{ key: "employeeStatus", label: "Employee Status" },
			{ key: "pensionable", label: "Pensionable" },
			{ key: "firstAppointmentDate", label: "First Appointment Date" },
			{ key: "presentAppointmentDate", label: "Present Appointment Date" },
			{ key: "presentJobType", label: "present job type" },
			{ key: "presentJobTitle", label: "present job title" }
		],
		pageSize: 20,
		currentPage: 1
	};

	componentDidMount() {
		axios
			.get("/employee")
			.then(({ data }) => {
				console.log(data);

				data.data.rows.forEach(employee => {
					employees.push(this.mapToViewModel(employee));
				});

				this.setState({ employees });
			})
			.catch(e => console.log(e));

		const employees = [];
	}

	mapToViewModel(employee) {
		return {
			id: employee.ippisNo,
			name: `${employee.firstName} ${employee.lastName}`,
			department: employee.employeeJob.department.description,
			district: employee.employeeJob.district.siteName,
			employeeStatus: employee.employeeJob.employeeStatus,
			pensionable: employee.employeeJob.pensionable,
			firstAppointmentDate: employee.employeeAppointment.firstAppointmentDate,
			presentAppointmentDate:
				employee.employeeAppointment.presentAppointmentDate,
			presentJobType: employee.employeeAppointment.presentJobType.type,
			presentJobTitle: employee.employeeAppointment.presentJobTitle.description
		};
	}

	renderAllEmp() {
		console.log(this.state.employees);
	}

	handlePageChange = page => {
		if (page) {
			this.setState({ currentPage: page });
		}
	};

	render() {
		const { employees, currentPage, columns } = this.state;

		this.renderAllEmp();

		return (
			<TableView
				data={employees}
				useLinks={true}
				columns={columns}
				currentPage={currentPage}
				onPageChange={this.handlePageChange}
				title="employees"
			/>
		);
	}
}
