import * as db from "./db";
import { nanoid } from "nanoid";
import { Order } from "types/Order";
export { Order } from "types/Order";

const orderTable = new db.Table(process.env.TABLE_NAME as string);

/**
 * Adds an id to newOrder and saves it to the database
 * @param newOrder Order to save to the database
 */

export const createOrder = async (newOrder: Order): Promise<Order> => {
  if (!newOrder.Id) {
    newOrder.Id = "ORDER-" + nanoid();
  }

  newOrder.Status = "Pending";
  newOrder.IsOpen = "Y";

  await saveOrderDetails(newOrder);

  return newOrder;
};

const saveOrderDetails = async (order: Order) => {
  const { Id: PK, Date: SK_GSI_PK, IsOpen: GSI_SK, ...item } = order;

  const orderToSave: db.IPutItem = {
    PK,
    SK_GSI_PK,
    GSI_SK,
    ...item,
  };

  await orderTable.put(orderToSave);
};

export const getOpenOrders = async (): Promise<Order[]> => {
  const items = await orderTable.scan("GenericGSI");
  const openOrders: Order[] = [];
  if (items) {
    items.forEach((element) => {
      const { PK: Id, SK_GSI_PK: Date, ...item } = element;
      openOrders.push({
        Id: element["PK"] as string,
        Date: element["SK_GSI_PK"] as string,
        ...item,
      });
    });
  }
  return openOrders;
};
