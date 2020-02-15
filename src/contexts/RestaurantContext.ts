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

export const stateReducer = (
	state: IAppState,
	{ type, ...payload }: IAction
) => {
	switch (type) {
		case "INIT_DATA":
			const { ingredients, recipes, orders } = payload;

			return {
				...state,
				ingredients,
				recipes,
				orders
			};

		default:
			return state;
	}
};

const RestaurantContext = React.createContext<IAppContextState>({
	state: INITIAL_STATE
});

export default RestaurantContext;
