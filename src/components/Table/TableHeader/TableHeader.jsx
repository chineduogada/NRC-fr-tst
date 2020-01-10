import React from "react";

const TableHeader = ({ columns }) => {
	return (
		<div className="TableHeader">
			<div className="TableRow">
				{columns.map((column, index) => (
					<div className="TableCol" key={`${column.key} ${index}`}>
						<h6>{column.label}</h6>
					</div>
				))}
			</div>
		</div>
	);
};

export default TableHeader;
