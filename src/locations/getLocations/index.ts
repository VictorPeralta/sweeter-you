import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getLocationTimes } from "/opt/nodejs/locationService";

export const handler: APIGatewayProxyHandlerV2 = async () => {
  try {
    const products = await getLocationTimes();
    return JSON.stringify(products);
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
