import React from "react";

import { INITIAL_STATE } from "../constants";

import { IAppContextState } from "../types/index";

const RestaurantContext = React.createContext<IAppContextState>({
	state: INITIAL_STATE
});

export default RestaurantContext;
