import React, { useReducer, useEffect } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch
} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";

import RestaurantContext, {
	INITIAL_STATE,
	stateReducer,
	IRecipe
} from "../contexts/RestaurantContext";

import Dashboard from "../pages/Dashboard";

import * as Ingredient from "../services/Ingredient";
import * as Order from "../services/Order";
import * as Recipe from "../services/Recipe";

import Layout from "./layout/Primary";

const App: React.FunctionComponent = () => {
	const [state, dispatch] = useReducer(stateReducer, INITIAL_STATE);

	useEffect(() => {
		(async () => {
			const [ingredients, orders, recipes] = await Promise.all([
				Ingredient.list(),
				Order.list(),
				Recipe.list()
			]);

			dispatch({
				type: "INIT_DATA",
				ingredients,
				orders,
				recipes
			});
		})();
	}, []);

	const getRecipe = (recipeId: number) =>
		state.recipes.find((recipe: IRecipe) => recipe.id === recipeId);

	const value = {
		dispatch,
		state,
		getRecipe
	};

	return (
		<RestaurantContext.Provider {...{ value }}>
			<Router>
				<Layout>
					<Switch>
						<Route path="/dashboard">
							<Dashboard title="Dashboard" />
						</Route>

						<Route path="/ingredients">
							<Dashboard title="Ingredients" />
						</Route>

						<Route path="/recipes">
							<Dashboard title="Recipes" />
						</Route>

						<Route path="/orders">
							<Dashboard title="Orders" />
						</Route>

						<Route path="/">
							<Redirect to="/dashboard" />
						</Route>
					</Switch>
				</Layout>
			</Router>
		</RestaurantContext.Provider>
	);
};

export default App;
