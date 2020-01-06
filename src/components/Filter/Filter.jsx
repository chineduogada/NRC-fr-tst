import React from "react";
import "./Filter.scss";
import { DropdownButton, Row, Col } from "react-bootstrap";
import Button from "../Button/Button";
import { AiFillFilter } from "react-icons/ai";

export default function Filter() {
	return (
		<DropdownButton
			alignRight
			title="Filter"
			id="dropdown-menu-align-right"
			variant="light"
			className="Filter"
		>
			<Row className="Head">
				<Col>
					<h6 className="title">Department</h6>
					<ul>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
					</ul>
				</Col>
				<Col>
					<h6 className="title">Job type</h6>
					<ul>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
					</ul>
				</Col>
				<Col>
					<h6 className="title">Job title</h6>
					<ul>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
					</ul>
				</Col>
				<Col>
					<h6 className="title">Marital status</h6>
					<ul>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
						<li>
							<input type="checkbox" />
							<label>label</label>
						</li>
					</ul>
				</Col>
			</Row>
			<Row className="Footer">
				<Button
					label={
						<span>
							filter <AiFillFilter />
						</span>
					}
					fill
				/>
			</Row>
		</DropdownButton>
	);
}
