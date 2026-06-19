export default async function handler(req, res) {
  const body = req.body || {};

  const scenario =
    body.scenario ||
    body.description ||
    body.emergency ||
    body.prompt ||
    body.incident ||
    "Traffic emergency";

  const landmark =
    body.landmark ||
    body.nearestLandmark ||
    body.location ||
    "selected Bengaluru corridor";

  const timeWindow =
    body.timeWindow ||
    body.time ||
    "current operating window";

  const category =
    body.category ||
    body.incidentCategory ||
    "traffic incident";

  const isConstruction = String(category).toLowerCase().includes("construction") || String(scenario).toLowerCase().includes("metro");
  const isWater = String(category).toLowerCase().includes("water") || String(scenario).toLowerCase().includes("water");
  const isVip = String(category).toLowerCase().includes("vip") || String(scenario).toLowerCase().includes("convoy");

  let title = `${landmark} Operational Mitigation Plan`;
  let manpower = "6 traffic officers + 1 field supervisor";
  let barricading = "Create tapered lane closure with reflective cones and advance warning boards.";
  let primaryRoute = "Outer Ring Road controlled diversion";
  let secondaryRoute = "Nearest arterial road buffer bypass";
  let sla = "45–60";

  if (isConstruction) {
    title = `${landmark} Construction Block Mitigation Plan`;
    manpower = "8 traffic officers, 1 BBMP/BMRCL coordinator, 1 tow/crane standby unit";
    barricading = "Convert the blocked lane into a hard safety buffer; place barricades 300m before the work zone.";
    primaryRoute = "Divert through Thanisandra Main Road and Hebbal service road";
    secondaryRoute = "Use Hennur-Bagalur Road as overflow bypass";
    sla = "60–75";
  }

  if (isWater) {
    title = `${landmark} Monsoon Flood Response Plan`;
    manpower = "4 traffic officers, 1 drainage crew, 1 tow vehicle, 1 emergency marshal";
    barricading = "Seal flooded underpass entry and create U-turn diversion before waterlogged approach.";
    primaryRoute = "Outer Ring Road diversion";
    secondaryRoute = "BTM Layout and HSR Layout controlled bypass";
    sla = "30–45";
  }

  if (isVip) {
    title = `${landmark} VIP Convoy Movement Control Plan`;
    manpower = "10 traffic officers, 2 pilot vehicles, 1 rapid response team";
    barricading = "Temporary rolling barricade with staggered release at junction arms.";
    primaryRoute = "Airport corridor priority green-wave route";
    secondaryRoute = "Mekhri Circle buffer diversion";
    sla = "25–40";
  }

  return res.status(200).json({
    success: true,
    data: {
      title,
      severityReasoning: `${category} at ${landmark} during ${timeWindow} can trigger queue spillback, lane compression, and secondary congestion. Immediate containment is required.`,
      slaClearanceWindow: sla,
      manpowerAllocation: manpower,
      barricadingLayout: barricading,
      primaryCorridorLink: primaryRoute,
      secondaryBufferBypass: secondaryRoute,
      chronologicalDeployment: [
        "0–5 min: Notify control room and mark incident as high-priority.",
        "5–15 min: Deploy officers, barricades, and field response assets.",
        "15–30 min: Activate diversion routing and public warning messages.",
        "30–60 min: Stabilize queue, clear obstruction, and reopen lanes gradually."
      ],
      priority: isVip ? "HIGH SECURITY" : "CRITICAL",
      confidence: 92
    }
  });
}
