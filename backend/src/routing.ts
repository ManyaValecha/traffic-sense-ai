import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const dbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(dbClient);
const ebClient = new EventBridgeClient({});

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: 'Missing body' };
    }

    const data = JSON.parse(event.body);
    const { routeId, startNode, endNode, priority } = data;

    if (!routeId || !startNode || !endNode) {
      return { statusCode: 400, body: 'Missing route details' };
    }

    // 1. Save the emergency route
    const putCommand = new PutCommand({
      TableName: process.env.EMERGENCY_ROUTES_TABLE,
      Item: {
        routeId,
        startNode,
        endNode,
        priority: priority || 'HIGH',
        status: 'ACTIVE',
        timestamp: new Date().toISOString(),
      },
    });
    await docClient.send(putCommand);

    // 2. Fetch all current traffic nodes (simplified route calculation)
    const scanCommand = new ScanCommand({
      TableName: process.env.TRAFFIC_NODES_TABLE,
    });
    const nodes = await docClient.send(scanCommand);
    
    // In a real scenario, we'd use SageMaker/Bedrock or a Graph algorithm here.
    // For the hackathon demo, we just trigger the event for the frontend to render the green corridor.

    // 3. Trigger GreenCorridorActivated event
    const eventCommand = new PutEventsCommand({
      Entries: [
        {
          Source: 'trafficsense.emergency',
          DetailType: 'GreenCorridorActivated',
          Detail: JSON.stringify({
            routeId,
            startNode,
            endNode,
            path: [startNode, 'node_mid_1', 'node_mid_2', endNode], // Mock calculated path
            timestamp: new Date().toISOString(),
          }),
          EventBusName: process.env.EVENT_BUS_NAME || 'default',
        },
      ],
    });
    await ebClient.send(eventCommand);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Emergency Route Activated', routeId }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
