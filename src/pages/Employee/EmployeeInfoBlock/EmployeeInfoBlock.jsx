import React from "react";
import classes from "./EmployeeInfoBlock.module.scss";

const EmployeeInfoBlock = ({ data, title }) => {
	const renderValue = value =>
		!value ? (
			<span className="no-data">no data</span>
		) : (
			<p className={classes.Value}>{value}</p>
		);
	return (
		<section className="sect">
			<div className={classes.InfoBlock}>
				<h6 className={classes.Title}>{title}</h6>

				{data.map(item => (
					<div key={item.label} className={classes.InfoCol}>
						<p className={classes.Label}>{item.label}</p>
						{renderValue(item.value)}
					</div>
				))}
			</div>
		</section>
	);
};

export default EmployeeInfoBlock;
