import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { editLocationTime, LocationTime } from "/opt/nodejs/locationService";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    const routeId = event.pathParameters?.locationId;
    if (!routeId) {
      return {
        statusCode: 400,
        body: "Location Id required",
      };
    }

    if (!event.body) {
      return {
        statusCode: 400,
        body: "Event body not found",
      };
    }

    let locationTime: LocationTime = JSON.parse(event.body) as LocationTime;
    if (locationTime.Id && locationTime.Id != routeId) {
      return {
        statusCode: 400,
        body: "LocationTime id mismatch",
      };
    }

    locationTime.Id = routeId;

    locationTime = await editLocationTime(locationTime);

    return JSON.stringify(locationTime);
  } catch (error) {
    console.error(error);
    return {
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
};
