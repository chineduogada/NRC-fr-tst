import React, { Component } from "react";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import { Link } from "react-router-dom";
import axios from "axios";

export default class EmployeeBasicInfo extends Component {
	state = {
		jobInformation: []
	};

	componentDidMount() {
		axios
			.get(`/employee/${this.props.ippisNo}/job`)
			.then(({ data }) => {
				const jobInformation = this.mapToJobView(data.data);

				this.setState({ jobInformation });
			})
			.catch(e => console.log(e));
	}

	mapToJobView(data) {
		return [
			{ label: "department", value: data.department.description },
			{ label: "district", value: data.district.siteName },
			{ label: "location", value: data.location },
			{ label: "section", value: data.section },
			{ label: "employee status", value: data.employeeStatus },
			{ label: "pensionable", value: data.pensionable },
			{
				label: "report to",
				value: (
					<a href={`/employee/${data.reportToEmployee.ippisNo}`}>
						{`${data.reportToEmployee.firstName} ${data.reportToEmployee.lastName}`}
					</a>
				)
			}
		];
	}

	render() {
		const { jobInformation } = this.state;

		return (
			<div>
				<EmployeeInfoBlock data={jobInformation} title="" />
			</div>
		);
	}
}
