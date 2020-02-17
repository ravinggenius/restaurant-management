import { IIngredient } from "../types/index";

import { METHODS, fetchApi } from "./API";
import NetworkError from "./NetworkError";

type IRawIngredient = {
	id: number;
	name: string;
	qty: string;
	colors?: Array<string>;
};

export const list: () => Promise<Array<IIngredient>> = async () => {
	const response = await fetchApi(METHODS.GET, "/items");

	if (response.ok) {
		const { itens: rawIngredients } = await response.json();

		return rawIngredients.map(
			({ id, name, qty, colors = [] }: IRawIngredient) => ({
				id,
				name,
				quantity: Number.parseInt(qty, 10),
				colors: colors.map(color => color.toLowerCase())
			})
		);
	} else {
		throw new NetworkError("Unable to list ingredients", response);
	}
};
