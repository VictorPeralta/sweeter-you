import React from "react";
import { Box, Container, Link } from "@chakra-ui/react";
import { Link as RouterLink, Route, useRouteMatch } from "react-router-dom";
import OpenOrders from "../pages/OpenOrders";
import Products from "../pages/Products";
import CreateProduct from "../pages/CreateProduct";
import EditProduct from "../pages/EditProduct";
import Locations from "../pages/Locations";
import CreateLocation from "../pages/CreateLocation";

export default function Sidebar() {
  let match = useRouteMatch();
  console.log("match", match);
  return (
    <Box display={{ md: "flex" }} flex="1 1 auto">
      <Box
        py="5"
        borderRightWidth="1px"
        borderRightColor="gray.200"
        fontWeight="500"
        textColor="gray.600"
        backgroundColor="white"
        flexGrow={1}
        minW={52}
        maxW={{ base: "100%", md: 64 }}
      >
        <Box>
          <RouterLink to="/admin/orders">
            <Link mx="4" mb={6} as="div">
              Orders
            </Link>
          </RouterLink>
        </Box>
        <Box>
          <RouterLink to="/admin/products">
            <Link mx="4" mb={6} as="div">
              Products
            </Link>
          </RouterLink>
        </Box>
        <Box>
          <RouterLink to="/admin/locations">
            <Link mx="4" mb={6} as="div">
              Delivery Location & Time
            </Link>
          </RouterLink>
        </Box>
      </Box>
      <Container maxW="1200px" mt="4" textColor="gray.800" as="main">
        <Route exact path="/admin/orders">
          <OpenOrders />
        </Route>
        <Route exact path="/admin/products">
          <Products />
        </Route>
        <Route exact path="/admin/products/create">
          <CreateProduct />
        </Route>
        <Route exact path="/admin/products/edit/:productId">
          <EditProduct />
        </Route>
        <Route exact path="/admin/locations">
          <Locations />
        </Route>
        <Route exact path="/admin/locations/create">
          <CreateLocation />
        </Route>
      </Container>
    </Box>
  );
}
