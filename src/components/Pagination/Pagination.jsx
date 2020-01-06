import React from "react";
import classes from "./Pagination.module.scss";
import Button from "../Button/Button";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Pagination() {
	return (
		<div className={classes.Pagination} data-test="PaginationComponent">
			<Button label={<AiOutlineCaretLeft />} data-test="next-control-btn" />
			<span className={classes.CurrentPage} data-test="current-page">
				1
			</span>
			<Button label={<AiOutlineCaretRight />} data-test="prev-control-btn" />
		</div>
	);
}
