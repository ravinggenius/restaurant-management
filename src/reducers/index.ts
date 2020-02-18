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
			const { ingredient } = payload;

			return {
				...state,
				ingredients: state.ingredients.concat(ingredient)
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

		default:
			return state;
	}
};

export default stateReducer;
