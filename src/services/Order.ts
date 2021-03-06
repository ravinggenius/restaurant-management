import { DateTime } from "luxon";

import { LOCK_PENDING_SECONDS } from "../constants";

import { IOrder } from "../types/index";

import { METHODS, fetchApi } from "./API";
import NetworkError from "./NetworkError";

type IRawOrder = {
	pending: boolean;
	recipe: number;
};

export const list: () => Promise<Array<IOrder>> = async () => {
	const response = await fetchApi(METHODS.GET, "/orders");

	if (response.ok) {
		const { orders: rawOrders } = await response.json();

		return rawOrders.map(
			({ pending, recipe: recipeId }: IRawOrder, index: number) => ({
				id: index + 1,
				status: pending ? "PENDING" : "FULFILLED",
				recipeId,
				lockedAt: DateTime.utc().plus({
					seconds: pending ? LOCK_PENDING_SECONDS : 0
				})
			})
		);
	} else {
		throw new NetworkError("Unable to list orders", response);
	}
};

export const update: (
	orderId: number,
	order: IOrder
) => Promise<IOrder> = async (orderId: number, order: IOrder) => {
	const response = await fetchApi(METHODS.PUT, "/orders");

	if (response.ok) {
		return {
			...order,
			id: orderId
		};
	} else {
		throw new NetworkError(
			"Unable to update order. Please check the status and try again.",
			response
		);
	}
};
