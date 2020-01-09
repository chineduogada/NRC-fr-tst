import React from "react";
import "./Tabs.scss";
import { Tabs, Tab } from "react-bootstrap";

const TabsComponent = ({ tabs, defaultActiveKey }) => {
	return (
		<Tabs defaultActiveKey={defaultActiveKey}>
			{tabs.map(tab => (
				<Tab key={tab.key} eventKey={tab.key} title={tab.title}></Tab>
			))}
		</Tabs>
	);
};

export default TabsComponent;
