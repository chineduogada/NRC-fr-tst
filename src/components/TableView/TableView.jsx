import React from "react";
import classes from "./TableView.module.scss";
import Button from "../Button/Button";
import Searchbox from "../Searchbox/Searchbox";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";
import Table from "../Table/Table";

const TableView = ({
	title,
	data,
	onPageChange,
	currentPage,
	columns,
	useLinks
}) => {
	return (
		<section className={classes.TableView}>
			<header>
				<div className="d-flex justify-content-between">
					<div className="title text-capitalize">
						<h2 className={classes.TableTitle}>{title}</h2>
					</div>
					<div className="buttons">
						<Button label="add new" fill />
						<Button label="export" />
					</div>
				</div>
				<div className="d-flex justify-content-between my-2">
					<Searchbox placeholder={title} />

					<Filter />
				</div>
			</header>

			<main>
				<Table columns={columns} data={data} useLinks={useLinks} />
			</main>

			<footer>
				<Pagination currentPage={currentPage} onPageChange={onPageChange} />
			</footer>
		</section>
	);
};

export default TableView;
