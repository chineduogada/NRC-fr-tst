import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function Searchbox() {
	return (
		<div className="d-flex align-items-start">
			<Input placeholder="search employee" />
			<Button label="search" />
		</div>
	);
}
