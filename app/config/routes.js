import React from "react";
import { Route } from "react-router";
import { Router } from "react-router";
import { hashHistory } from "react-router";

import { IndexRoute } from "react-router";

import AppBarExampleIcon from "../components/Test";
// Export the Routes
module.exports = (
	<Router history={hashHistory}>
		<Route path="/" component={AppBarExampleIcon}>
			<IndexRoute component={AppBarExampleIcon} />
		</Route>
	</Router>
);