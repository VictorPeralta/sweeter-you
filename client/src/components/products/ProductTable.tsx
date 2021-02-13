import React from "react";
import { Table, Thead, Tr, Th, Tbody, Td, Text, Image } from "@chakra-ui/react";
import { Product } from "../../../../types/Product";
import { Link } from "react-router-dom";

const ProductTable = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products && products.length ? (
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th>Description</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products
              .sort((a, b) => (a.Name > b.Name ? 1 : -1))
              .map((Product) => {
                return (
                  <Tr key={Product.Name}>
                    <Td>
                      <Image src={Product.ImageURL} boxSize="100px" />
                    </Td>
                    <Td>{Product.Name}</Td>
                    <Td>{Product.Price}</Td>
                    <Td>{Product.Description}</Td>
                    <Td textAlign="right">
                      <Link to={`/admin/products/edit/${Product.Name}`}>
                        <Text textColor="pink.400" _hover={{ textColor: "pink.500" }}>
                          Details
                        </Text>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      ) : (
        <h3>Loading data</h3>
      )}
    </div>
  );
};

export default ProductTable;
