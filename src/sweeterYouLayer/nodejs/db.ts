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

interface IKeyValue {
  [key: string]: any;
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
    const KeyConditionExpression: DynamoDB.KeyExpression =
      `${pkName} = :partition` + (skName && sortKey ? `and ${skName} = :sort` : "");
    const ExpressionAttributeValues: DynamoDB.DocumentClient.ExpressionAttributeValueMap = {
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

  async scan(indexName?: string): Promise<ItemList | undefined> {
    const IndexName = indexName;

    const params = { TableName: this.tablename, IndexName };

    const response = await docClient.scan(params).promise();
    return response.Items;
  }

  async get(hashKey: IKeyValue, sortKey: IKeyValue): Promise<DynamoDB.AttributeMap | undefined> {
    const Key = { ...hashKey, ...sortKey };
    const params = { TableName: this.tablename, Key };
    const response = await docClient.get(params).promise();
    return response.Item;
  }

  async delete(hashKey: IKeyValue, sortKey: IKeyValue, conditionalKey: string): Promise<boolean> {
    const Key = { ...hashKey, ...sortKey };
    const ConditionExpression = `attribute_exists (${conditionalKey})`;
    const params = { TableName: this.tablename, Key, ConditionExpression };
    await docClient.delete(params).promise();
    return true;
  }
}
