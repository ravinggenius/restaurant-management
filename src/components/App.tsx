import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import Dashboard from "../pages/Dashboard";
import IngredientsIndex from "../pages/IngredientsIndex";
import IngredientsNew from "../pages/IngredientsNew";
import OrdersIndex from "../pages/OrdersIndex";
import RecipesIndex from "../pages/RecipesIndex";

import AppStateProvider from "../providers/AppStateProvider";

const App: React.FunctionComponent = () => (
	<AppStateProvider>
		<Router>
			<Switch>
				<Route path="/dashboard">
					<Dashboard />
				</Route>

				<Route path="/ingredients/new">
					<IngredientsNew />
				</Route>

				<Route path="/ingredients">
					<IngredientsIndex />
				</Route>

				<Route path="/recipes">
					<RecipesIndex />
				</Route>

				<Route path="/orders">
					<OrdersIndex />
				</Route>

				<Route path="/">
					<Redirect to="/dashboard" />
				</Route>
			</Switch>
		</Router>
	</AppStateProvider>
);

export default App;
