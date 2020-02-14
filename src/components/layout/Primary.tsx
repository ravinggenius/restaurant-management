import React from "react";
import { Link } from "react-router-dom";

import "./Primary.css";

const Primary: React.FunctionComponent = ({ children }) => (
	<section className="Primary">
		<nav className="Primary-nav">
			<Link className="Primary-link" to="/dashboard">
				{"Home"}
			</Link>
		</nav>

		<main className="Primary-main">{children}</main>
	</section>
);

export default Primary;
