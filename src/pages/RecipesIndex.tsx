import React, { useContext } from "react";
import { Card, Grid } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import RecipeCard from "../components/RecipeCard";
import RestaurantContext from "../contexts/RestaurantContext";

const RecipesIndex: React.FunctionComponent = () => {
	const {
		getIngredient,
		state: { orders, recipes }
	} = useContext(RestaurantContext);

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageTitle>Recipes</PageTitle>

					<Card.Group>
						{recipes.map(recipe => (
							<RecipeCard
								{...{ getIngredient, recipe }}
								key={recipe.id}
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
