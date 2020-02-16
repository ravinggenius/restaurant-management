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
	IIngredient,
	IRecipe
} from "../contexts/RestaurantContext";

import Dashboard from "../pages/Dashboard";
import IngredientsIndex from "../pages/IngredientsIndex";
import OrdersIndex from "../pages/OrdersIndex";
import RecipesIndex from "../pages/RecipesIndex";

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

	const getIngredient = (ingredientId: number) =>
		state.ingredients.find(
			(ingredient: IIngredient) => ingredient.id === ingredientId
		);

	const getRecipe = (recipeId: number) =>
		state.recipes.find((recipe: IRecipe) => recipe.id === recipeId);

	const value = {
		dispatch,
		state,
		getIngredient,
		getRecipe
	};

	return (
		<RestaurantContext.Provider {...{ value }}>
			<Router>
				<Layout>
					<Switch>
						<Route path="/dashboard">
							<Dashboard />
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
				</Layout>
			</Router>
		</RestaurantContext.Provider>
	);
};

export default App;
