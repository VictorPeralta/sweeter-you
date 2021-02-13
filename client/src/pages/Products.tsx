import React, { useState, useEffect } from "react";
import { GetProducts } from "../services/productService";
import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import ProductTable from "../components/products/ProductTable";
import { Button, Heading, Flex } from "@chakra-ui/react";

export default function Products() {
  const [products, setProducts]: [Product[], any] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchProducts = await GetProducts();
      setProducts(fetchProducts);
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading>Products</Heading>
      <Flex justifyContent="flex-end" w="100%">
        <Link to="/admin/products/create">
          <Button>New Product</Button>
        </Link>
      </Flex>
      <ProductTable products={products} />
    </>
  );
}
