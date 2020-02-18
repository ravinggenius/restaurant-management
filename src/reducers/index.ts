import { DateTime } from "luxon";

import { LOCK_PENDING_SECONDS } from "../constants";

import { IAction, IAppState, IOrder, IOrderStatus } from "../types/index";

const countOrdersByStatus = (orders: Array<IOrder>) => (status: IOrderStatus) =>
	orders.filter(order => order.status === status).length;

const calculateOrderCounts = (orders: Array<IOrder>) => {
	const countByStatus = countOrdersByStatus(orders);

	return {
		pending: countByStatus("PENDING"),
		progress: countByStatus("PROGRESS"),
		cancelled: countByStatus("CANCELLED"),
		fulfilled: countByStatus("FULFILLED")
	};
};

const stateReducer = (state: IAppState, { type, ...payload }: IAction) => {
	switch (type) {
		case "INIT_DATA":
			const { ingredients, recipes, orders } = payload;

			return {
				...state,
				ingredients,
				recipes,
				orders,
				orderCounts: calculateOrderCounts(orders)
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

		case "INGREDIENT_REMOVE":
			const { ingredientId } = payload;

			return {
				...state,
				ingredients: state.ingredients.filter(
					ingredient => ingredient.id !== ingredientId
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

		case "ORDER_STATUS_PROGRESS":
			const { orderId: progressOrderId } = payload;

			const progressOrders: Array<IOrder> = state.orders.map(order =>
				order.id === progressOrderId
					? {
							...order,
							status: "PROGRESS"
					  }
					: order
			);

			return {
				...state,
				orders: progressOrders,
				orderCounts: calculateOrderCounts(progressOrders)
			};

		case "ORDER_STATUS_CANCELLED":
			const { orderId: cancelOrderId } = payload;

			const cancelOrders: Array<IOrder> = state.orders.map(order =>
				order.id === cancelOrderId
					? {
							...order,
							status: "CANCELLED"
					  }
					: order
			);

			return {
				...state,
				orders: cancelOrders,
				orderCounts: calculateOrderCounts(cancelOrders)
			};

		case "ORDER_STATUS_FULFILLED":
			const { orderId: fulfillOrderId } = payload;

			const fulfillOrders: Array<IOrder> = state.orders.map(order =>
				order.id === fulfillOrderId
					? {
							...order,
							status: "FULFILLED"
					  }
					: order
			);

			return {
				...state,
				orders: fulfillOrders,
				orderCounts: calculateOrderCounts(fulfillOrders)
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
