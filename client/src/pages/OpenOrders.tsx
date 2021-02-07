import React, { useEffect, useState } from "react";
import OrderTable from "../components/orders/OrderTable";
import { Order } from "../../../types/Order";

const OpenOrders = () => {
  const [openOrders, setOpenOrders]: [Order[], any] = useState([]);

  useEffect(() => {
    fetch("https://mvpmvosb09.execute-api.us-west-2.amazonaws.com/dev/orders?status=open")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpenOrders(JSON.parse(data.body));
      })
      .catch((error) => console.log("error", error));
  }, []);

  return <OrderTable openOrders={openOrders} />;
};

export default OpenOrders;
