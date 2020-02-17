import React, { useReducer, useEffect } from "react";

import { INITIAL_STATE } from "../constants";

import RestaurantContext from "../contexts/RestaurantContext";

import stateReducer from "../reducers/index";

import * as Ingredient from "../services/Ingredient";
import * as Order from "../services/Order";
import * as Recipe from "../services/Recipe";

import { IIngredient, IRecipe } from "../types/index";

const AppStateProvider: React.FunctionComponent = ({ children }) => {
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
			{children}
		</RestaurantContext.Provider>
	);
};

export default AppStateProvider;
