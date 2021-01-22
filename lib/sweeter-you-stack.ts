import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as apigw from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { CfnOutput } from "@aws-cdk/core";

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
      sortKey: { name: "GSI_SK", type: dynamodb.AttributeType.STRING },
      readCapacity: 5,
      writeCapacity: 5,
    });

    const helpersLayer = new lambda.LayerVersion(this, "SweeterYouLayer", {
      code: lambda.Code.fromAsset("src/sweeterYouLayer"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_10_X],
    });

    const createOrderFunction = new lambda.Function(this, "CreateOrderFunction", {
      code: lambda.Code.fromAsset("src/createOrderFunction"),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      layers: [helpersLayer],
      environment: { TABLE_NAME: sweeterYouTable.tableName },
    });

    sweeterYouTable.grantWriteData(createOrderFunction);

    const getOrdersFunction = new lambda.Function(this, "getOrdersFunction", {
      code: lambda.Code.fromAsset("src/getOrdersFunction"),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      layers: [helpersLayer],
      environment: { TABLE_NAME: sweeterYouTable.tableName },
    });

    sweeterYouTable.grantReadData(getOrdersFunction);

    const restAPI = new apigw.HttpApi(this, "SweeterYouAPI", {
      corsPreflight: {
        allowMethods: [apigw.HttpMethod.POST, apigw.HttpMethod.GET],
        allowOrigins: ["*"],
        allowHeaders: ["*"],
      },
      createDefaultStage: false,
    });

    const devStg = new apigw.HttpStage(this, "SweeterYouDevStg", {
      httpApi: restAPI,
      autoDeploy: true,
      stageName: "dev",
    });

    const createOrderIntegration = new LambdaProxyIntegration({
      handler: createOrderFunction,
      payloadFormatVersion: apigw.PayloadFormatVersion.VERSION_2_0,
    });

    const getOrdersIntegration = new LambdaProxyIntegration({
      handler: getOrdersFunction,
      payloadFormatVersion: apigw.PayloadFormatVersion.VERSION_2_0,
    });

    restAPI.addRoutes({
      path: "/orders",
      methods: [apigw.HttpMethod.POST],
      integration: createOrderIntegration,
    });

    restAPI.addRoutes({
      path: "/orders",
      methods: [apigw.HttpMethod.GET],
      integration: getOrdersIntegration,
    });

    new CfnOutput(this, "DevStgUrl", {
      value: devStg.url,
    });
  }
}
