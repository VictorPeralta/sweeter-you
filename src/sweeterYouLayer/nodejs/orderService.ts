import * as db from "./db";
import { nanoid } from "nanoid";

type Order = {
  Id?: string;
  CustomerName: string;
  CustomerPhone: string;
  OrderItems: [
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

export const createOrder = (newOrder: Order): Order => {
  if (!newOrder.Id) {
    newOrder.Id = nanoid();
  }

  db.put(newOrder);

  return newOrder;
};

export const hi = "test";
