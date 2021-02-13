import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getSingleProduct } from "/opt/nodejs/productService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const productId = event.pathParameters?.productId;
    if (productId) {
      const product = await getSingleProduct(productId);
      return JSON.stringify(product);
    } else {
      return {
        statusCode: 400,
        body: "Product id is required /products/{productId}",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
