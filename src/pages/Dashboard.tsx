import React from "react";
import { Grid } from "semantic-ui-react";

import IngredientInventory from "../components/IngredientInventory";
import PendingOrderList from "../components/PendingOrderList";

const P = "p";

const Dashboard: React.FunctionComponent = () => (
	<Grid>
		<Grid.Row>
			<Grid.Column>
				<P>such dashboard</P>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row columns={2}>
			<Grid.Column>
				<PendingOrderList />
			</Grid.Column>

			<Grid.Column>
				<IngredientInventory />
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Dashboard;
