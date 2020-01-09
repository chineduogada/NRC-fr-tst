import React from "react";
import "./Tabs.scss";
import { Tabs, Tab } from "react-bootstrap";
import HybridForm from "../HybridForm/HybridForm";

const TabsComponent = ({ tabs, defaultActiveKey }) => {
	return (
		<Tabs defaultActiveKey={defaultActiveKey}>
			{tabs.map(tab => (
				<Tab key={tab.key} eventKey={tab.key} title={tab.title}>
					{tab.title}

					<HybridForm />
				</Tab>
			))}
		</Tabs>
	);
};

export default TabsComponent;
