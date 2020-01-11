import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns }) => {
	return (
		<div className="TableBody">
			{data
				? data.map(data => (
						<Link
							to={`/employee/${data.id}`}
							key={data.id}
							className="TableRow"
						>
							{columns.map(column => (
								<div className="TableCol" key={`${column.key} + ${data.id}`}>
									<p>{data[column.key]}</p>
									{console.log(column.key, data.id)}
								</div>
							))}
						</Link>
				  ))
				: null}
		</div>
	);
};

export default TableBody;
