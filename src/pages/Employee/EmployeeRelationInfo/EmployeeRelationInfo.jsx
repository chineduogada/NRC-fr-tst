import React from "react";
import CleanSlate from "../../../components/CleanSlate/CleanSlate";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import Joi from "joi-browser";
import Button from "../../../components/Button/Button";
export default class EmployeeRelationInfo extends Form {
	state = {
		columns: [
			{ key: "relationshipTypeId", label: "relationship type" },
			{ key: "surname", label: "surname" },
			{ key: "otherNames", label: "other names" },
			{ key: "dateOfBirth", label: "date of birth" },
			{ key: "mobileNumber", label: "mobile number" },
			{ key: "addressLine1", label: "address line 1" },
			{ key: "addressLine2", label: "address line 2" },
			{ key: "addressLine3", label: "address line 3" },
			{ key: "addressLine4", label: "address line 4" },
			{ key: "email", label: "email" }
		],
		data: {
			relationshipTypeId: "",
			surname: "",
			otherNames: "",
			dateOfBirth: "",
			mobileNumber: "",
			addressLine1: "",
			addressLine2: "",
			addressLine3: "",
			addressLine4: "",
			email: "",
			beneficiary: "",
			beneficiaryPercentage: ""
		},
		errors: {},
		hasRelation: false,
		addRelation: false
	};

	schema = {
		relationshipTypeId: Joi.string(),
		surname: Joi.string(),
		otherNames: Joi.string(),
		dateOfBirth: Joi.string(),
		mobileNumber: Joi.number(),
		addressLine1: Joi.string(),
		addressLine2: Joi.string(),
		addressLine3: Joi.string(),
		addressLine4: Joi.string(),
		email: Joi.string().email(),
		beneficiary: Joi.string(),
		beneficiaryPercentage: Joi.number()
	};

	handleSlate = () => {
		const hasRelation = !this.state.hasRelation;

		this.setState({ hasRelation });
	};

	handleAddRelation = () => {
		const addRelation = !this.state.addRelation;

		this.setState({ addRelation });
	};

	doSubmit() {
		const addRelation = !this.state.addRelation;

		this.setState({ addRelation });
	}

	render() {
		const { columns, hasRelation, addRelation } = this.state;

		return hasRelation ? (
			<section>
				<header className="sect">
					<Button
						highlight
						label="add relation"
						onClick={this.handleAddRelation}
					/>
					<Table columns={columns} />
				</header>

				{addRelation ? (
					<main>
						<div className="sect">
							<form onSubmit={this.handleSubmit}>
								<div>
									{this.renderSelect(
										"relationship type",
										"relationshipTypeId",
										[
											{ id: "12", name: "father" },
											{ id: "1234", name: "mother" }
										]
									)}
									{this.renderInput("surname", "surname", "")}
									{this.renderInput("other names", "otherNames", "")}
									{this.renderInput("date of birth", "dateOfBirth", "", "date")}
									{this.renderInput(
										"mobile number",
										"mobileNumber",
										"",
										"number"
									)}
									{this.renderInput("address line 1", "addressLine1", "")}
									{this.renderInput("address line 2", "addressLine2", "")}
									{this.renderInput("address line 3", "addressLine3", "")}
									{this.renderInput("address line 4", "addressLine4", "")}
									{this.renderInput("email", "email", "", "email")}
									{this.renderSelect("beneficiary", "beneficiary", [
										{ id: "Y", name: "yes" },
										{ id: "N", name: "no" }
									])}
									{this.state.data.beneficiary === "Y"
										? this.renderInput(
												"beneficiary percentage",
												"beneficiaryPercentage",
												"eg: 20",
												"number"
										  )
										: null}
								</div>
								{this.renderButton("save")}
							</form>
						</div>
					</main>
				) : null}
			</section>
		) : (
			<CleanSlate
				onControlSlate={this.handleSlate}
				msg="no relation has been registered for this employee"
				buttonLabel="add relation"
			/>
		);
	}
}
