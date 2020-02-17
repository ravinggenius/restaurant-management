import { IAppState } from "./types/index";

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

export const LOCK_PENDING_SECONDS = 60 * 3;

export const ORDER_STATUS = {
	PENDING: "PENDING",
	PROGRESS: "PROGRESS",
	CANCELLED: "CANCELLED",
	FULFILLED: "FULFILLED"
};
