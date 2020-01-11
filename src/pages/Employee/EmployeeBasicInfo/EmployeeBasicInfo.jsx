import React, { Component } from "react";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import getBasicInformation from "../../../mock/employee/employeeBasic";

export default class EmployeeBasicInfo extends Component {
	state = {
		basicInformation: [],
		otherInformation: []
	};

	componentDidMount() {
		const basicInformation = this.mapToBasicView(getBasicInformation.data);
		const otherInformation = this.mapToOtherView(getBasicInformation.data);

		this.setState({ basicInformation, otherInformation });
	}

	mapToBasicView(data) {
		return [
			{ label: "first name", value: data.firstName },
			{ label: "last name", value: data.lastName },
			{ label: "middle names", value: data.middleNames },
			{ label: "initials", value: data.initials },
			{ label: "date of birth", value: data.dateOfBirth },
			{ label: "phone number", value: data.phoneNumber },
			{ label: "country of birth", value: data.countryOfBirth },
			{ label: "nationality", value: data.nationality },
			{ label: "email", value: data.email },
			{ label: "professional", value: data.professional }
		];
	}
	mapToOtherView(data) {
		return [
			{ label: "efxf01", value: data.efxf01 },
			{ label: "efxf02", value: data.efxf02 },
			{ label: "efxf03", value: data.efxf03 },
			{ label: "efxf04", value: data.efxf04 },
			{ label: "efxf05", value: data.efxf05 },
			{ label: "ef9f01", value: data.ef9f01 },
			{ label: "ef9f02", value: data.ef9f02 },
			{ label: "ef9f03", value: data.ef9f03 },
			{ label: "ef9f04", value: data.ef9f04 },
			{ label: "efdf01", value: data.efdf01 },
			{ label: "efdf02", value: data.efdf02 }
		];
	}

	render() {
		const { basicInformation, otherInformation } = this.state;

		return (
			<div>
				<EmployeeInfoBlock data={basicInformation} title="basic" />
				<EmployeeInfoBlock data={otherInformation} title="other" />
			</div>
		);
	}
}
