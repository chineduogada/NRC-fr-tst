import React, { Component } from "react";
import Section from "../../hoc/Section/Section";
import classes from "./Dashboard.module.scss";

export default class Dashboard extends Component {
	data = {};

	render() {
		return (
			<Section id="post" title="dashboard">
				<Section>
					<div className={classes.BasicSummary}>
						<div className={classes.Summary}>No data to render</div>
						<div className={classes.Summary}>No data to render</div>
						<div className={classes.Summary}>No data to render</div>
						<div className={classes.Summary}>No data to render</div>
					</div>
				</Section>
				<Section>
					<div className={classes.MainSummary}>
						<div className={classes.Summary}>
							<header>
								<h4>Data to review</h4>
							</header>
						</div>

						<div className={classes.Summary}>
							<header>
								<h4>Recent activities</h4>
							</header>
						</div>
					</div>
				</Section>
			</Section>
		);
	}
}
