import React, { useContext } from "react";
import { Card, Grid } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import RecipeCard from "../components/RecipeCard";
import RestaurantContext from "../contexts/RestaurantContext";

const RecipesIndex: React.FunctionComponent = () => {
	const {
		dispatch,
		getIngredient,
		state: { orders, recipes }
	} = useContext(RestaurantContext);

	const handleCreateOrder = (recipeId: number) => {
		if (dispatch) {
			dispatch({
				type: "ORDER_CREATE",
				recipeId
			});
		}
	};

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageTitle>Recipes</PageTitle>

					<Card.Group>
						{recipes.map(recipe => (
							<RecipeCard
								{...{ getIngredient, recipe }}
								canOrder={recipe.ingredients.reduce<boolean>(
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
										order => order.recipeId === recipe.id
									).length
								}
							/>
						))}
					</Card.Group>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default RecipesIndex;
