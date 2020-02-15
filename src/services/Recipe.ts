import { IRecipe } from "../contexts/RestaurantContext";

import { METHODS, fetchApi } from "./API";
import NetworkError from "./NetworkError";

type IRawRecipe = {
	id: number;
	name: string;
	items: Array<{ id: number; quntity: number }>;
};

export const list: () => Promise<Array<IRecipe>> = async () => {
	const response = await fetchApi(METHODS.GET, "/recipes");

	if (response.ok) {
		const { recipes } = await response.json();

		return recipes.map(({ id, name, items }: IRawRecipe) => ({
			id,
			name,
			ingredients: items.map(({ id: ingredientId, quntity }) => ({
				ingredientId,
				quantity: quntity
			}))
		}));
	} else {
		throw new NetworkError("Unable to list recipes", response);
	}
};
