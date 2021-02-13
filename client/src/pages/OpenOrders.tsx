import React, { useEffect, useState } from "react";
import OrderTable from "../components/orders/OrderTable";
import { Order } from "../../../types/Order";
import { GetOpenOrders } from "./../services/orderService";
import { Heading } from "@chakra-ui/react";

const OpenOrders = () => {
  const [openOrders, setOpenOrders]: [Order[], any] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orders = await GetOpenOrders();
      setOpenOrders(orders);
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading>Orders</Heading>
      <OrderTable openOrders={openOrders} />
    </>
  );
};

export default OpenOrders;
