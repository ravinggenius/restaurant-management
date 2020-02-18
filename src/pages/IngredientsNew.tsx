import { Formik, Field, FieldArray, FormikHelpers } from "formik";
import React, { useContext } from "react";
import { Button, Form, Grid, Label, List, Segment } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RestaurantContext from "../contexts/RestaurantContext";
import * as Ingredient from "../services/Ingredient";
import KeyedErrors from "../services/KeyedErrors";
import { IIngredientAttrs } from "../types";

const IngredientsNew: React.FunctionComponent = () => {
	const {
		dispatch,
		state: { ingredients }
	} = useContext(RestaurantContext);

	const ingredientColors = ingredients
		.reduce<Array<string>>((memo, { colors }) => memo.concat(colors), [])
		.filter((c, index, colors) => colors.indexOf(c) === index)
		.sort();

	const persist = async (
		values: IIngredientAttrs,
		{ resetForm, setSubmitting }: FormikHelpers<IIngredientAttrs>
	) => {
		try {
			const ingredient = await Ingredient.create(
				ingredients.length,
				values
			);

			dispatch({
				type: "INGREDIENT_ADD",
				ingredient
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
						<PageTitle>New Ingredient</PageTitle>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Formik
							initialValues={{
								name: "",
								quantity: 0,
								colors: [] as Array<string>
							}}
							onSubmit={persist}
							validate={values => {
								const errs = Ingredient.validate(values);
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
								values
							}) => (
								<Form onSubmit={handleSubmit}>
									<Field
										as={Form.Input}
										id="ingredient-name"
										label="Name"
										name="name"
										placeholder="Lemon"
										required
									/>

									<Field
										as={Form.Input}
										id="ingredient-quantity"
										label="Quantity"
										min={0}
										name="quantity"
										placeholder="42"
										required
										type="number"
									/>

									<Segment padded>
										<Label attached="top left">
											{"Colors"}
										</Label>

										<FieldArray name="colors">
											{helpers =>
												values.colors.length ? (
													<>
														<Button
															content="add"
															icon="add"
															labelPosition="left"
															onClick={() =>
																helpers.insert(
																	values
																		.colors
																		.length -
																		1,
																	""
																)
															}
															type="button"
														/>

														<List>
															{values.colors.map(
																(
																	color,
																	index
																) => (
																	<List.Item
																		key={
																			index
																		}
																	>
																		<Field
																			as={
																				Form.Input
																			}
																			id={`ingredient-colors-${index}`}
																			list="ingredient-colors-options"
																			name={`colors.${index}`}
																			placeholder="chartreuse"
																			required
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
															helpers.push("")
														}
													/>
												)
											}
										</FieldArray>

										<datalist id="ingredient-colors-options">
											{ingredientColors.map(color => (
												<option
													key={color}
													value={color}
												/>
											))}
										</datalist>
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

export default IngredientsNew;
