import { DateTime } from "luxon";
import React from "react";

export type IIngredient = {
	id: number;
	name: string;
	quantity: number;
	colors: Array<string>;
};

export type IRecipeIngredient = {
	ingredientId: number;
	quantity: number;
};

export type IRecipe = {
	id: number;
	name: string;
	ingredients: Array<IRecipeIngredient>;
};

export const ORDER_STATUS = {
	PENDING: "PENDING",
	PROGRESS: "PROGRESS",
	CANCELLED: "CANCELLED",
	FULFILLED: "FULFILLED"
};

export const LOCK_PENDING_SECONDS = 60 * 3;

export type IOrderStatus = "PENDING" | "PROGRESS" | "CANCELLED" | "FULFILLED";

export type IOrder = {
	id: number;
	status: IOrderStatus;
	recipeId: number;
	lockedAt: DateTime;
};

export type IOrderCounts = {
	pending: number;
	progress: number;
	cancelled: number;
	fulfilled: number;
};

export type IAppState = {
	ingredients: Array<IIngredient>;
	recipes: Array<IRecipe>;
	orders: Array<IOrder>;
	orderCounts: IOrderCounts;
};

export type IActionType = "INIT_DATA" | "ORDER_CREATE" | "ORDER_CANCEL";

export type IAction = {
	type: IActionType;
	[key: string]: any;
};

export type IAppContextState = {
	dispatch?(action: IAction): void;
	state: IAppState;
	[key: string]: any;
};

export const INITIAL_STATE: IAppState = {
	ingredients: [],
	recipes: [],
	orders: [],
	orderCounts: {
		pending: 0,
		progress: 0,
		cancelled: 0,
		fulfilled: 0
	}
};

const countOrdersByStatus = (orders: Array<IOrder>) => (status: IOrderStatus) =>
	orders.filter(order => order.status === status).length;

export const stateReducer = (
	state: IAppState,
	{ type, ...payload }: IAction
) => {
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

const RestaurantContext = React.createContext<IAppContextState>({
	state: INITIAL_STATE
});

export default RestaurantContext;
