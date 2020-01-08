import React from "react";
// import credentials from "../../services/Credentials";
import { Link } from "react-router-dom";
// import InputField from "../InputField/InputField";
import "./Nav.scss";

// Navigation
const Nav = props => {
	const { jobRole, firstName } = { firstName: null };

	return (
		<nav id="main-nav">
			{/* Logo */}
			<Link to="/">{/* <h1 id="logo">Teamwork</h1> */}</Link>

			{/* Main Menu */}
			<div className="search-area">
				<form>
					{/* <InputField type='text' placeholder='search posts, teammates' /> */}
					{/* <button type='submit' style={{transform: 'scale(1)'}}></button> */}
				</form>
			</div>
			<div className="menu main-menu">
				{/* Hamburger */}
				<p className="hamburger">MENU</p>
				{/* Menu Items */}
				<ul>
					<li>
						<Link to="/" className="active"></Link>
					</li>
					<li>
						<Link to="/post/new">Welcome, {firstName}</Link>
					</li>
					<li>
						<Link to="/post/new">Import data</Link>
					</li>
					{jobRole === "admin" ? (
						<li>
							<Link to="/members">All Users</Link>
						</li>
					) : null}
					<li className="user">
						<Link onClick={props.triggerSignOut} to="/">
							{/* Logout */}
						</Link>
					</li>
					{/* <li><Link to={`users/${userId}`}>Me</Link></li> */}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
