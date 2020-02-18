import {
	Formik,
	Field,
	FieldArray,
	FormikHelpers,
	FieldInputProps
} from "formik";
import React, { SyntheticEvent, useContext } from "react";
import { Button, Form, Grid, Label, List, Segment } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RestaurantContext from "../contexts/RestaurantContext";
import KeyedErrors from "../services/KeyedErrors";
import * as Recipe from "../services/Recipe";
import { IRecipeAttrs, IRecipeIngredient } from "../types";

const RecipesNew: React.FunctionComponent = () => {
	const {
		dispatch,
		state: { ingredients, recipes }
	} = useContext(RestaurantContext);

	const persist = async (
		values: IRecipeAttrs,
		{ resetForm, setSubmitting }: FormikHelpers<IRecipeAttrs>
	) => {
		try {
			const recipe = await Recipe.create(recipes.length + 1, values);

			dispatch({
				type: "RECIPE_ADD",
				recipe
			});

			resetForm();
		} catch (error) {
			console.error(error);
		}

		setSubmitting(false);
	};

	return (
		<Layout>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<PageTitle>New Recipe</PageTitle>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Formik
							initialValues={{
								name: "",
								ingredients: [] as Array<IRecipeIngredient>
							}}
							onSubmit={persist}
							validate={values => {
								const errs = Recipe.validate(values);
								if (errs) {
									return KeyedErrors.serialize(errs);
								}
							}}
							validateOnMount
						>
							{({
								handleSubmit,
								isSubmitting,
								isValid,
								setFieldTouched,
								setFieldValue,
								values,
								...rest
							}) => (
								<Form onSubmit={handleSubmit}>
									<Field
										as={Form.Input}
										id="recipe-name"
										label="Name"
										name="name"
										placeholder="Cheesecake"
										required
									/>

									<Segment padded>
										<Label attached="top left">
											{"Ingredients"}
										</Label>

										<FieldArray name="ingredients">
											{helpers =>
												values.ingredients.length ? (
													<>
														<Button
															content="add"
															icon="add"
															labelPosition="left"
															onClick={() =>
																helpers.insert(
																	values
																		.ingredients
																		.length -
																		1,
																	""
																)
															}
															type="button"
														/>

														<List>
															{values.ingredients.map(
																(
																	ingredient,
																	index
																) => (
																	<List.Item
																		key={
																			index
																		}
																	>
																		<Field
																			as={
																				Form.Select
																			}
																			id={`recipe-ingredients-${index}`}
																			name={`ingredients.${index}.ingredientId`}
																			onBlur={(
																				event: SyntheticEvent,
																				{
																					name
																				}: FieldInputProps<
																					IRecipeIngredient
																				>
																			) => {
																				setFieldTouched(
																					name,
																					true
																				);
																			}}
																			onChange={(
																				event: SyntheticEvent,
																				{
																					name,
																					value
																				}: FieldInputProps<
																					IRecipeIngredient
																				>
																			) => {
																				setFieldValue(
																					name,
																					value
																				);
																			}}
																			options={ingredients.map(
																				ingredient => ({
																					key:
																						ingredient.id,
																					text:
																						ingredient.name,
																					value:
																						ingredient.id
																				})
																			)}
																			required
																		/>

																		<Field
																			as={
																				Form.Input
																			}
																			id={`recipe-ingredients-${index}`}
																			min={
																				1
																			}
																			name={`ingredients.${index}.quantity`}
																			placeholder="42"
																			required
																			type="number"
																		/>

																		<Button
																			content="remove"
																			icon="remove"
																			labelPosition="left"
																			onClick={() =>
																				helpers.remove(
																					index
																				)
																			}
																			type="button"
																		/>
																	</List.Item>
																)
															)}
														</List>
													</>
												) : (
													<Button
														content="add"
														icon="add"
														labelPosition="left"
														onClick={() =>
															helpers.push({
																ingredientId: null,
																quantity: 0
															})
														}
													/>
												)
											}
										</FieldArray>
									</Segment>

									<Button
										disabled={isSubmitting || !isValid}
										type="submit"
									>
										{"Create"}
									</Button>
								</Form>
							)}
						</Formik>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};

export default RecipesNew;
