import React, { useEffect, useState } from "react";
import OrderTable from "../components/orders/OrderTable";
import { Order } from "../../../types/Order";
import { GetOpenOrders } from "./../services/orderService";

const OpenOrders = () => {
  const [openOrders, setOpenOrders]: [Order[], any] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const orders = await GetOpenOrders();
      setOpenOrders(orders);
    }
    fetchData();
  }, []);

  return <OrderTable openOrders={openOrders} />;
};

export default OpenOrders;
