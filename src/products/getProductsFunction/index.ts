import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getProducts } from "/opt/nodejs/productService";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    const products = await getProducts();
    return JSON.stringify(products);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
