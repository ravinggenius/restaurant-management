import React, { useContext, useState } from "react";
import { Card, Form, Grid } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import IngredientCard from "../components/IngredientCard";
import RestaurantContext from "../contexts/RestaurantContext";

const EmptyList = "em";

const IngredientsIndex: React.FunctionComponent = () => {
	const {
		state: { ingredients }
	} = useContext(RestaurantContext);

	const [color, setColor] = useState("");

	const filteredIngredients = ingredients.filter(
		ingredient =>
			ingredient.colors.filter(c => c.toLowerCase().includes(color))
				.length
	);

	return (
		<Layout>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<PageTitle>Ingredients</PageTitle>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Form>
							<Form.Input
								icon="search"
								id="color-filter"
								label="filter by color"
								name="color"
								onChange={({ target: { value } }) =>
									setColor(value.toLowerCase())
								}
								placeholder="chartreuse"
								type="search"
								value={color}
							/>
						</Form>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Card.Group>
							{filteredIngredients.length ? (
								filteredIngredients.map(ingredient => (
									<IngredientCard
										{...{ ingredient }}
										key={ingredient.id}
									/>
								))
							) : (
								<EmptyList>
									{color
										? `No Ingredients match color "${color}"`
										: "No Ingredients available"}
								</EmptyList>
							)}
						</Card.Group>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};

export default IngredientsIndex;
