import React from "react";
import { Spinner } from "react-bootstrap";
import "./Loader.scss";

const Loader = ({ brand }) => {
	return (
		<div className="Loader">
			{brand ? <h3 className="Brand">{brand}</h3> : null}
			<Spinner animation="border" className="Spinner" />
		</div>
	);
};

export default Loader;
