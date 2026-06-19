export type EventType =
  | "Public event / festival"
  | "Political rally / procession"
  | "VIP movement"
  | "Construction activity"
  | "Vehicle breakdown"
  | "Accident"
  | "Water logging"
  | "Road conditions";

export type ZoneType =
  | "Central Zone 2"
  | "West Zone 1"
  | "North Zone 2"
  | "West Zone 2"
  | "South Zone 2"
  | "North Zone 1"
  | "East Zone 1"
  | "South Zone 1";

export type JunctionType =
  | "Mekhri Circle"
  | "Silk Board Junction"
  | "Yeshwanthpura Circle"
  | "K R Circle"
  | "Nagavara-ORR Junction"
  | "Town Hall Junction"
  | "Yelahanka Circle"
  | "Jalahalli Cross";

export interface PredictInput {
  eventType: EventType;
  zone: ZoneType;
  junction: JunctionType;
  startTime: string;
  roadClosure: boolean;
  priorityOverride: "Auto-detect" | "High" | "Low";
}

export interface PredictResult {
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  severityScore: number; // 0-100
  predictedResolutionMin: number;
  confidenceScore: number; // 0-100
  affectedJunctions: string[];
  recommendedOfficers: number;
  recommendedBarricades: number;
  primaryDiversion: string;
  secondaryDiversion: string;
}

export interface HotspotJunction {
  id: number;
  name: string;
  events: number;
  severity: "Critical" | "High" | "Medium";
  coordinates: { x: number; y: number }; // Percentage coords for interactive SVG map
  description: string;
}

export interface PoliceStationLoad {
  name: string;
  loadValue: number;
}
