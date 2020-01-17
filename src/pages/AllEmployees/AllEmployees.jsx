import React, { Component } from "react";
import http from "../../services/httpService";
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

	async componentDidMount() {
		const employees = [];
		const res = await http.get("/employee/");

		if (res) {
			res.data.data.rows.forEach(employee => {
				employees.push(this.mapToViewModel(employee));
			});

			this.setState({ employees });
		}
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

	handlePageChange = page => {
		if (page) {
			this.setState({ currentPage: page });
		}
	};

	render() {
		const { employees, currentPage, columns } = this.state;

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
