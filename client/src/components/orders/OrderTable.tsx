import React from "react";
import { Table, Thead, Tr, Th, Tbody, Td, Button } from "@chakra-ui/react";
import { Order } from "../../../../types/Order";

const OrderTable = ({ openOrders }: { openOrders: Order[] }) => {
  return (
    <div>
      {openOrders && openOrders.length ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Customer Name</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {openOrders
              .sort((a, b) => (a.Date > b.Date ? 1 : -1))
              .map((order) => {
                return (
                  <Tr key={order.Id}>
                    <Td>{order.CustomerName}</Td>
                    <Td>{order.Status}</Td>
                    <Td>
                      {new Date(order.Date).toLocaleString("es-mx", {
                        day: "numeric",
                        month: "long",
                        weekday: "short",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>
                      <Button>Detalles</Button>
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

export default OrderTable;
