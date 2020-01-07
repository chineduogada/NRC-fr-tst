import React from "react";

const TableBody = ({data, columns}) => {
	return (
		<div className="TableBody">
			{data.map(data => (
				<div key={data.id} className="TableRow">
					{columns.map(column => (
						<div className="TableCol" key={column.title + data.id}>
							<h6>{data[column.title]}</h6>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default TableBody;
