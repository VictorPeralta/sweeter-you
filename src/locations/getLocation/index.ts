import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { getSingleLocationTime } from "/opt/nodejs/locationService";

export const handler: APIGatewayProxyHandlerV2 = async ({ pathParameters }) => {
  try {
    const locationId = pathParameters?.locationId;
    if (locationId) {
      const location = await getSingleLocationTime(locationId);
      return JSON.stringify(location);
    } else {
      return {
        statusCode: 400,
        body: "location id is required /locations/{locationId}",
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
