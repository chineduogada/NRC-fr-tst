import React, { Component } from "react";
import classes from "./Employee.module.scss";
import TabsComponent from "../../components/Tabs/Tabs";
import Button from "../../components/Button/Button";
import EmployeeBasicInfo from "./EmployeeBasicInfo/EmployeeBasicInfo";
import EmployeeRelationInfo from "./EmployeeRelationInfo/EmployeeRelationInfo";
import EmployeeCareerInfo from "./EmployeeCareerInfo/EmployeeCareerInfo";

export default class Employee extends Component {
	state = {
		tabs: [
			{ label: "Basic Information", key: "basicInformation" },
			{ label: "Job Information", key: "jobInformation" },
			{ label: "Appointment", key: "appointment" },
			{ label: "Relation", key: "relation" },
			{ label: "Career", key: "career" }
		],

		activeTab: "basicInformation"
	};

	handleTabChange = tab => {
		this.setState({ activeTab: tab });
	};

	renderTabComponent() {
		const { activeTab } = this.state;

		if (activeTab === "basicInformation") return <EmployeeBasicInfo />;
		else if (activeTab === "relation") return <EmployeeRelationInfo />;
		else if (activeTab === "career") return <EmployeeCareerInfo />;
	}

	render() {
		const { tabs, activeTab } = this.state;

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

				<main className="sect">
					<TabsComponent
						tabs={tabs}
						activeTab={activeTab}
						onTabChange={this.handleTabChange}
					/>

					{this.renderTabComponent()}
				</main>
				<footer></footer>
			</section>
		);
	}
}
