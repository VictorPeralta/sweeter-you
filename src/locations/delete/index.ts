import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { deleteLocationTime } from "/opt/nodejs/locationService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const routeId = event.pathParameters?.locationId;
    if (!routeId) {
      return {
        statusCode: 400,
        body: "Location Id required",
      };
    }
    await deleteLocationTime(routeId);

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
