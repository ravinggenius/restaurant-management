import React from "react";
import { Button, Card, List } from "semantic-ui-react";

import { IIngredient, IRecipe } from "../contexts/RestaurantContext";

type IProps = {
	canOrder?: boolean;
	getIngredient(ingredientId: number): IIngredient;
	onCreateOrder(recipeId: number): void;
	recipe: IRecipe;
	usageCount: number;
};

const EM = "em";

const RecipeCard: React.FunctionComponent<IProps> = ({
	canOrder = false,
	getIngredient,
	onCreateOrder,
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

				{canOrder ? (
					<Button
						onClick={() => onCreateOrder(recipe.id)}
						type="button"
					>
						{"order"}
					</Button>
				) : (
					<EM>not enough ingredients to order</EM>
				)}
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
