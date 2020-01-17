import React, { Component } from "react";
import http from "../../../services/httpService";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import Loader from "../../../components/Loader/Loader";

export default class EmployeeBasicInfo extends Component {
	state = {
		appointmentInformation: null
	};

	async componentDidMount() {
		const res = await http.get(`/employee/${this.props.ippisNo}/appointment`);

		if (res) {
			const appointmentInformation = this.mapToViewModel(res.data.data);

			this.setState({ appointmentInformation });
		}
	}

	mapToViewModel(data) {
		return [
			{ label: "first appointment date", value: data.firstAppointmentDate },
			{ label: "resumption date", value: data.resumptionDate },
			{ label: "confirmation date", value: data.confirmationDate },
			{ label: "expected retirement date", value: data.expectedRetirementDate },
			{ label: "present appointment date", value: data.presentAppointmentDate },
			{ label: "first job type", value: data.firstJobType.type },
			{ label: "first job title", value: data.firstJobTitle.description },
			{ label: "first job grade(con)", value: data.firstJobGrade.con },
			{ label: "first job grade(conpss)", value: data.firstJobGrade.conpss },
			{ label: "present job type", value: data.presentJobType.type },
			{ label: "present job title", value: data.presentJobTitle.description },
			{ label: "present job grade(con)", value: data.presentJobGrade.con },
			{ label: "present job grade(conpss)", value: data.presentJobGrade.conpss }
		];
	}

	render() {
		const { appointmentInformation } = this.state;

		return appointmentInformation ? (
			<div>
				<EmployeeInfoBlock data={appointmentInformation} />
			</div>
		) : (
			<Loader />
		);
	}
}
