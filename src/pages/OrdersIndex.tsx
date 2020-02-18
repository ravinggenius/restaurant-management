import React, { useContext } from "react";
import { Button, Grid, Table } from "semantic-ui-react";

import PageTitle from "../components/layout/PageTitle";
import Layout from "../components/layout/Primary";
import RestaurantContext from "../contexts/RestaurantContext";
import * as Order from "../services/Order";
import { IActionType, IOrder, IOrderStatus } from "../types";

const OrdersIndex: React.FunctionComponent = () => {
	const {
		dispatch,
		getRecipe,
		state: { orders }
	} = useContext(RestaurantContext);

	const handleUpdateOrder = (
		order: IOrder,
		status: IOrderStatus,
		actionType: IActionType
	) => async () => {
		try {
			await Order.update(order.id, {
				...order,
				status
			});

			dispatch({
				type: actionType,
				orderId: order.id
			});
		} catch (error) {
			console.error(error);
		}
	};

	const availableActionsFor = (order: IOrder) => {
		switch (order.status) {
			case "PENDING":
				return (
					<Button.Group>
						<Button
							onClick={handleUpdateOrder(
								order,
								"PROGRESS",
								"ORDER_STATUS_PROGRESS"
							)}
							type="button"
						>
							{"to in-progress"}
						</Button>

						<Button
							onClick={handleUpdateOrder(
								order,
								"CANCELLED",
								"ORDER_STATUS_CANCELLED"
							)}
							type="button"
						>
							{"cancel order"}
						</Button>
					</Button.Group>
				);

			case "PROGRESS":
				return (
					<Button
						onClick={handleUpdateOrder(
							order,
							"PROGRESS",
							"ORDER_STATUS_FULFILLED"
						)}
						type="button"
					>
						{"fulfill order"}
					</Button>
				);

			default:
				break;
		}
	};

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

									<Table.HeaderCell />
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{orders.map(order => (
									<Table.Row key={order.id}>
										<Table.Cell>
											{getRecipe(order.recipeId).name}
										</Table.Cell>

										<Table.Cell>{order.status}</Table.Cell>

										<Table.Cell>
											{availableActionsFor(order)}
										</Table.Cell>
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
