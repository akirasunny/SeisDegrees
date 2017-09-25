import React from "react";
import { Route } from "react-router";
import { Router } from "react-router";
import { browserHistory } from "react-router";

import { IndexRoute } from "react-router";

import Main from "../components/Main";
import Login from "../components/Login";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
import Member from "../components/Member";

// Export the Routes
module.exports = (
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<Route path="/profile" component={Profile} />
			<Route path="/member" component={Member} />
			<IndexRoute component={Index} />
		</Route>
	</Router>
);