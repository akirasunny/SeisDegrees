import React from "react";
import { Route } from "react-router";
import { Router } from "react-router";
import { hashHistory } from "react-router";

import { IndexRoute } from "react-router";

import Main from "../components/Main";
import Login from "../components/Login";
import Index from "../components/Index";
import Signup from "../components/Signup";
import Profile from "../components/Profile";
// Export the Routes
module.exports = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<Route path="/login" component={Login} />
			<Route path="/Signup" component={Signup} />
			<Route path="/profile" component={Profile} />
			<IndexRoute component={Index} />
		</Route>
	</Router>
);