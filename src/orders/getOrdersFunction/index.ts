import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getOpenOrders, Order } from "/opt/nodejs/orderService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log(event);
  if (event.queryStringParameters?.status === "open") {
    const orders = await getOpenOrders();
    return {
      body: JSON.stringify(orders),
    };
  }

  return {
    body: JSON.stringify(event),
  };
};
