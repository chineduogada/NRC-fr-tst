import React from "react";
import "./Tabs.scss";
import { Tabs, Tab } from "react-bootstrap";
import Button from "../Button/Button";
import Input from "../Input/Input";

const TabsComponent = ({ tabs, defaultActiveKey }) => {
	return (
		<Tabs defaultActiveKey={defaultActiveKey}>
			{tabs.map(tab => (
				<Tab key={tab.key} eventKey={tab.key} title={tab.title}>
					{tab.title}

					<form className="HybridForm">
						<div className="Inputs">
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
							<Input />
						</div>

						<Button fill label="save" />
					</form>
				</Tab>
			))}
		</Tabs>
	);
};

export default TabsComponent;
