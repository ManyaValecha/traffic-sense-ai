export const handler = async (event: any): Promise<void> => {
  console.log('EventBridge Triggered Alert Function');
  console.log('Received Event:', JSON.stringify(event, null, 2));

  // In a real application, this function would:
  // 1. Send an SMS via Amazon SNS to commuters in the area
  // 2. Push a WebSocket notification to connected clients to update their map
  // 3. Or trigger a third-party API (e.g. city traffic lights control)

  const detail = event.detail;
  console.log(`Green Corridor activated for route: ${detail.routeId}`);
  console.log(`Path: ${detail.path.join(' -> ')}`);
};
