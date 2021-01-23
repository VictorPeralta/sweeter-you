import { createOrder, Order } from "/opt/nodejs/orderService";
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  let response: APIGatewayProxyResultV2;
  try {
    if (!event.body) {
      response = {
        body: "Request body is required",
        statusCode: 400,
      };
      return response;
    }

    let newOrder: Order = JSON.parse(event.body);

    newOrder = await createOrder(newOrder);
    console.log("New order:", newOrder);

    response = {
      body: JSON.stringify(newOrder),
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);

    response = {
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
  return response;
};
