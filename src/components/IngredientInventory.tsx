import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import RestaurantContext from "../contexts/RestaurantContext";

const P = "p";

const NoIngredients = () => <P>No pending orders</P>;

const IngredientInventory: React.FunctionComponent = () => (
	<RestaurantContext.Consumer>
		{({ state: { ingredients } }) => (
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
		)}
	</RestaurantContext.Consumer>
);

export default IngredientInventory;
