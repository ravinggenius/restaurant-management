import { IRecipe, IRecipeAttrs } from "../types/index";

import { METHODS, fetchApi } from "./API";
import NetworkError from "./NetworkError";
import KeyedErrors from "./KeyedErrors";

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

export const validate: (attrs: IRecipeAttrs) => KeyedErrors | void = (
	attrs: IRecipeAttrs
) => {
	const errors = new KeyedErrors();

	if (!attrs.name) {
		errors.add("name", "Name is required");
	}

	if (!attrs.ingredients.length) {
		errors.add("ingredients", "Must select at least one ingredient");
	}

	if (errors.hasErrors()) {
		return errors;
	}
};

export const create: (
	nextId: number,
	attrs: IRecipeAttrs
) => Promise<IRecipe> = async (nextId: number, attrs: IRecipeAttrs) => {
	const errors = validate(attrs);

	if (errors) {
		throw errors;
	}

	const response = await fetchApi(METHODS.POST, "/recipes");

	if (response.ok) {
		return {
			id: nextId,
			...attrs
		};
	} else {
		throw new NetworkError(
			"Unable to create recipe. Please check the form and try again.",
			response
		);
	}
};
