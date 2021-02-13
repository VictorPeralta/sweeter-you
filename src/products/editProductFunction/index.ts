import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { editProduct, Product } from "/opt/nodejs/productService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log(event);
  const routeId = event.pathParameters?.productId;
  if (!routeId) {
    return {
      statusCode: 400,
      body: "Product Id required",
    };
  }

  if (!event.body) {
    return {
      statusCode: 400,
      body: "Event body not found",
    };
  }

  let product: Product = JSON.parse(event.body) as Product;
  if (product.Id && product.Id != routeId) {
    return {
      statusCode: 400,
      body: "Product id mismatch",
    };
  }

  product.Id = routeId;

  product = await editProduct(product);

  return JSON.stringify(product);
};
