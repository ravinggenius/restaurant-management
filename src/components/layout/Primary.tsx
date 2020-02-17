import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Statistic } from "semantic-ui-react";

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

			<Statistic.Group>
				<Statistic label="pending orders" value={orderCounts.pending} />
				<Statistic
					label="in-progress orders"
					value={orderCounts.progress}
				/>
				<Statistic
					label="cancelled orders"
					value={orderCounts.cancelled}
				/>
				<Statistic
					label="fullfilled orders"
					value={orderCounts.fulfilled}
				/>
			</Statistic.Group>

			<main>{children}</main>
		</Container>
	);
};

export default Primary;
