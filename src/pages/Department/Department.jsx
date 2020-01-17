import React, { Component } from "react";
// import axios from 'axios';
import { withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { isUserSignedIn } from "../../services/Credentials";
// import Section from "../../hoc/Section/Section";
// import classes from "./Department.module.scss";
import TableView from "../../components/TableView/TableView";

class Department extends Component {
	constructor(props) {
		super(props);
		this.isEditingPost = props.location.pathname.endsWith("edit");

		this.id = this.props.match.params.id;

		this.state = {
			departments: [
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" },
				{ code: "rich coding", desc: "he likes coding than himself" }
			],

			columns: [
				{ key: "code", label: "code" },
				{ key: "desc", label: "description" }
			],

			pageSize: 20,
			currentPage: 1,

			redirect: false
		};
	}

	/**
	 * This redirects to the hompage once a post is successfully created/updated
	 */
	renderRedirect() {
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
	}

	handlePageChange = page => {
		if (page) {
			this.setState({ currentPage: page });
		}
	};

	render() {
		const { departments, columns, currentPage } = this.state;

		return (
			<React.Fragment>
				{/* Redirect back to home route if the user is not signed in */}
				{/* {isUserSignedIn() ? null : <Redirect to="/" />} */}
				{true ? null : <Redirect to="/" />}
				{/* Conditinally redirect the user */}
				{this.renderRedirect()}

				{/* Show the loader first if the user is trying to edit a post */}
				{!this.state.departments ? (
					<Loader />
				) : (
					<TableView
						data={departments}
						columns={columns}
						currentPage={currentPage}
						onPageChange={this.handlePageChange}
						title={this.isEditingPost ? "Update Article" : "Department"}
					/>
				)}
			</React.Fragment>
		);
	}
}

export default withRouter(Department);
