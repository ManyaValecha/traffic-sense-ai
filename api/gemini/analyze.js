export default async function handler(req, res) {
  try {
    res.status(200).json({
      success: true,
      plan: {
        title: "AI Dispatch Action Plan",
        summary: "TrafficSense AI recommends immediate rerouting, officer redeployment, and congestion monitoring for the selected Bengaluru corridor.",
        priority: "High",
        actions: [
          "Deploy 4 officers near the predicted bottleneck zone.",
          "Activate diversion messaging toward Outer Ring Road.",
          "Monitor Silk Board and KR Puram corridors for the next 30 minutes.",
          "Prioritize emergency-lane clearance and breakdown response."
        ],
        eta: "30–45 minutes",
        confidence: "91%"
      },
      text: `AI Dispatch Action Plan

Priority: High

1. Deploy 4 officers near the predicted bottleneck zone.
2. Activate diversion messaging toward Outer Ring Road.
3. Monitor Silk Board and KR Puram corridors for the next 30 minutes.
4. Prioritize emergency-lane clearance and breakdown response.

Estimated recovery window: 30–45 minutes.
Confidence: 91%.`,
      timestamp: new Date().toISOString(),
      isFallback: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate dispatch plan."
    });
  }
}
