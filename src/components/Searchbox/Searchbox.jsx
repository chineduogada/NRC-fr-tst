import React from "react";
import Input from "../Input/Input";

export default function Searchbox({ placeholder }) {
	return (
		<input
			className="formControl"
			placeholder={`search ${placeholder}...`}
			data-test="field"
		/>
	);
}
