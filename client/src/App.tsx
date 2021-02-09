import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OpenOrders from "./pages/OpenOrders";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/admin/orders">
          <OpenOrders />
        </Route>
        <Route exact path="/admin/products">
          <Products />
        </Route>
        <Route exact path="/admin/products/create">
          <CreateProduct />
        </Route>
      </Switch>
    </Router>
    <Box></Box>
  </ChakraProvider>
);
