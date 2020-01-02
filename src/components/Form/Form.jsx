import React, { Component } from "react";
import Joi from "joi-browser";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";

export default class Form extends Component {
	state = {
		data: {},
		error: {}
	};

	validateField({ name, value }) {
		/**
		 * ACCEPTS AN INPUT
		 * CHECK IF IT'S VALUE IS EMPTY AFTER CHECK FOR WHICH INPUT IT IS
		 * RETURN THE ERROR MSG
		 */

		const data = { [name]: value };
		const schema = {
			[name]: this.schema[name]
		};
		const options = { abortEarly: true };

		const { error } = Joi.validate(data, schema, options);
		return error ? error.details[0].message : null;

		// if (name === "title") if (value.trim() === "") return "Title is required!";
		// if (name === "genreID")
		// 	if (value.trim() === "") return "Genre is required!";
		// if (name === "numberInStock")
		// 	if (value.trim() === "") return "Number In Stock is required!";
		// if (name === "dailyRentalRate")
		// 	if (value.trim() === "") return "Rate is required!";
	}

	handleChange = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		const errors = { ...this.state.errors };

		const errorMessage = this.validateField(input);
		errors[input.name] = errorMessage;
		data[input.name] = input.value;
		this.setState({ data, errors });
	};

	validate() {
		/**
		 * CHECKS FOR ALL DATA PROPS
		 * SEE IF ANY IS EMPTY
		 * RETURN AN "ERRORS OBJ" MAPPING TO THE "DATA OBJ" (containing the error properties only)
		 * OTHERWISE RETURN "NULL"
		 */
		const { data } = this.state;

		const options = { abortEarly: false };
		const { error } = Joi.validate(data, this.schema, options);
		if (!error) return;

		const errors = {};
		// for (const value of error.details) {
		// 	console.log(value.context.key, value.message);
		// }
		error.details.map(value => (errors[value.path[0]] = value.message));
		return errors;

		// const errors = {};
		// if (data.title.trim() === "") errors.title = "Title is required!";
		// if (data.genreID.trim() === "") errors.genreID = "Genre is required!";
		// if (data.numberInStock.trim() === "")
		// 	errors.numberInStock = "number In Stock is required!";
		// if (data.dailyRentalRate.trim() === "")
		// 	errors.dailyRentalRate = "Rate is required!";

		// return Object.keys(errors).length ? errors : null;
	}

	handleSubmit = event => {
		event.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	renderInput(label, name, placeholder, type = "text") {
		const { data, errors } = this.state;

		return (
			<Input
				label={label}
				type={type}
				placeholder={placeholder}
				name={name}
				error={errors[name]}
				value={data[name]}
				onChange={this.handleChange}
			/>
		);
	}
	renderSelect(label, name, options) {
		const { data, errors } = this.state;

		return (
			<Select
				options={options}
				label={label}
				name={name}
				error={errors[name]}
				id={name}
				value={data[name]}
				onChange={this.handleChange}
			/>
		);
	}

	renderButton(label) {
		return <Button label={label} fill />;
	}
}
