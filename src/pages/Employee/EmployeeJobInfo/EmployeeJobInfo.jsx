import React, { Component } from "react";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import http from "../../../services/httpService";
import Loader from "../../../components/Loader/Loader";
// import { Link } from "react-router-dom";

export default class EmployeeBasicInfo extends Component {
	state = {
		jobInformation: null
	};

	async componentDidMount() {
		const res = await http.get(`/employee/${this.props.ippisNo}/job`);

		if (res) {
			const jobInformation = this.mapToViewModel(res.data.data);

			this.setState({ jobInformation });
		}
	}

	mapToViewModel(data) {
		return [
			{
				label: "department",
				value: data.department.description
			},
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

		return jobInformation ? (
			<div>
				<EmployeeInfoBlock data={jobInformation} title="" />
			</div>
		) : (
			<Loader />
		);
	}
}
