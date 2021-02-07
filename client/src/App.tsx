import * as React from "react";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OpenOrders from "./pages/OpenOrders";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/admin/orders">
          <OpenOrders />
        </Route>
      </Switch>
    </Router>
    <Box></Box>
  </ChakraProvider>
);
