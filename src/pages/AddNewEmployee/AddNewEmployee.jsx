import React from "react";
import Section from "../../hoc/Section/Section";
import Joi from "joi-browser";
import Form from "../../components/Form/Form";

export default class AddNewEmployee extends Form {
	state = {
		formData: {},
		errors: {}
	};

	schema = {};

	render() {
		return (
			<Section title="add new employee">
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderInput("input", "input", "input")}
					{this.renderButton("save")}
				</form>
			</Section>
		);
	}
}
