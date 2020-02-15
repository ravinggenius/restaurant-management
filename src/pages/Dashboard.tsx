import React from "react";
import { Grid } from "semantic-ui-react";

import PendingOrderList from "../components/PendingOrderList";

type IProps = {
	title: string;
};

const P = "p";

const Dashboard: React.FunctionComponent<IProps> = ({ title }) => (
	<Grid>
		<Grid.Row>
			<Grid.Column>
				<P>such {title}</P>
			</Grid.Column>
		</Grid.Row>

		<Grid.Row columns={2}>
			<Grid.Column>
				<PendingOrderList />
			</Grid.Column>

			<Grid.Column>
				<PendingOrderList />
			</Grid.Column>
		</Grid.Row>
	</Grid>
);

export default Dashboard;
