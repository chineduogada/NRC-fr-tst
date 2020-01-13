import React, { Component } from "react";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import axios from "axios";

export default class EmployeeBasicInfo extends Component {
	state = {
		basicInformation: []
	};

	componentDidMount() {
		axios
			.get(`/employee/${this.props.ippisNo}/appointment`)
			.then(({ data }) => {
				const basicInformation = this.mapToBasicView(data.data);

				this.setState({ basicInformation });
			})
			.catch(e => console.log(e));
	}

	mapToBasicView(data) {
		// const d = {
		// 	firstAppointmentDate: "2020-01-01",
		// 	resumptionDate: "2000-01-07",
		// 	confirmationDate: "2000-01-30",
		// 	expectedRetirementDate: "2020-01-01",
		// 	presentAppointmentDate: "2015-01-01",
		// 	firstJobType: { type: "permanent" },
		// 	firstJobTitle: { description: "Managing Director" },
		// 	firstJobGrade: { con: 1, conpss: 1 },
		// 	presentJobType: { type: "permanent" },
		// 	presentJobTitle: { description: "Managing Director" },
		// 	presentJobGrade: { con: 1, conpss: 1 }
		// };
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
			{ label: "presentJobType", value: data.presentJobType.type },
			{ label: "presentJobTitle", value: data.presentJobTitle.description },
			{ label: "present job grade(con)", value: data.presentJobGrade.con },
			{ label: "present job grade(conpss)", value: data.presentJobGrade.conpss }
		];
	}

	render() {
		const { basicInformation } = this.state;

		return (
			<div>
				<EmployeeInfoBlock data={basicInformation} />
			</div>
		);
	}
}
