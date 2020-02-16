import React from "react";
import { Card, List } from "semantic-ui-react";

import { IIngredient } from "../contexts/RestaurantContext";

type IProps = {
	ingredient: IIngredient;
};

const EM = "em";

const IngredientCard: React.FunctionComponent<IProps> = ({ ingredient }) => (
	<Card>
		<Card.Content>
			<Card.Header>{ingredient.name}</Card.Header>

			<Card.Meta>
				{"quantity: "}
				{ingredient.quantity}
			</Card.Meta>

			<Card.Description>
				{ingredient.colors.length ? (
					<List items={ingredient.colors} />
				) : (
					<EM>no colors</EM>
				)}
			</Card.Description>
		</Card.Content>

		<Card.Content>
			<Card.Meta>
				{"ingredient id: "}
				{ingredient.id}
			</Card.Meta>
		</Card.Content>
	</Card>
);

export default IngredientCard;
