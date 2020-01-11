import React, { Component } from "react";
import CleanSlate from "../../../components/CleanSlate/CleanSlate";

export default class EmployeeCareerInfo extends Component {
	state = {
		hasCareer: false
	};

	handleSlate = () => {
		const hasCareer = !this.state.hasCareer;

		this.setState({ hasCareer });
	};

	render() {
		return this.state.hasCareer ? (
			<h1>Career</h1>
		) : (
			<CleanSlate
				onControlSlate={this.handleSlate}
				msg="no career info exists for this employee"
				buttonLabel="add career"
			/>
		);
	}
}
