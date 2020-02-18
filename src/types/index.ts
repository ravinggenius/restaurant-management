import { DateTime } from "luxon";

export type IIngredientAttrs = {
	name: string;
	quantity: number;
	colors: Array<string>;
};

export type IIngredient = IIngredientAttrs & {
	id: number;
};

export type IRecipeIngredient = {
	ingredientId: number;
	quantity: number;
};

export type IRecipeAttrs = {
	name: string;
	ingredients: Array<IRecipeIngredient>;
};

export type IRecipe = IRecipeAttrs & {
	id: number;
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

export type IActionType =
	| "INIT_DATA"
	| "INGREDIENT_ADD"
	| "INGREDIENT_UPDATE"
	| "INGREDIENT_REMOVE"
	| "ORDER_CREATE"
	| "ORDER_STATUS_PROGRESS"
	| "ORDER_STATUS_CANCELLED"
	| "ORDER_STATUS_FULFILLED"
	| "RECIPE_ADD";

export type IAction = {
	type: IActionType;
	[key: string]: any;
};

export type IAppContextState = {
	dispatch(action: IAction): void;
	state: IAppState;
	[key: string]: any;
};
