import React from "react";
import classes from "./EmployeeInfoBlock.module.scss";
import InformationBlock from "../../../components/InformationBlock/InformationBlock";

const EmployeeInfoBlock = ({ data, title }) => {
	const renderValue = value =>
		!value ? (
			<span className="no-data">no data</span>
		) : (
			<p className={classes.Value}>{value}</p>
		);
	return (
		<InformationBlock title={title}>
			{data.map(item => (
				<div key={item.label} className={classes.InfoCol}>
					<p className={classes.Label}>{item.label}</p>
					{renderValue(item.value)}
				</div>
			))}
		</InformationBlock>
	);
};

export default EmployeeInfoBlock;
