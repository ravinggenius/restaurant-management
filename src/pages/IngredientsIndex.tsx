import React, { useContext } from "react";
import { Card, Grid } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import IngredientCard from "../components/IngredientCard";
import RestaurantContext from "../contexts/RestaurantContext";

const IngredientsIndex: React.FunctionComponent = () => {
	const {
		state: { ingredients }
	} = useContext(RestaurantContext);

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageTitle>Ingredients</PageTitle>

					<Card.Group>
						{ingredients.map(ingredient => (
							<IngredientCard
								{...{ ingredient }}
								key={ingredient.id}
							/>
						))}
					</Card.Group>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default IngredientsIndex;
