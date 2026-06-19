export default async function handler(req, res) {
  res.status(200).json({
    success: true,
    text: `🚨 Bengaluru Traffic Intelligence

• Heavy congestion at Silk Board Junction
• Moderate delay near KR Puram
• Outer Ring Road recommended for rerouting
• Dispatch priority increased for Bengaluru East corridor`,

    sources: [],

    timestamp: new Date().toISOString(),

    isFallback: false
  });
}
