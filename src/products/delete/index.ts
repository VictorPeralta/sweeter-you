import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { deleteProduct } from "/opt/nodejs/productService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const routeId = event.pathParameters?.productId;
    if (!routeId) {
      return {
        statusCode: 400,
        body: "Product Id required",
      };
    }
    await deleteProduct(routeId);

    return {
      statusCode: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
