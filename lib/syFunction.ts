import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export interface syFunctionProps {
  srcPath: string;
  layers: lambda.ILayerVersion[];
  functionId: string;
  tableName?: string;
}

export class syLambdaFunction extends cdk.Construct {
  public readonly function: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: syFunctionProps) {
    super(scope, id);

    this.function = new lambda.Function(this, props.functionId, {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(props.srcPath),
      environment: {
        TABLE_NAME: props.tableName ?? "",
      },
      memorySize: 1024,
      layers: props.layers,
    });
  }
}
