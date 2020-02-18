import { IIngredient, IIngredientAttrs } from "../types/index";

import { METHODS, fetchApi } from "./API";
import NetworkError from "./NetworkError";
import KeyedErrors from "./KeyedErrors";

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

export const validate: (attrs: IIngredientAttrs) => KeyedErrors | void = (
	attrs: IIngredientAttrs
) => {
	const errors = new KeyedErrors();

	if (!attrs.name) {
		errors.add("name", "Name is required");
	}

	if (attrs.quantity < 0) {
		errors.add("quantity", "Quantity must not be negative");
	}

	if (!attrs.colors.length) {
		errors.add("colors", "Must select at least one color");
	}

	if (errors.hasErrors()) {
		return errors;
	}
};

export const create: (
	nextId: number,
	attrs: IIngredientAttrs
) => Promise<IIngredient> = async (nextId: number, attrs: IIngredientAttrs) => {
	const errors = validate(attrs);

	if (errors) {
		throw errors;
	}

	const response = await fetchApi(METHODS.POST, "/items");

	if (response.ok) {
		return {
			id: nextId,
			...attrs
		};
	} else {
		throw new NetworkError(
			"Unable to create ingredient. Please check the form and try again.",
			response
		);
	}
};

export const update: (
	ingredientId: number,
	ingredient: IIngredient
) => Promise<IIngredient> = async (
	ingredientId: number,
	ingredient: IIngredient
) => {
	const errors = validate(ingredient);

	if (errors) {
		throw errors;
	}

	const response = await fetchApi(METHODS.PUT, "/items");

	if (response.ok) {
		return {
			...ingredient,
			id: ingredientId
		};
	} else {
		throw new NetworkError(
			"Unable to update ingredient. Please check the form and try again.",
			response
		);
	}
};
