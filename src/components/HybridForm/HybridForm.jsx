import React, { Component } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import "./HybridForm.scss";

export default class HybridForm extends Component {
	render() {
		return (
			<form className="HybridForm">
				<div className="Inputs">
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
					<Input label="full name" />
					<Input
						label="full name"
						noBorder
						disabled
						defaultValue="ogada stanley"
					/>
				</div>

				<Button fill label="save" />
			</form>
		);
	}
}
