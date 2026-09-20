import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as path from 'path';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. DynamoDB Tables
    const trafficNodesTable = new dynamodb.Table(this, 'TrafficNodesTable', {
      partitionKey: { name: 'nodeId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // NOT for production!
    });

    const emergencyRoutesTable = new dynamodb.Table(this, 'EmergencyRoutesTable', {
      partitionKey: { name: 'routeId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 2. Lambda Functions
    const ingestionFunction = new lambdaNodejs.NodejsFunction(this, 'IngestionFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../src/ingestion.ts'),
      handler: 'handler',
      environment: {
        TRAFFIC_NODES_TABLE: trafficNodesTable.tableName,
      },
    });
    trafficNodesTable.grantReadWriteData(ingestionFunction);

    const routingFunction = new lambdaNodejs.NodejsFunction(this, 'RoutingFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../src/routing.ts'),
      handler: 'handler',
      environment: {
        TRAFFIC_NODES_TABLE: trafficNodesTable.tableName,
        EMERGENCY_ROUTES_TABLE: emergencyRoutesTable.tableName,
        EVENT_BUS_NAME: 'default',
      },
    });
    trafficNodesTable.grantReadData(routingFunction);
    emergencyRoutesTable.grantReadWriteData(routingFunction);

    // 3. EventBridge
    const eventBus = events.EventBus.fromEventBusName(this, 'DefaultEventBus', 'default');
    eventBus.grantPutEventsTo(routingFunction);

    const alertFunction = new lambdaNodejs.NodejsFunction(this, 'AlertFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '../src/alert.ts'),
      handler: 'handler',
    });

    // Rule to trigger alert on green corridor activation
    new events.Rule(this, 'GreenCorridorActivatedRule', {
      eventPattern: {
        source: ['trafficsense.emergency'],
        detailType: ['GreenCorridorActivated'],
      },
      targets: [new targets.LambdaFunction(alertFunction)],
    });

    // 4. API Gateway
    const api = new apigateway.RestApi(this, 'TrafficSenseApi', {
      restApiName: 'TrafficSense AI Service',
      description: 'API for traffic data ingestion and emergency routing.',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      }
    });

    const nodesResource = api.root.addResource('nodes');
    nodesResource.addMethod('POST', new apigateway.LambdaIntegration(ingestionFunction));

    const routesResource = api.root.addResource('routes');
    routesResource.addMethod('POST', new apigateway.LambdaIntegration(routingFunction));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway',
    });
  }
}
