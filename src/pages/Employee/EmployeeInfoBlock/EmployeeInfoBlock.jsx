import React from "react";
import classes from "./EmployeeInfoBlock.module.scss";

const EmployeeInfoBlock = ({ data }) => {
	return (
		<div className={classes.InfoBlock}>
			<h6 className={classes.Title}>title</h6>

			{data.map(item => (
				<div key={item.label} className={classes.InfoCol}>
					<p className={classes.Label}>{item.label}</p>
					<p className={classes.Value}>{item.value}</p>
				</div>
			))}
		</div>
	);
};

export default EmployeeInfoBlock;
