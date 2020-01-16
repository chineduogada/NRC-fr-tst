import React from "react";
import "./Table.scss";
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Loader from "../Loader/Loader";

const Table = ({ columns, data, useLinks }) => {
	return (
		<div className="Table">
			<TableHeader columns={columns} />

			{data.length ? (
				<TableBody columns={columns} data={data} useLinks={useLinks} />
			) : (
				<Loader />
			)}
		</div>
	);
};

export default Table;
