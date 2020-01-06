import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function Searchbox() {
	return (
		<div className="d-flex align-items-start" data-test="Searchbox">
			<Input placeholder="search employee" data-test="field" />
			<Button label="search" fill data-test="control-btn" />
		</div>
	);
}
