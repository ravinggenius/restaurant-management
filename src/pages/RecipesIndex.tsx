import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Grid } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RecipeCard from "../components/RecipeCard";
import RestaurantContext from "../contexts/RestaurantContext";

const RecipesIndex: React.FunctionComponent = () => {
	const {
		dispatch,
		getIngredient,
		state: { orders, recipes }
	} = useContext(RestaurantContext);

	const handleCreateOrder = (recipeId: number) => {
		dispatch({
			type: "ORDER_CREATE",
			recipeId
		});
	};

	return (
		<Layout>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<PageTitle>Recipes</PageTitle>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Button as={Link} to="/recipes/new">
							{"New"}
						</Button>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Card.Group>
							{recipes.map(recipe => (
								<RecipeCard
									{...{ getIngredient, recipe }}
									canOrder={recipe.ingredients.reduce<
										boolean
									>(
										(memo, { ingredientId, quantity }) =>
											memo &&
											quantity <
												getIngredient(ingredientId)
													.quantity,
										true
									)}
									key={recipe.id}
									onCreateOrder={handleCreateOrder}
									usageCount={
										orders.filter(
											order =>
												order.recipeId === recipe.id
										).length
									}
								/>
							))}
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};

export default RecipesIndex;
