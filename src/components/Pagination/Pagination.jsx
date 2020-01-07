import React from "react";
import classes from "./Pagination.module.scss";
import Button from "../Button/Button";
import { AiOutlineCaretLeft, AiOutlineCaretRight } from "react-icons/ai";

export default function Pagination({ currentPage, onPageChange }) {
	return (
		<div className={classes.Pagination} data-test="PaginationComponent">
			<Button
				label={<AiOutlineCaretLeft />}
				data-test="prev-control-btn"
				onClick={() => onPageChange(currentPage - 1)}
			/>
			<span className={classes.CurrentPage} data-test="current-page">
				{currentPage}
			</span>
			<Button
				label={<AiOutlineCaretRight />}
				data-test="next-control-btn"
				onClick={() => onPageChange(currentPage + 1)}
			/>
		</div>
	);
}
