import React, { Component } from "react";
import classes from "./Employee.module.scss";
import TabsComponent from "../../components/Tabs/Tabs";

export default class Employee extends Component {
	state = {
		tabs: [
			{ title: "Basic Information", key: "basicInformation" },
			{ title: "Job Information", key: "jobInformation" },
			{ title: "Appointment", key: "appointment" },
			{ title: "Relation", key: "relation" },
			{ title: "Career", key: "career" }
		],
		defaultActiveKey: "basicInformation"
	};
	render() {
		const { tabs, defaultActiveKey } = this.state;

		return (
			<section className={classes.Employee}>
				<header>
					<div className={classes.ImgWrapper}>
						<img src="" alt="employee" />
					</div>
				</header>
				<main>
					<TabsComponent tabs={tabs} defaultActiveKey={defaultActiveKey} />
				</main>
				<footer></footer>
			</section>
		);
	}
}
