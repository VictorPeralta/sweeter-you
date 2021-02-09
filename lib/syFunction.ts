import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { LambdaProxyIntegration } from "@aws-cdk/aws-apigatewayv2-integrations";
import { PayloadFormatVersion } from "@aws-cdk/aws-apigatewayv2";

export interface syFunctionProps {
  srcPath: string;
  layers?: lambda.ILayerVersion[];
  functionId: string;
  tableName?: string;
  env?: Record<string, unknown>;
}

export class syLambdaFunction extends cdk.Construct {
  public readonly function: lambda.Function;
  public readonly httpIntegration: LambdaProxyIntegration;

  constructor(scope: cdk.Construct, id: string, props: syFunctionProps) {
    super(scope, id);

    this.function = new lambda.Function(this, props.functionId, {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(props.srcPath),
      environment: {
        TABLE_NAME: props.tableName ?? "",
        ...props.env,
      },
      memorySize: 1024,
      layers: props.layers,
    });

    this.httpIntegration = new LambdaProxyIntegration({
      handler: this.function,
      payloadFormatVersion: PayloadFormatVersion.VERSION_2_0,
    });
  }
}
