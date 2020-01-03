import React from "react";
import Form from "../../Form/Form";
import Joi from "joi-browser";

export default class RegisterSuperUser extends Form {
	state = {
		data: {
			fullName: "",
			email: "",
			username: "",
			password: ""
		},
		errors: {}
	};

	schema = {
		fullName: Joi.string()
			.required()
			.label("FullName"),
		email: Joi.string()
			.email()
			.required()
			.label("Email"),
		username: Joi.string()
			.min(0)
			.required()
			.label("Username"),
		password: Joi.string()
			.min(0)
			.required()
			.label("Password")
	};

	doSubmit() {
		console.log("Client Registered");
	}

	render() {
		return (
			<div>
				<h2 className="form-title">register client</h2>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput("Full Name", "fullName")}
					{this.renderInput("Email", "email", "example@email.com", "email")}
					{this.renderInput("Username", "username")}
					{this.renderInput("Password", "password", "", "password")}
					{this.renderButton("Go")}
				</form>
			</div>
		);
	}
}
