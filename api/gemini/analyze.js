export default async function handler(req, res) {
  return res.status(200).json({
    success: true,
    data: {
      title: "Silk Board Monsoon Mitigation Plan",
      priority: "CRITICAL",
      confidence: 91,
      summary: "Immediate waterlogging containment, broken vehicle removal, lane diversion, and peak-hour dispatch control required.",
      timeline: [
        "0–5 min: Alert Bengaluru traffic control room and flag Silk Board underpass as high-risk.",
        "5–15 min: Dispatch tow unit, drainage crew, and 4 traffic officers.",
        "15–30 min: Divert traffic toward Outer Ring Road, BTM Layout, and HSR Layout.",
        "30–45 min: Remove stalled vehicle and reopen lanes gradually."
      ],
      assets: [
        "4 traffic officers",
        "1 tow vehicle",
        "1 drainage response team",
        "2 barricade units",
        "Variable message sign alerts"
      ],
      routes: [
        "Outer Ring Road diversion",
        "BTM Layout alternate corridor",
        "HSR Layout controlled bypass"
      ],
      eta: "30–45 minutes"
    }
  });
}
