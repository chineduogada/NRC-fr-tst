<<<<<<< HEAD
import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

export default function Searchbox() {
  return (
    <div className="d-flex align-items-start">
      <Input placeholder="search employee" />
    </div>
  );
=======
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
>>>>>>> 84f15c05c6d63c8045a505fd9fcf9d3e791b8044
}
