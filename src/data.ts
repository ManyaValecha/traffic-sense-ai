import { HotspotJunction, PoliceStationLoad } from "./types";

export const CAUSES_BREAKDOWN = [
  { name: "Vehicle breakdown", count: 4896, color: "#f59e0b" }, // Amber-500
  { name: "Others", count: 638, color: "#64748b" }, // Slate-500
  { name: "Potholes", count: 537, color: "#3b82f6" }, // Blue-500
  { name: "Construction", count: 480, color: "#e36414" }, // Orange-500
  { name: "Water logging", count: 458, color: "#06b6d4" }, // Cyan-500
  { name: "Accident", count: 365, color: "#ef4444" }, // Red-500
  { name: "Tree fall", count: 284, color: "#10b981" }, // Emerald-500
  { name: "Road conditions", count: 170, color: "#8b5cf6" }, // Violet-500
];

export const ZONE_LOAD = [
  { name: "Central Zone 2", count: 623 },
  { name: "West Zone 1", count: 433 },
  { name: "North Zone 2", count: 413 },
  { name: "West Zone 2", count: 358 },
  { name: "South Zone 2", count: 354 },
  { name: "North Zone 1", count: 318 },
  { name: "East Zone 1", count: 253 },
  { name: "South Zone 1", count: 233 },
];

export const HOURLY_HEATMAP = [
  { hour: 0, events: 418 },
  { hour: 1, events: 381 },
  { hour: 2, events: 387 },
  { hour: 3, events: 372 },
  { hour: 4, events: 558 },
  { hour: 5, events: 661 },
  { hour: 6, events: 660 },
  { hour: 7, events: 480 },
  { hour: 8, events: 327 },
  { hour: 9, events: 160 },
  { hour: 10, events: 68 },
  { hour: 11, events: 68 },
  { hour: 12, events: 63 },
  { hour: 13, events: 33 },
  { hour: 14, events: 13 },
  { hour: 15, events: 9 },
  { hour: 16, events: 9 },
  { hour: 17, events: 34 },
  { hour: 18, events: 228 },
  { hour: 19, events: 578 },
  { hour: 20, events: 681 },
  { hour: 21, events: 810 },
  { hour: 22, events: 564 },
  { hour: 23, events: 495 },
];

export const HISTORICAL_BENCHMARKS = [
  { cause: "Public event", avgResolution: "110 min", highPriorityPercent: "58%", roadClosureRate: "22%", typicalZone: "Central Zone 2" },
  { cause: "Procession", avgResolution: "140 min", highPriorityPercent: "65%", roadClosureRate: "41%", typicalZone: "Central Zone 1" },
  { cause: "VIP movement", avgResolution: "45 min", highPriorityPercent: "95%", roadClosureRate: "80%", typicalZone: "All zones" },
  { cause: "Construction", avgResolution: "320 min", highPriorityPercent: "62%", roadClosureRate: "35%", typicalZone: "North Zone 2" },
  { cause: "Accident", avgResolution: "95 min", highPriorityPercent: "78%", roadClosureRate: "18%", typicalZone: "West Zone 1" },
  { cause: "Water logging", avgResolution: "280 min", highPriorityPercent: "55%", roadClosureRate: "12%", typicalZone: "West Zone 2" },
];

export const HOTSPOT_JUNCTIONS: HotspotJunction[] = [
  { id: 1, name: "Mekhri Circle", events: 64, severity: "Critical", coordinates: { x: 38, y: 32 }, description: "High volume junction connecting downtown and airport road. Subject to peak bottlenecks and water-logging." },
  { id: 2, name: "Ayyappa Temple Junction", events: 49, severity: "Critical", coordinates: { x: 48, y: 48 }, description: "Peak hour vehicle weaving and pedestrian crossings generate frequent minor side-swipes and transit delays." },
  { id: 3, name: "Satellite Bus Stand Junction", events: 43, severity: "High", coordinates: { x: 22, y: 62 }, description: "Heavy intercity bus inflow creates acute weaving conflicts, especially in late evening discharge hours." },
  { id: 4, name: "Yeshwanthpura Circle", events: 38, severity: "High", coordinates: { x: 25, y: 38 }, description: "Lies at the crossroads of industrial transport and central lines. Substantial utility load and breakdowns." },
  { id: 5, name: "Yelahanka Circle", events: 34, severity: "High", coordinates: { x: 42, y: 15 }, description: "Northern sub-hub with fast-rising local traffic. Frequent staging delays during VIP transits." },
  { id: 6, name: "Silk Board Junction", events: 33, severity: "High", coordinates: { x: 74, y: 78 }, description: "Historically notorious IT-corridor bottle-neck with extremely complex multi-phase spatial discharges." },
  { id: 7, name: "Toll Gate Mysore Road", events: 33, severity: "High", coordinates: { x: 20, y: 72 }, description: "Major exit arterial with recurring high-density bottlenecks during morning and weekend outbound peaks." },
  { id: 8, name: "Jalahalli Cross", events: 32, severity: "Medium", coordinates: { x: 18, y: 24 }, description: "Primarily industrial freight conflicts. Road condition incidents are active catalysts for congestion." },
  { id: 9, name: "Nagavara-ORR Junction", events: 32, severity: "Medium", coordinates: { x: 62, y: 28 }, description: "Subway and flyover work active zone. Peak hour water logging points cause spillover across several miles." },
  { id: 10, name: "K R Circle", events: 31, severity: "Medium", coordinates: { x: 44, y: 56 }, description: "Historic government administrative circular. VIP cavalcades trigger daily wave disruptions." },
];

export const POLICE_STATION_LOAD: PoliceStationLoad[] = [
  { name: "Yelahanka", loadValue: 377 },
  { name: "HAL Old Airport", loadValue: 361 },
  { name: "Sadashivanagar", loadValue: 302 },
  { name: "Byatarayanapura", loadValue: 297 },
  { name: "Halasuru Gate", loadValue: 297 },
  { name: "Yeshwanthpura", loadValue: 280 },
  { name: "Hennuru", loadValue: 276 },
  { name: "Kodigehalli", loadValue: 272 },
];
