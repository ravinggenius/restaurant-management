import { DateTime } from "luxon";

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
	dispatch(action: IAction): void;
	state: IAppState;
	[key: string]: any;
};
