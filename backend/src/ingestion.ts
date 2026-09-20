import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return { statusCode: 400, body: 'Missing body' };
    }

    const data = JSON.parse(event.body);
    const { nodeId, status, vehiclesCount } = data;

    if (!nodeId || !status) {
      return { statusCode: 400, body: 'Missing nodeId or status' };
    }

    const command = new PutCommand({
      TableName: process.env.TRAFFIC_NODES_TABLE,
      Item: {
        nodeId,
        status,
        vehiclesCount: vehiclesCount || 0,
        timestamp: new Date().toISOString(),
      },
    });

    await docClient.send(command);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ message: 'Node status updated', nodeId }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
