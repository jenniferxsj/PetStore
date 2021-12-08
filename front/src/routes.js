import React from "react";
import { Route, IndexRoute } from "react-router";
import Product from "./components/SingleProduct"

export default (
	<Route path ="/product/:id" element={<Product />} />
);