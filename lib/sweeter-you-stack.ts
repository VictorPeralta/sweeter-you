import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as apigw from "@aws-cdk/aws-apigatewayv2";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { CfnOutput } from "@aws-cdk/core";
import { syLambdaFunction } from "./syFunction";
import { Bucket, HttpMethods } from "@aws-cdk/aws-s3";

export class SweeterYouStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //#region DynamoDB Table
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

    //#endregion

    //#region S3 Bucket
    const syBucket = new Bucket(this, "syBucket", {
      cors: [{ allowedMethods: [HttpMethods.GET, HttpMethods.PUT], allowedOrigins: ["*"], allowedHeaders: ["*"] }],
    });

    //#endregion

    //#region API Gateway
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

    //#endregion

    //#region Lambda Layer
    const helpersLayer = new lambda.LayerVersion(this, "SweeterYouLayer", {
      code: lambda.Code.fromAsset("src/sweeterYouLayer"),
      compatibleRuntimes: [lambda.Runtime.NODEJS_10_X],
    });

    //#endregion

    //#region S3 Functions
    const s3PutSignedUrlFunction = new syLambdaFunction(this, "syS3PutSignedUrlFunction", {
      functionId: "S3PutSignedUrlFunction",
      srcPath: "src/s3/putSignedUrl",
      env: { BUCKET_NAME: syBucket.bucketName },
    });

    syBucket.grantPut(s3PutSignedUrlFunction.function);

    //#region API Integration
    restAPI.addRoutes({
      path: "/putS3Url",
      integration: s3PutSignedUrlFunction.httpIntegration,
      methods: [apigw.HttpMethod.GET],
    });
    //#endregion

    //#endregion

    //#region Order Functions
    //#region  Functions
    const createOrderFunction = new lambda.Function(this, "CreateOrderFunction", {
      code: lambda.Code.fromAsset("src/orders/createOrderFunction"),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      layers: [helpersLayer],
      environment: { TABLE_NAME: sweeterYouTable.tableName },
    });

    const getOrdersFunction = new lambda.Function(this, "getOrdersFunction", {
      code: lambda.Code.fromAsset("src/orders/getOrdersFunction"),
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      layers: [helpersLayer],
      environment: { TABLE_NAME: sweeterYouTable.tableName },
    });

    //#endregion

    //#region Function Permissions

    sweeterYouTable.grantWriteData(createOrderFunction);
    sweeterYouTable.grantReadData(getOrdersFunction);

    //#endregion

    //#region  API integration
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

    //#endregion

    //#endregion

    //#region Product Functions
    //#region  Functions
    const createProductFunction = new syLambdaFunction(this, "syCreateProductFunction", {
      functionId: "CreateProductFunction",
      layers: [helpersLayer],
      srcPath: "src/products/createProductFunction",
      tableName: sweeterYouTable.tableName,
    });

    const getProductsFunction = new syLambdaFunction(this, "syGetProductsFunction", {
      functionId: "GetProductsFunction",
      layers: [helpersLayer],
      srcPath: "src/products/getProductsFunction",
      tableName: sweeterYouTable.tableName,
    });

    const editProductFunction = new syLambdaFunction(this, "syEditProductFunction", {
      functionId: "EditProductFunction",
      layers: [helpersLayer],
      srcPath: "src/products/editProductFunction",
      tableName: sweeterYouTable.tableName,
    });

    //#endregion

    //#region Function Permissions

    sweeterYouTable.grantWriteData(createProductFunction.function);
    sweeterYouTable.grantReadData(getProductsFunction.function);
    sweeterYouTable.grantWriteData(editProductFunction.function);
    //#endregion

    //#region  API integration
    restAPI.addRoutes({
      path: "/products",
      methods: [apigw.HttpMethod.POST],
      integration: createProductFunction.httpIntegration,
    });

    restAPI.addRoutes({
      integration: getProductsFunction.httpIntegration,
      methods: [apigw.HttpMethod.GET],
      path: "/products",
    });

    restAPI.addRoutes({
      integration: editProductFunction.httpIntegration,
      methods: [apigw.HttpMethod.PUT],
      path: "/products/{productId}",
    });

    //#endregion

    //#endregion

    //#region Outputs
    new CfnOutput(this, "DevStgUrl", {
      value: devStg.url,
    });
    //#endregion
  }
}
