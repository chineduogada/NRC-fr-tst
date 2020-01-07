import React from "react";

export default function Searchbox({ placeholder }) {
	return (
		<input
			className="formControl"
			placeholder={`search ${placeholder}...`}
			data-test="field"
		/>
	);
}
