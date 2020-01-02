import React from "react";
import Form from "../../Form/Form";
import Joi from "joi-browser";

export default class registerDatabase extends Form {
	state = {
		data: {
			dialect: "",
			database: "",
			host: "",
			port: "",
			username: "",
			password: ""
		},
		errors: {}
	};

	schema = {
		dialect: Joi.string(),
		database: Joi.string().required(),
		host: Joi.string().required(),
		port: Joi.number().required(),
		username: Joi.string().allow(""),
		password: Joi.string().allow("")
	};

	doSubmit() {
		console.log("DB Registered");
		this.props.history.push("/setup/super-user");
	}

	render() {
		return (
			<div>
				<h2 className="form-title">register client database</h2>
				<form onSubmit={this.handleSubmit}>
					{this.renderSelect("Dialect", "dialect", [
						"mssql",
						"mysql",
						"postgresql"
					])}
					{this.renderInput("Database", "database")}
					{this.renderInput("Host", "host")}
					{this.renderInput("Port", "port", "eg.8080", "number")}
					{this.renderInput("Username", "username")}
					{this.renderInput("Password", "password", "", "password")}
					{this.renderButton("Go")}
				</form>
			</div>
		);
	}
}
