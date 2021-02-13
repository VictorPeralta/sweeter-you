import config from "./../config";
import { Order } from "../../../types/Order";

export async function GetOpenOrders(): Promise<Order[]> {
  const res = await fetch(`${config.baseUrl}/orders?status=open`);
  const data = await res.json();
  console.log(data);

  return data;
}
