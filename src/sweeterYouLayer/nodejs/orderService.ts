import * as db from "./db";
import { nanoid } from "nanoid";

const orderTable = new db.Table(process.env.TABLE_NAME as string);

export type Order = {
  Id: string;
  CustomerName?: string;
  CustomerPhone?: string;
  Date: string;
  Time?: string;
  Location?: string;
  Status?: "Pending" | "Ready" | "Closed";
  OrderItems?: [
    {
      Product: string;
      Quantity: number;
    }
  ];
};

/**
 * Adds an id to newOrder and saves it to the database
 * @param newOrder Order to save to the database
 */

export const createOrder = async (newOrder: Order): Promise<Order> => {
  if (!newOrder.Id) {
    newOrder.Id = "ORDER-" + nanoid();
  }

  await saveOrderDetails(newOrder);
  await saveOpenOrderSparseIndex(newOrder);

  return newOrder;
};

const saveOrderDetails = async (order: Order) => {
  const { Id: PK, Date: SK_GSI_PK, Status: GSI_SK, ...item } = order;

  const orderToSave: db.IPutItem = {
    PK,
    SK_GSI_PK,
    GSI_SK,
    item,
  };

  await orderTable.put(orderToSave);
};

const saveOpenOrderSparseIndex = async (order: Order) => {
  const { Id: PK, Date: GSI_SK } = order;

  const openOrderDetails: db.IPutItem = {
    PK,
    SK_GSI_PK: "OpenDate",
    GSI_SK,
  };

  await orderTable.put(openOrderDetails);
};

export const getOpenOrders = async (): Promise<Order[]> => {
  const items = await orderTable.query("SK_GSI_PK", "OpenDate", undefined, undefined, "GenericGSI");
  const openOrders: Order[] = [];
  if (items) {
    items.forEach((element) => {
      openOrders.push({
        Id: element["PK"] as string,
        Date: element["GSI_SK"] as string,
      });
    });
  }
  return openOrders;
};
