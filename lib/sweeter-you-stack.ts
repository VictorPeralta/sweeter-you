import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
export class SweeterYouStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const sweeterYouTable = new dynamodb.Table(this, "SweeterYouTable", {
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK_GSI_PK", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PROVISIONED,
      writeCapacity: 5,
      readCapacity: 5,
    });

    sweeterYouTable.addGlobalSecondaryIndex({
      indexName: "GenericGSI",
      partitionKey: { name: "SK_GSI_PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK_GSI_PK", type: dynamodb.AttributeType.STRING },
      readCapacity: 5,
      writeCapacity: 5,
    });

    const testLayer = new lambda.LayerVersion(this, "SweeterYouLayer", {
      code: lambda.Code.fromAsset("src/sweeterYouLayer"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_10_X],
    });

    const testFunction = new lambda.Function(this, "TestLayerFunction", {
      code: lambda.Code.fromAsset("src/layerTestFunction"),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      layers: [testLayer],
    });
  }
}
