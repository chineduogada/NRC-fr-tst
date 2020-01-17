import React from "react";
import classes from "./MainArea.module.scss";

const MainArea = props => {
	return (
		<main className={classes.MainArea}>
			<div className={classes.Center}>{props.children}</div>
		</main>
	);
};

export default MainArea;
