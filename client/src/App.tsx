import * as React from "react";
import { ChakraProvider, Box, theme, Link } from "@chakra-ui/react";
import { BrowserRouter as Router, Switch, Route, Link as RouterLink } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Box h="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Switch>
          <Route path="/admin">
            <Sidebar />
          </Route>
        </Switch>
      </Box>
    </Router>
  </ChakraProvider>
);
