import { ItemList } from "aws-sdk/clients/dynamodb";
import DynamoDB = require("aws-sdk/clients/dynamodb");

const docClient = new DynamoDB.DocumentClient();
console.log("Creating docClient");
export interface IPutItem {
  PK: unknown;
  SK_GSI_PK: unknown;
  GSI_SK?: unknown;
  [key: string]: unknown;
}

export class Table {
  private tablename: string;
  constructor(tablename: string) {
    this.tablename = tablename;
  }

  async put(item: IPutItem): Promise<void> {
    const params = {
      TableName: this.tablename,
      Item: { ...item },
    };

    console.log("Params", params);

    await docClient.put(params).promise();
  }

  async query(
    pkName: string,
    partitionkey: string,
    skName?: string,
    sortKey?: string,
    indexName?: string
  ): Promise<ItemList | undefined> {
    const KeyConditionExpression = `${pkName} = :partition` + (skName && sortKey ? `and ${skName} = :sort` : "");
    const ExpressionAttributeValues: any = {
      ":partition": partitionkey,
    };

    if (sortKey) {
      ExpressionAttributeValues[":sort"] = sortKey;
    }
    const IndexName = indexName;

    const params = { TableName: this.tablename, KeyConditionExpression, ExpressionAttributeValues, IndexName };

    const response = await docClient.query(params).promise();
    return response.Items;
  }
}
