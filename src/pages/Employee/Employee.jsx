import React, { Component } from "react";
import classes from "./Employee.module.scss";
import TabsComponent from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";

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
					<div className={classes.Profile}>
						<div className={classes.ImgWrapper}>
							<img src="" alt="employee" />
						</div>

						<div className={classes.ProfileInfo}></div>
					</div>

					<div className={classes.Controls}>
						<Button fill label="edit" />
						<Button fill label="dropdown" />
					</div>
				</header>

				<main>
					<TabsComponent tabs={tabs} defaultActiveKey={defaultActiveKey} />

					<div className={classes.InfoBlock}>
						<h6 className={classes.Title}>title</h6>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
					</div>

					<div className={classes.InfoBlock}>
						<h6 className={classes.Title}>title</h6>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
					</div>

					<div className={classes.InfoBlock}>
						<h6 className={classes.Title}>title</h6>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
						<div className={classes.InfoCol}>
							<p className={classes.ColLabel}>first name</p>
							<p className={classes.ColField}>stanley</p>
						</div>
					</div>
				</main>
				<footer></footer>
			</section>
		);
	}
}
