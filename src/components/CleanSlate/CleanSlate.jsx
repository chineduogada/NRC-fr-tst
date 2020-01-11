import React from "react";
import classes from "./CleanSlate.module.scss";
import Button from "../Button/Button";

const CleanSlate = ({ onControlSlate, msg, buttonLabel }) => {
	return (
		<article className="sect">
			<div className={classes.Slate}>
				<h5 className={classes.Msg}>{msg}</h5>
				<Button highlight label={buttonLabel} onClick={onControlSlate} />
			</div>
		</article>
	);
};

export default CleanSlate;
