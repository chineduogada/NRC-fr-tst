import React from "react";
import classes from "./Pagination.module.scss";
import Button from "../Button/Button";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Pagination() {
	return (
		<div className={classes.Pagination}>
			<Button label={<AiOutlineCaretLeft />} />
			<span className={classes.CurrentPage}>1</span>
			<Button label={<AiOutlineCaretRight />} />
		</div>
	);
}
