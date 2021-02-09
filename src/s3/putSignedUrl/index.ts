import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import S3 = require("aws-sdk/clients/s3");
import { nanoid } from "nanoid";

const s3 = new S3();

export const handler: APIGatewayProxyHandlerV2 = async ({ queryStringParameters }) => {
  if (!queryStringParameters) {
    return {
      statusCode: 500,
      body: "No query string parameters",
    };
  }
  const filetype = queryStringParameters["fileType"];
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: nanoid() + "." + filetype,
    ContentType: filetype,
    ACL: "public-read",
  };
  console.log(params);
  const url = await s3.getSignedUrlPromise("putObject", params);

  return {
    body: url,
  };
};
