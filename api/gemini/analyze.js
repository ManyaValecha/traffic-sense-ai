export default async function handler(req, res) {
  const body = req.body || {};

  const scenario = body.scenario || body.description || body.emergency || body.prompt || "";
  const landmark = body.landmark || body.nearestLandmark || body.location || "Bengaluru Corridor";
  const timeWindow = body.timeWindow || body.time || "current window";
  const category = body.category || body.incidentCategory || "traffic incident";

  const input = `${scenario} ${landmark} ${category}`.toLowerCase();

  let data = {
    title: `${landmark} AI Mitigation Plan`,
    severity: "HIGH",
    severityReasoning: `${category} near ${landmark} during ${timeWindow} may trigger lane compression, queue spillback, and delayed emergency movement.`,
    estClearanceTime: 45,
    manpowerPlan: "6 traffic officers, 1 field supervisor, and 1 emergency support vehicle.",
    barricadeDetails: "Create a tapered lane-control buffer with reflective barricades placed before the incident zone.",
    primaryRoute: "Nearest main arterial diversion corridor.",
    secondaryRoute: "Parallel service road buffer bypass.",
    timeline: [
      "0–5 min: Alert control room and classify the incident as high priority.",
      "5–15 min: Deploy officers, barricades, and emergency support assets.",
      "15–30 min: Activate route diversions and public warning messages.",
      "30–45 min: Stabilize queue flow and reopen lanes gradually."
    ]
  };

  if (input.includes("construction") || input.includes("metro") || input.includes("nagavara")) {
    data = {
      title: "Nagavara-ORR Construction Block Mitigation Plan",
      severity: "CRITICAL",
      severityReasoning: "A single operational lane near Nagavara-ORR during Monday traffic can rapidly create merge conflicts, queue spillback toward ORR, and high bus/cab delay impact.",
      estClearanceTime: 70,
      manpowerPlan: "8 traffic officers, 1 BMRCL/site coordinator, 1 tow/crane standby unit, and 2 lane marshals.",
      barricadeDetails: "Place advance-warning barricades 300m before the work zone, create a tapered merge funnel, and separate the concrete-laying area as a hard safety buffer.",
      primaryRoute: "Thanisandra Main Road controlled diversion toward Hebbal service road.",
      secondaryRoute: "Hennur-Bagalur Road overflow bypass for non-local traffic.",
      timeline: [
        "0–5 min: Flag Nagavara-ORR as a critical construction bottleneck and alert traffic control.",
        "5–15 min: Deploy officers at entry merge points and coordinate with the metro/site team.",
        "15–30 min: Activate Thanisandra and Hebbal service-road diversions with signage.",
        "30–60 min: Maintain single-lane metering and prevent queue spillback into ORR.",
        "60–75 min: Clear construction spillover and reopen the restricted lane in phases."
      ]
    };
  }

  if (input.includes("water") || input.includes("rain") || input.includes("silk board")) {
    data = {
      title: "Silk Board Monsoon Flood Response Plan",
      severity: "CRITICAL",
      severityReasoning: "Waterlogging at Silk Board underpass can block lane movement, trap stalled vehicles, and trigger cascading congestion across peak-hour ORR and HSR approaches.",
      estClearanceTime: 45,
      manpowerPlan: "4 traffic officers, 1 tow vehicle, 1 drainage crew, and 1 emergency marshal.",
      barricadeDetails: "Seal flooded underpass entry, place barricades before the waterlogged approach, and create a forced U-turn diversion.",
      primaryRoute: "Outer Ring Road diversion through HSR-side access.",
      secondaryRoute: "BTM Layout and Hosur Road controlled bypass.",
      timeline: [
        "0–5 min: Mark underpass as unsafe and stop vehicles before water entry.",
        "5–15 min: Dispatch tow unit, drainage crew, and officers to both approaches.",
        "15–30 min: Divert vehicles through ORR, BTM Layout, and HSR-side routes.",
        "30–45 min: Remove stalled vehicle and reopen lanes only after water level drops."
      ]
    };
  }

  if (input.includes("vip") || input.includes("convoy") || input.includes("mekhri")) {
    data = {
      title: "Mekhri Circle VIP Convoy Control Plan",
      severity: "HIGH",
      severityReasoning: "VIP convoy movement intersecting with public procession traffic can cause security conflict, rolling roadblocks, and sudden queue accumulation.",
      estClearanceTime: 40,
      manpowerPlan: "10 traffic officers, 2 pilot vehicles, 1 rapid response unit, and 1 junction control supervisor.",
      barricadeDetails: "Use rolling barricades at junction arms with staggered public traffic release after convoy clearance.",
      primaryRoute: "Airport corridor green-wave priority route through Mekhri Circle.",
      secondaryRoute: "Palace Road and Hebbal buffer diversion for civilian traffic.",
      timeline: [
        "0–5 min: Freeze convoy corridor and notify junction control teams.",
        "5–15 min: Deploy pilot vehicles and restrict conflicting public movement.",
        "15–25 min: Move convoy through controlled green-wave corridor.",
        "25–40 min: Release civilian traffic in staggered phases to avoid surge."
      ]
    };
  }

  return res.status(200).json({
    success: true,
    data
  });
}
