import * as aws from "aws-sdk";

const docClient = new aws.DynamoDB.DocumentClient();

export const put = async <T>(item: T): Promise<void> => {
  const params = {
    TableName: process.env.TABLE_NAME as string,
    Item: item,
  };
  await docClient.put(params).promise().then();
};
