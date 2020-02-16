import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IIngredient } from "../contexts/RestaurantContext";

const P = "p";

const NoIngredients = () => <P>No pending orders</P>;

type IProps = {
	ingredients: Array<IIngredient>;
};

const IngredientInventory: React.FunctionComponent<IProps> = ({
	ingredients
}) => (
	<Container>
		<Header>Ingredient Inventory</Header>

		{ingredients.length ? (
			<List>
				{ingredients.map(ingredient => (
					<List.Item key={ingredient.id}>
						<Link to={`/ingredients/${ingredient.id}`}>
							{ingredient.name}
							{" - "}
							{ingredient.quantity}
						</Link>
					</List.Item>
				))}
			</List>
		) : (
			<NoIngredients />
		)}
	</Container>
);

export default IngredientInventory;
