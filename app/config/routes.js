import React from "react";
import { Route } from "react-router";
import { Router } from "react-router";
import { browserHistory } from "react-router";

import { IndexRoute } from "react-router";

import Main from "../components/Main";
import Index from "../components/Index";

// Export the Routes
module.exports = (
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Index} />
		</Route>
	</Router>
);