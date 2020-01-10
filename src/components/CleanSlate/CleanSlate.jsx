import React from "react";
import classes from "./CleanSlate.module.scss";
import Button from "../Button/Button";

const CleanSlate = ({ onControlSlate, msg, buttonLabel }) => {
	return (
		<div className={classes.Slate}>
			<h5 className={classes.Msg}>{msg}</h5>
			{/* <Button onClick={onControlSlate} /> */}
			<Button highlight label={buttonLabel} />
		</div>
	);
};

export default CleanSlate;
