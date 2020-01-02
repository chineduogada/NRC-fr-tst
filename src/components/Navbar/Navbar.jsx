import React from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = props => {
	const { title } = props;
	const links = [
		{ to: "/movies", label: "Movies" },
		{ to: "/costumers", label: "Costumers" },
		{ to: "/rentals", label: "Rentals" },
		{ to: "/login", label: "Login" },
		{ to: "/register", label: "Register" }
	];
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand" to="/">
				{title}
			</Link>

			<div className="nav">
				{links.map(link => (
					<NavLink key={link.to} to={link.to} className="nav-link nav-item">
						{link.label}
					</NavLink>
				))}
			</div>
		</nav>
	);
};

export default Navbar;
