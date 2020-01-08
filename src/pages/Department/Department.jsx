import React, { Component } from "react";
// import axios from 'axios';
import { withRouter, Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { isUserSignedIn } from "../../services/Credentials";
import Section from "../../hoc/Section/Section";
import classes from "./Department.module.scss";

class Department extends Component {
	constructor(props) {
		super(props);
		this.isEditingPost = props.location.pathname.endsWith("edit");

		this.id = this.props.match.params.id;
		console.log(this.id);

		this.state = {
			departments: null,

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

	render() {
		return (
			<React.Fragment>
				{/* Redirect back to home route if the user is not signed in */}
				{isUserSignedIn() ? null : <Redirect to="/" />}

				<Section title={this.isEditingPost ? "Update Article" : "Department"}>
					{/* Conditinally redirect the user */}
					{this.renderRedirect()}

					{/* Show the loader first if the user is trying to edit a post */}
					{this.state.departments ? (
						<Loader />
					) : (
						<div className={classes.Tab}>
							<Section>
								<p>departments page</p>
							</Section>
							<Section>
								Let thine heart be not troubled for data shall be displayed!
							</Section>
						</div>
					)}
				</Section>
			</React.Fragment>
		);
	}
}

export default withRouter(Department);
