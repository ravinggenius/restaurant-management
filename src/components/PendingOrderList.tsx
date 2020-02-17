import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { ORDER_STATUS } from "../constants";

import { IRecipe, IOrder } from "../types/index";

const P = "p";

const NoPendingOrders = () => <P>No pending orders</P>;

type IProps = {
	getRecipe(recipeId: number): IRecipe;
	orders: Array<IOrder>;
};

const PendingOrderList: React.FunctionComponent<IProps> = ({
	getRecipe,
	orders
}) => (
	<Container>
		<Header>Pending Orders</Header>

		{orders.length ? (
			<List>
				{orders
					.filter(({ status }) => status === ORDER_STATUS.PENDING)
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
);

export default PendingOrderList;
