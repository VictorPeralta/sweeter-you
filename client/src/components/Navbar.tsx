import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
  return (
    <Box
      id="navbar"
      display={{ md: "flex" }}
      justifyContent={{ md: "flex-end" }}
      px="10"
      py="5"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      fontWeight="500"
      textColor="gray.700"
      backgroundColor="white"
    >
      <RouterLink to="/admin">
        <Link mx="4" as="span">
          Admin
        </Link>
      </RouterLink>
    </Box>
  );
}
