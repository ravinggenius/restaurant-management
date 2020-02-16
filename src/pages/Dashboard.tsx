import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";

import IngredientInventory from "../components/IngredientInventory";
import PendingOrderList from "../components/PendingOrderList";
import PageTitle from "../components/layout/PageTitle";
import RestaurantContext from "../contexts/RestaurantContext";

const Dashboard: React.FunctionComponent = () => {
	const {
		state: { ingredients, orders },
		getRecipe
	} = useContext(RestaurantContext);

	return (
		<Grid>
			<Grid.Row>
				<Grid.Column>
					<PageTitle>Dashboard</PageTitle>
				</Grid.Column>
			</Grid.Row>

			<Grid.Row columns={2}>
				<Grid.Column>
					<PendingOrderList {...{ getRecipe, orders }} />
				</Grid.Column>

				<Grid.Column>
					<IngredientInventory {...{ ingredients }} />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default Dashboard;
