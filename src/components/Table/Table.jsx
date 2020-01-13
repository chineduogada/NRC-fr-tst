import React from "react";
import "./Table.scss";
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";

const Table = ({ columns, data, useLinks }) => {
	console.log(useLinks);
	return (
		<div className="Table">
			<TableHeader columns={columns} />
			<TableBody columns={columns} data={data} useLinks={useLinks} />
		</div>
	);
};

export default Table;
