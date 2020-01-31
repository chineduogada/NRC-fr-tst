import React from "react";
import { Link } from "react-router-dom";

const TableBody = ({ data, columns, useLinks }) => {
	return (
		<div className="TableBody">
			{data
				? data.map((data, index) =>
						useLinks ? (
							<Link
								to={`/employees/${data.id}`}
								key={index}
								className="TableRow"
							>
								{console.log(index)}
								{columns.map(column => (
									<div className="TableCol" key={`${column.key} + ${data.id}`}>
										<p>{data[column.key]}</p>
										{/* {console.log(column.key, data.id)} */}
									</div>
								))}
							</Link>
						) : (
							<div key={index} className="TableRow">
								{columns.map(column => (
									<div className="TableCol" key={`${column.key} + ${data.id}`}>
										<p>{data[column.key]}</p>
										{/* {console.log(column.key, data.id)} */}
									</div>
								))}
							</div>
						)
				  )
				: null}
		</div>
	);
};

export default TableBody;
