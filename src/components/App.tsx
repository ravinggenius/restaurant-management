import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";

import Layout from "./layout/Primary";

const App: React.FunctionComponent = () => (
	<Router>
		<Layout>
			<Switch>
				<Route path="/dashboard">
					<Dashboard />
				</Route>

				<Route path="/">
					<Redirect to="/dashboard" />
				</Route>
			</Switch>
		</Layout>
	</Router>
);

export default App;
