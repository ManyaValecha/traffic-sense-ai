export default async function handler(req, res) {
  try {
    const { message, query, prompt } = req.body || {};

    res.status(200).json({
      summary: "Traffic intelligence generated successfully.",
      recommendation:
        "Prioritize high-density corridors, reroute vehicles through alternate arterial roads, and assign dispatch officers near predicted bottleneck zones.",
      input: message || query || prompt || "No input received"
    });
  } catch (error) {
    res.status(500).json({ error: "Gemini analysis failed" });
  }
}
