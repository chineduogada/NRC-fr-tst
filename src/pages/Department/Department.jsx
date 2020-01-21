import React, { Component } from "react";
// import axios from 'axios';
import { withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
// import { isUserSignedIn } from "../../services/Credentials";
// import Section from "../../hoc/Section/Section";
// import classes from "./Department.module.scss";
import TableView from "../../components/TableView/TableView";
import httpService from "../../services/httpService"

class Department extends Component {
	constructor(props) {
		super(props);
		this.isEditingPost = props.location.pathname.endsWith("edit");

		this.id = this.props.match.params.id;

		this.state = {
			departments: [],

			columns: [
				{ key: "code", label: "code" },
				{ key: "desc", label: "description" }
			],

			pageSize: 20,
			currentPage: 1,

			redirect: false
		};
	}

	async componentDidMount() {
		const departments = [];

		const res = await httpService.get("/departments")

		if(res){
			res.data.data.forEach(department => {
				departments.push(this.mapToViewModel(department))
			})
		}

		this.setState({departments})
	}

	mapToViewModel(department){
		return {
			code: department.code,
			desc: department.description
		}
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
