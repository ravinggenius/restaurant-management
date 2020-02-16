import React from "react";
import { Header } from "semantic-ui-react";

const PageTitle: React.FunctionComponent = ({ children }) => (
	<Header as="h1">{children}</Header>
);

export default PageTitle;
