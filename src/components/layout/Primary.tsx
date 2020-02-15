import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

import RestaurantContext from "../../contexts/RestaurantContext";

export const Primary: React.FunctionComponent = ({ children }) => {
	const {
		state: { orderCounts }
	} = useContext(RestaurantContext);

	return (
		<Container>
			<Menu>
				<Menu.Item>
					<Link to="/dashboard">Home</Link>
				</Menu.Item>

				<Menu.Item>
					<Link to="/ingredients">Ingredients</Link>
				</Menu.Item>

				<Menu.Item>
					<Link to="/recipes">Recipes</Link>
				</Menu.Item>

				<Menu.Item>
					<Link to="/orders">Orders</Link>
				</Menu.Item>
			</Menu>

			<Menu>
				<Menu.Item>
					{"pending orders: "}
					{orderCounts.pending}
				</Menu.Item>

				<Menu.Item>
					{"in-progress orders: "}
					{orderCounts.progress}
				</Menu.Item>

				<Menu.Item>
					{"cancelled orders: "}
					{orderCounts.cancelled}
				</Menu.Item>

				<Menu.Item>
					{"fulfilled orders: "}
					{orderCounts.fulfilled}
				</Menu.Item>
			</Menu>

			<main>{children}</main>
		</Container>
	);
};

export default Primary;
