import React from "react";
import classes from "./Pagination.module.scss";
import Button from "../Button/Button";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Pagination({ currentPage, onPageChange }) {
	return (
		<div className={classes.Pagination}>
			<Button
				label={<AiOutlineCaretLeft />}
				onClick={() => onPageChange(currentPage)}
			/>
			<span className={classes.CurrentPage}>{currentPage}</span>
			<Button
				label={<AiOutlineCaretRight />}
				onClick={() => onPageChange(currentPage)}
			/>
		</div>
	);
}
