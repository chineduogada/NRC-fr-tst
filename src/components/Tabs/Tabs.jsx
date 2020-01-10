import React from "react";
import classes from "./Tabs.module.scss";

const TabsComponent = ({ tabs, onTabChange, activeTab }) => {
	const getClass = tab => {
		let _class = `${classes.Tab}`;

		_class += tab.key === activeTab ? ` ${classes.Active}` : "";

		return _class;
	};
	return (
		<ul className={classes.Tabs}>
			{tabs.map(tab => (
				<li
					onClick={() => onTabChange(tab.key)}
					key={tab.key}
					className={getClass(tab)}
				>
					{tab.label}
				</li>
			))}
		</ul>
	);
};

export default TabsComponent;
