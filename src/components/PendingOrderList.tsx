import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import RestaurantContext, { ORDER_STATUS } from "../contexts/RestaurantContext";

const P = "p";

const NoPendingOrders = () => <P>No pending orders</P>;

const PendingOrderList: React.FunctionComponent = () => (
	<RestaurantContext.Consumer>
		{({ state: { orders }, getRecipe }) => (
			<Container>
				<Header>Pending Orders</Header>

				{orders.length ? (
					<List>
						{orders
							.filter(
								({ status }) => status === ORDER_STATUS.PENDING
							)
							.map(order => (
								<List.Item key={order.id}>
									<Link to={`/orders/${order.id}`}>
										{getRecipe(order.recipeId).name}
									</Link>
								</List.Item>
							))}
					</List>
				) : (
					<NoPendingOrders />
				)}
			</Container>
		)}
	</RestaurantContext.Consumer>
);

export default PendingOrderList;
