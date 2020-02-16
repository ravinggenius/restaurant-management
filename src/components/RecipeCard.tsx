import React from "react";
import { Card, List } from "semantic-ui-react";

import { IIngredient, IRecipe } from "../contexts/RestaurantContext";

type IProps = {
	getIngredient(ingredientId: number): IIngredient;
	recipe: IRecipe;
	usageCount: number;
};

const RecipeCard: React.FunctionComponent<IProps> = ({
	getIngredient,
	recipe,
	usageCount
}) => (
	<Card>
		<Card.Content>
			<Card.Header>{recipe.name}</Card.Header>

			<Card.Meta>
				{recipe.ingredients.length}
				{" ingredients"}
			</Card.Meta>

			<Card.Description>
				<List>
					{recipe.ingredients.map(({ ingredientId, quantity }) => (
						<List.Item key={ingredientId}>
							{getIngredient(ingredientId).name}
							{" - "}
							{quantity}
						</List.Item>
					))}
				</List>
			</Card.Description>
		</Card.Content>

		<Card.Content>
			<Card.Description>
				{"ordered "}
				{usageCount}
				{" times"}
			</Card.Description>

			<Card.Meta>
				{"recipe id: "}
				{recipe.id}
			</Card.Meta>
		</Card.Content>
	</Card>
);

export default RecipeCard;
