import React from "react";
import CleanSlate from "../../../components/CleanSlate/CleanSlate";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import Joi from "joi-browser";
import Button from "../../../components/Button/Button";
import http from "../../../services/httpService";
import Loader from "../../../components/Loader/Loader";

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
			{ key: "email", label: "email" },
			{ key: "beneficiary", label: "beneficiary" },
			{ key: "beneficiaryPercentage", label: "beneficiary percentage" },
			{ key: "serialCode", label: "serial code" }
		],

		formData: {
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
			beneficiaryPercentage: "",
			serialCode: ""
		},
		errors: {},
		hasRelation: null,
		addRelation: false,
		relations: []
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
		beneficiaryPercentage: Joi.number(),
		serialCode: Joi.number()
	};

	handleSlate = () => {
		const hasRelation = !this.state.hasRelation;

		this.setState({ hasRelation, addRelation: true });
	};

	handleAddRelation = () => {
		const addRelation = !this.state.addRelation;

		this.setState({ addRelation });
	};

	async doSubmit(event) {
		const relations = [this.state.formData, ...this.state.relations];

		event.currentTarget.reset();

		this.setState({ relations });

		const obj = this.state.formData;

		const res = await http.post(`/employee/${this.props.ippisNo}/relation`, [
			{ ...obj, ippisNo: this.props.ippisNo }
		]);

		console.log(res);
	}

	async componentDidMount() {
		const relations = [];
		const res = await http.get(`/employee/${this.props.ippisNo}/relation`);

		if (res) {
			res.data.data.forEach(relation => {
				relations.push(this.mapToViewModel(relation));
			});

			this.setState({ hasRelation: res.data.data.length, relations });
		}
	}

	mapToViewModel = relation => {
		return {
			relationshipTypeId: relation.relationshipType.type,
			surname: relation.surname,
			otherNames: relation.otherNames,
			dateOfBirth: relation.dateOfBirth,
			mobileNumber: relation.mobileNumber,
			addressLine1: relation.addressLine1,
			addressLine2: relation.addressLine2,
			addressLine3: relation.addressLine3,
			addressLine4: relation.addressLine4,
			email: relation.email,
			beneficiary: relation.beneficiary,
			beneficiaryPercentage: relation.beneficiaryPercentage,
			serialCode: relation.serialCode
		};
	};

	render() {
		const { columns, relations, hasRelation, addRelation } = this.state;

		return hasRelation !== null ? (
			hasRelation ? (
				<section>
					<header className="sect">
						<Button
							highlight
							label="add relation"
							onClick={this.handleAddRelation}
						/>
						<Table columns={columns} data={relations} />
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
												{ id: "1", name: "father" },
												{ id: "2", name: "mother" }
											]
										)}
										{this.renderInput("surname", "surname", "")}
										{this.renderInput("other names", "otherNames", "")}
										{this.renderInput(
											"date of birth",
											"dateOfBirth",
											"",
											"date"
										)}
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
										{this.state.formData.beneficiary === "Y"
											? this.renderInput(
													"beneficiary percentage",
													"beneficiaryPercentage",
													"eg: 20",
													"number"
											  )
											: null}
										{this.renderInput("serialCode", "serialCode", "", "number")}
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
			)
		) : (
			<Loader />
		);
	}
}
