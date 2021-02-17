import { LocationTime, createLocationTime } from "/opt/nodejs/locationService";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  try {
    if (!event.body) {
      return {
        body: "Request body is required",
        statusCode: 400,
      };
    }

    let newLocationTime: LocationTime = JSON.parse(event.body);

    newLocationTime = await createLocationTime(newLocationTime);
    console.log("New LocationTime:", newLocationTime);

    return {
      body: JSON.stringify(newLocationTime),
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    console.error(error);

    return {
      body: JSON.stringify(error),
      statusCode: 500,
    };
  }
};
