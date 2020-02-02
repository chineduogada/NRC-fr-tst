import React, { Component } from "react";
import http from "../../../services/httpService";
import EmployeeInfoBlock from "../EmployeeInfoBlock/EmployeeInfoBlock";
import Loader from "../../../components/Loader/Loader";

export default class EmployeeBasicInfo extends Component {
	state = {
		basicInformation: null,
		otherInformation: null
	};

	async componentDidMount() {
		const res = await http.get(`/employees/${this.props.ippisNo}`);

		if (res) {
			const basicInformation = this.mapToBasicView(res.data.data);
			const otherInformation = this.mapToOtherView(res.data.data);

			this.setState({ basicInformation, otherInformation });
		}
	}

	mapToBasicView(data) {
		return [
			{ label: "first name", value: data.firstName },
			{ label: "last name", value: data.lastName },
			{ label: "middle names", value: data.middleNames },
			{ label: "initials", value: data.initials },
			{ label: "nrcNo", value: data.nrcNo },
			{ label: "date of birth", value: data.dateOfBirth },
			{ label: "phone number", value: data.phoneNumber },
			{ label: "country of birth", value: data.countryOfBirth },
			{ label: "nationality", value: data.nationality },
			{ label: "email", value: data.email },
			{ label: "pfa number", value: data.pfaNumber },
			{ label: "pfa", value: data.pfa.name },
			{ label: "gender", value: data.gender.type },
			{ label: "blood group", value: data.bloodGroup.type },
			{ label: "gpz", value: data.gpz.name },
			{ label: "lga", value: data.lga.lga },
			{
				label: "marital status",
				value: data.maritalStatus.status
			},
			{
				label: "senatorial district",
				value: data.senatorialDistrict.name
			},
			{ label: "state", value: data.state.state }
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

		return basicInformation ? (
			<div>
				<EmployeeInfoBlock data={basicInformation} title="" />
				<EmployeeInfoBlock data={otherInformation} title="" />
			</div>
		) : (
			<Loader />
		);
	}
}
