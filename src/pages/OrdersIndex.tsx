import React, { useContext } from "react";
import { Grid, Table } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RestaurantContext from "../contexts/RestaurantContext";

const OrdersIndex: React.FunctionComponent = () => {
	const {
		getRecipe,
		state: { orders }
	} = useContext(RestaurantContext);

	return (
		<Layout>
			<Grid>
				<Grid.Row>
					<Grid.Column>
						<PageTitle>Orders</PageTitle>

						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>
										{"Recipe Name"}
									</Table.HeaderCell>
									<Table.HeaderCell>
										{"Status"}
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{orders.map(order => (
									<Table.Row key={order.id}>
										<Table.Cell>
											{getRecipe(order.recipeId).name}
										</Table.Cell>

										<Table.Cell>{order.status}</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};

export default OrdersIndex;
