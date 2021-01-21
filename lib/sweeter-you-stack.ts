import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";

export class SweeterYouStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

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
