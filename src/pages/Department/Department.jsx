import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { isUserSignedIn } from "../../services/Credentials";
import http from "../../services/httpService";
import Section from "../../hoc/Section/Section";
import Table from "../../components/ReactTable/Table";

class Department extends Component {
	constructor(props) {
		super(props);
		this.isEditingPost = props.location.pathname.endsWith("edit");

		this.id = this.props.match.params.id;

		this.state = {
			departments: [
				{ id: '1', code: "FIN", desc: "finance" },
				{ id: '2', code: "ACCT", desc: "accounts" },
				{ id: '3', code: "PR", desc: "public relations" },
				{ id: '4', code: "SCR", desc: "security" },
				{ id: '5', code: "HR", desc: "human resources" },
			],

			columns: [
				{ accessor: "id", Header: "ID" },
				{ accessor: "code", Header: "Code" },
				{ accessor: "desc", Header: "Description" }
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
					<Section title='department'>
						<Table columns={columns} data={departments} clickHandler={this.handleRowClick}></Table>
					</Section>
				)}
			</React.Fragment>
		);
	}
}

export default withRouter(Department);
