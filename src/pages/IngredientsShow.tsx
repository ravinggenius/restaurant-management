import { Formik, Field, FieldArray, FormikHelpers } from "formik";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Grid, Label, List, Segment } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RestaurantContext from "../contexts/RestaurantContext";
import * as Ingredient from "../services/Ingredient";
import KeyedErrors from "../services/KeyedErrors";
import { IIngredient } from "../types";

const IngredientsShow: React.FunctionComponent = () => {
	const {
		dispatch,
		state: { ingredients }
	} = useContext(RestaurantContext);

	const { ingredientId: iId } = useParams();

	if (!iId) {
		return <p>unable to load ingredient</p>;
	}

	const ingredientId = Number.parseInt(iId, 10);
	const ingredient = ingredients.find(({ id }) => id === ingredientId);

	if (!ingredient) {
		return <p>unable to load ingredient</p>;
	}

	const ingredientColors = ingredients
		.reduce<Array<string>>((memo, { colors }) => memo.concat(colors), [])
		.filter((c, index, colors) => colors.indexOf(c) === index)
		.sort();

	const persist = async (
		values: IIngredient,
		{ resetForm, setSubmitting }: FormikHelpers<IIngredient>
	) => {
		try {
			const ingredient = await Ingredient.update(ingredientId, values);

			dispatch({
				type: "INGREDIENT_UPDATE",
				ingredient
			});

			resetForm({ values: ingredient });
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
						<PageTitle>Edit Ingredient</PageTitle>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Formik
							initialValues={ingredient}
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
										{"Update"}
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

export default IngredientsShow;
