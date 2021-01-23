import { Product, createProduct } from "/opt/nodejs/productService";
import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  let response: APIGatewayProxyResultV2;
  console.log("Entering handler");

  try {
    if (!event.body) {
      response = {
        body: "Request body is required",
        statusCode: 400,
      };
      return response;
    }

    let newProduct: Product = JSON.parse(event.body);

    newProduct = await createProduct(newProduct);
    console.log("New Product:", newProduct);

    response = {
      body: JSON.stringify(newProduct),
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
