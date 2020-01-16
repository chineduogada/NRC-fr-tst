import React from "react";
import Section from "../../hoc/Section/Section";
import Joi from "joi-browser";
import Form from "../../components/Form/Form";
import InformationBlock from "../../components/InformationBlock/InformationBlock";

export default class AddNewEmployee extends Form {
	state = {
		formData: {
			// BASIC INFORMATION FORM DATA
			ippisNo: "",
			firstName: "",
			lastName: "",
			middleNames: "",
			initials: "",
			nrcNo: "",
			dateOfBirth: "",
			phoneNumber: "",
			countryOfBirth: "",
			nationality: "",
			email: "",
			pfaNumber: "",
			pfaId: "",
			genderId: "",
			bloodGroupId: "",
			gpzId: "",
			lgaId: "",
			maritalStatusId: "",
			senatorialDistrictId: "",
			stateId: "",
			efxf01: "",
			efxf02: "",
			efxf03: "",
			efxf04: "",
			efxf05: "",
			ef9f01: "",
			ef9f02: "",
			ef9f03: "",
			ef9f04: "",
			efdf01: "",
			efdf02: "",

			// JOB INFORMATION FORM DATA

			// APPOINTMENT INFORMATION FORM DATA
			firstAppointmentDate: "",
			resumptionDate: "",
			confirmationDate: "",
			expectedRetirementDate: "",
			presentAppointmentDate: "",
			firstJobId: "",
			firstJobGradeId: "",
			presentJobId: "",
			presentJobGradeId: ""
		},
		errors: {}
	};

	schema = {
		// BASIC INFORMATION SCHEMA
		ippisNo: Joi.number(),
		firstName: Joi.string(),
		lastName: Joi.string(),
		middleNames: Joi.string(),
		initials: Joi.string(),
		nrcNo: Joi.number(),
		dateOfBirth: Joi.string(),
		phoneNumber: Joi.number(),
		countryOfBirth: Joi.string(),
		nationality: Joi.string(),
		email: Joi.string().email(),
		pfaNumber: Joi.number(),
		pfaId: Joi.number(),
		genderId: Joi.number(),
		bloodGroupId: Joi.number(),
		gpzId: Joi.number(),
		lgaId: Joi.number(),
		maritalStatusId: Joi.number(),
		senatorialDistrictId: Joi.number(),
		stateId: Joi.number(),
		efxf01: Joi.string(),
		efxf02: Joi.string(),
		efxf03: Joi.string(),
		efxf04: Joi.string(),
		efxf05: Joi.string(),
		ef9f01: Joi.string(),
		ef9f02: Joi.string(),
		ef9f03: Joi.string(),
		ef9f04: Joi.string(),
		efdf01: Joi.string(),
		efdf02: Joi.string(),

		// JOB INFORMATION SCHEMA

		// APPOINTMENT INFORMATION SCHEMA
		firstAppointmentDate: Joi.string(),
		resumptionDate: Joi.string(),
		confirmationDate: Joi.string(),
		expectedRetirementDate: Joi.string(),
		presentAppointmentDate: Joi.string(),
		firstJobTypeId: Joi.number(),
		firstJobTitleId: Joi.number(),
		firstJobGradeId: Joi.number(),
		presentJobTypeId: Joi.number(),
		presentJobTitleId: Joi.number(),
		presentJobGradeId: Joi.number()
	};

	doSubmit(event) {
		console.log("new employee created successfully");
	}

	render() {
		return (
			<Section title="add new employee">
				<form onSubmit={this.handleSubmit}>
					<InformationBlock title="basic information">
						{this.renderInput("ippisNo", "ippisNo", "", "number")}
						{this.renderInput("firstName", "firstName")}
						{this.renderInput("lastName", "lastName")}
						{this.renderInput("middleNames", "middleNames")}
						{this.renderInput("initials", "initials")}
						{this.renderInput("nrc number", "nrcNo", "", "number")}
						{this.renderInput("date of birth", "dateOfBirth", "", "date")}
						{this.renderInput("phone number", "phoneNumber", "", "number")}
						{this.renderInput("country of birth", "countryOfBirth")}
						{this.renderInput("nationality", "nationality")}
						{this.renderInput("email", "email", "", "email")}
						{this.renderInput("pfa number", "pfaNumber", "", "number")}

						{this.renderSelect("pfa Id", "pfaId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("gender Id", "genderId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("blood group Id", "bloodGroupId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("gpz Id", "gpzId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("lga Id", "lgaId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("marital status Id", "maritalStatusId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect(
							"senatorial district Id",
							"senatorialDistrictId",
							[
								{ id: 1, name: "Y" },
								{ id: 2, name: "N" }
							]
						)}
						{this.renderSelect("state Id", "stateId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}

						{this.renderInput("efxf01", "efxf01")}
						{this.renderInput("efxf02", "efxf02")}
						{this.renderInput("efxf03", "efxf03")}
						{this.renderInput("efxf04", "efxf04")}
						{this.renderInput("efxf05", "efxf05")}
						{this.renderInput("ef9f01", "ef9f01")}
						{this.renderInput("ef9f02", "ef9f02")}
						{this.renderInput("ef9f03", "ef9f03")}
						{this.renderInput("ef9f04", "ef9f04")}
						{this.renderInput("efdf01", "efdf01", "", "date")}
						{this.renderInput("efdf02", "efdf02", "", "date")}
					</InformationBlock>

					<InformationBlock title="job information">
						{this.renderInput("input", "input", "input")}
						{this.renderInput("input", "input", "input")}
						{this.renderInput("input", "input", "input")}
					</InformationBlock>

					<InformationBlock title="appointment information">
						{this.renderInput(
							"firstAppointmentDate",
							"firstAppointmentDate",
							"",
							"date"
						)}
						{this.renderInput("resumptionDate", "resumptionDate", "", "date")}
						{this.renderInput(
							"confirmationDate",
							"confirmationDate",
							"",
							"date"
						)}
						{this.renderInput(
							"expectedRetirementDate",
							"expectedRetirementDate",
							"",
							"date"
						)}
						{this.renderInput(
							"presentAppointmentDate",
							"presentAppointmentDate",
							"",
							"date"
						)}

						{this.renderSelect("firstJobTypeId", "firstJobTypeId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("firstJobTitleId", "firstJobTitleId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("firstJobGradeId", "firstJobGradeId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("presentJobTypeId", "presentJobTypeId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("presentJobTitleId", "presentJobTitleId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
						{this.renderSelect("presentJobGradeId", "presentJobGradeId", [
							{ id: 1, name: "Y" },
							{ id: 2, name: "N" }
						])}
					</InformationBlock>

					{this.renderButton("save")}
				</form>
			</Section>
		);
	}
}
