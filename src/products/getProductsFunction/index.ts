import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getProducts } from "/opt/nodejs/productService";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  const products = await getProducts();
  return JSON.stringify(products);
};
