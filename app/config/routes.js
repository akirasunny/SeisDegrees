import React from "react";
import { Route, Router, browserHistory, IndexRoute } from "react-router";
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
