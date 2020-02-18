import { DateTime } from "luxon";

import { LOCK_PENDING_SECONDS } from "../constants";

import { IAction, IAppState, IOrder, IOrderStatus } from "../types/index";

const countOrdersByStatus = (orders: Array<IOrder>) => (status: IOrderStatus) =>
	orders.filter(order => order.status === status).length;

const stateReducer = (state: IAppState, { type, ...payload }: IAction) => {
	switch (type) {
		case "INIT_DATA":
			const { ingredients, recipes, orders } = payload;

			const countByStatus = countOrdersByStatus(orders);

			const orderCounts = {
				pending: countByStatus("PENDING"),
				progress: countByStatus("PROGRESS"),
				cancelled: countByStatus("CANCELLED"),
				fulfilled: countByStatus("FULFILLED")
			};

			return {
				...state,
				ingredients,
				recipes,
				orders,
				orderCounts
			};

		case "INGREDIENT_ADD":
			const { ingredient: newIngredient } = payload;

			return {
				...state,
				ingredients: state.ingredients.concat(newIngredient)
			};

		case "INGREDIENT_UPDATE":
			const { ingredient: updatedIngredient } = payload;

			return {
				...state,
				ingredients: state.ingredients.map(ingredient =>
					ingredient.id === updatedIngredient.id
						? updatedIngredient
						: ingredient
				)
			};

		case "ORDER_CREATE":
			const { recipeId } = payload;

			const theRecipe = state.recipes.find(
				recipe => recipe.id === recipeId
			);

			if (!theRecipe) {
				return state;
			}

			return {
				...state,
				ingredients: state.ingredients.map(ingredient => {
					const theRecipeIngredient = theRecipe.ingredients.find(
						recipeIngredient =>
							recipeIngredient.ingredientId === ingredient.id
					);

					if (theRecipeIngredient) {
						return {
							...ingredient,
							quantity:
								ingredient.quantity -
								theRecipeIngredient.quantity
						};
					} else {
						return ingredient;
					}
				}),
				orders: state.orders.concat({
					id: state.orders.length + 1,
					status: "PENDING",
					recipeId,
					lockedAt: DateTime.utc().plus({
						seconds: LOCK_PENDING_SECONDS
					})
				}),
				orderCounts: {
					...state.orderCounts,
					pending: state.orderCounts.pending + 1
				}
			};

		case "RECIPE_ADD":
			const { recipe: newRecipe } = payload;

			return {
				...state,
				recipes: state.recipes.concat(newRecipe)
			};

		default:
			return state;
	}
};

export default stateReducer;
