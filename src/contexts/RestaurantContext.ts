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

export type IActionType = "INIT_DATA" | "ORDER_CANCEL";

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

		default:
			return state;
	}
};

const RestaurantContext = React.createContext<IAppContextState>({
	state: INITIAL_STATE
});

export default RestaurantContext;