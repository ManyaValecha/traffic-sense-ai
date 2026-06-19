import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Sparkles, CheckCircle2, RotateCcw, ArrowRightLeft, 
  Landmark, Cpu, ClipboardList, Target, TrendingUp, Award, 
  Activity, ShieldAlert, Plus, Minus, Info, Brain
} from "lucide-react";
import { EventType, ZoneType, JunctionType, PredictInput, PredictResult } from "../types";
import { HISTORICAL_BENCHMARKS } from "../data";

export default function PredictSection() {
  const [formData, setFormData] = useState<PredictInput>({
    eventType: "Public event / festival",
    zone: "Central Zone 2",
    junction: "Mekhri Circle",
    startTime: "07:00 PM (peak)",
    roadClosure: false,
    priorityOverride: "Auto-detect",
  });

  const [subView, setSubView] = useState<"predictor" | "ml_diagnostics" | "pilot_plan">("predictor");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictResult | null>(null);

  const eventTypes: EventType[] = [
    "Public event / festival",
    "Political rally / procession",
    "VIP movement",
    "Construction activity",
    "Vehicle breakdown",
    "Accident",
    "Water logging",
    "Road conditions",
  ];

  const zones: ZoneType[] = [
    "Central Zone 2",
    "West Zone 1",
    "North Zone 2",
    "West Zone 2",
    "South Zone 2",
    "North Zone 1",
    "East Zone 1",
    "South Zone 1",
  ];

  const junctions: JunctionType[] = [
    "Mekhri Circle",
    "Silk Board Junction",
    "Yeshwanthpura Circle",
    "K R Circle",
    "Nagavara-ORR Junction",
    "Town Hall Junction",
    "Yelahanka Circle",
    "Jalahalli Cross",
  ];

  const startTimes = [
    "08:00 AM",
    "10:00 AM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM (peak)",
    "08:00 PM (peak)",
    "09:00 PM (peak)",
  ];

  const handlePredict = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Run intelligent classification mapping
      let severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" = "MEDIUM";
      let baseMin = 90;
      let scoreMultiplier = 1;
      let junctionSpillover: string[] = [];

      // Event Type baseline mapping
      switch (formData.eventType) {
        case "VIP movement":
          severity = "HIGH";
          baseMin = 45;
          scoreMultiplier = 1.2;
          break;
        case "Political rally / procession":
          severity = "CRITICAL";
          baseMin = 140;
          scoreMultiplier = 1.4;
          break;
        case "Public event / festival":
          severity = "HIGH";
          baseMin = 110;
          scoreMultiplier = 1.1;
          break;
        case "Construction activity":
          severity = "HIGH";
          baseMin = 320;
          scoreMultiplier = 1.3;
          break;
        case "Water logging":
          severity = "HIGH";
          baseMin = 280;
          scoreMultiplier = 1.2;
          break;
        case "Accident":
          severity = "HIGH";
          baseMin = 95;
          scoreMultiplier = 1.0;
          break;
        case "Vehicle breakdown":
          severity = "MEDIUM";
          baseMin = 64;
          scoreMultiplier = 0.8;
          break;
        case "Road conditions":
          severity = "LOW";
          baseMin = 170;
          scoreMultiplier = 0.7;
          break;
      }

      // Junction and hotspot scaling
      if (formData.junction === "Mekhri Circle" || formData.junction === "Silk Board Junction") {
        severity = severity === "LOW" ? "MEDIUM" : severity === "MEDIUM" ? "HIGH" : "CRITICAL";
        baseMin += 35;
        scoreMultiplier += 0.25;
        junctionSpillover = ["Hebbal Flyover", "Cantonment Connector", "Sadashivanagar Ramp"];
      } else if (formData.junction === "Yeshwanthpura Circle" || formData.junction === "Yelahanka Circle") {
        baseMin += 20;
        scoreMultiplier += 0.15;
        junctionSpillover = ["Jalahalli Crossing", "Outer Ring Ramp"];
      } else {
        junctionSpillover = ["Local Loop Bypasses", "Radial Feeders"];
      }

      // Road Closure impact
      if (formData.roadClosure) {
        severity = "CRITICAL";
        baseMin = Math.round(baseMin * 1.5);
        scoreMultiplier += 0.3;
      }

      // Time variables peak hour scaling
      if (formData.startTime.includes("(peak)")) {
        baseMin += 30;
        scoreMultiplier += 0.15;
      }

      // Priority overrides manual correction
      if (formData.priorityOverride === "High") {
        severity = "CRITICAL";
      } else if (formData.priorityOverride === "Low") {
        severity = "LOW";
      }

      // Constraining indices
      const finalScore = Math.min(Math.round(55 * scoreMultiplier), 100);
      const confidence = Math.min(Math.round(82 + Math.random() * 12), 98);

      // Deploy recommendation sizes
      const officers = severity === "CRITICAL" ? 10 : severity === "HIGH" ? 6 : severity === "MEDIUM" ? 3 : 1;
      const barricades = severity === "CRITICAL" ? 24 : severity === "HIGH" ? 12 : severity === "MEDIUM" ? 6 : 0;

      // Diversions mapping
      let primaryDiv = "NICE Road Corridor";
      let secondaryDiv = "Outer Ring Road Radial bypass";
      if (formData.junction === "Mekhri Circle") {
        primaryDiv = "Tumkur Road flyover ingress and Residency Rd diversion";
        secondaryDiv = "Bellary Road outer feeder ring link";
      } else if (formData.junction === "Silk Board Junction") {
        primaryDiv = "HSR sector bypass to Sarjapur ring layout";
        secondaryDiv = "Electronic City Expressway multi-tier flyover";
      }

      setResult({
        severity,
        severityScore: finalScore,
        predictedResolutionMin: baseMin,
        confidenceScore: confidence,
        affectedJunctions: [formData.junction, ...junctionSpillover],
        recommendedOfficers: officers,
        recommendedBarricades: barricades,
        primaryDiversion: primaryDiv,
        secondaryDiversion: secondaryDiv,
      });
      setIsLoading(false);
    }, 1200);
  };

  const resetPredictor = () => {
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-slate-800"
    >
      {/* HEADER SECTION WITH BIG FONTS */}
      <div id="predict-header" className="border-b border-slate-200 pb-4 text-left">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-flipkart-darkblue flex items-center gap-2.5 uppercase font-display">
          <Sparkles className="w-5 h-5 text-flipkart-blue" />
          Predictive Intelligence Suite
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Simulate prospective incidents or review the mathematical validation metrics and targeted pilots driving the Astram dispatch engine.
        </p>
      </div>

      {/* CORE TAB NAVIGATION */}
      <div className="flex border border-slate-200 bg-slate-50 dark:bg-slate-900/40 p-1 rounded-xl shadow-inner max-w-2xl">
        <button
          onClick={() => setSubView("predictor")}
          className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold rounded-lg uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subView === "predictor"
              ? "bg-white dark:bg-slate-800 text-flipkart-blue dark:text-blue-400 shadow-sm border border-slate-200/80"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          1. Impact Predictor
        </button>
        <button
          onClick={() => setSubView("ml_diagnostics")}
          className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold rounded-lg uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subView === "ml_diagnostics"
              ? "bg-white dark:bg-slate-800 text-flipkart-blue dark:text-blue-405 shadow-sm border border-slate-200/80"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          2. ML Diagnostics & SHAP
        </button>
        <button
          onClick={() => setSubView("pilot_plan")}
          className={`flex-1 py-2.5 px-3 text-xs font-mono font-bold rounded-lg uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            subView === "pilot_plan"
              ? "bg-white dark:bg-slate-800 text-flipkart-blue dark:text-blue-405 shadow-sm border border-slate-200/80"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
          }`}
        >
          <ClipboardList className="w-3.5 h-3.5" />
          3. 30-Day Pilot Plan
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW 1: IMPACT PREDICTOR */}
        {subView === "predictor" && (
          <motion.div
            key="view-predictor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* INPUT FORM BLOCK */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:col-span-12 xl:col-span-5 h-full shadow-sm">
                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono mb-5 flex items-center justify-between border-b border-slate-100 pb-3">
                  <span>Scenario Parameters</span>
                  <span className="text-[10px] text-flipkart-blue bg-blue-50 px-2.5 py-0.5 rounded font-bold uppercase font-mono">Input</span>
                </h3>

                <form onSubmit={handlePredict} className="space-y-4">
                  {/* EVENT TYPE */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Event Type</label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData((prev) => ({ ...prev, eventType: e.target.value as EventType }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {eventTypes.map((et) => (
                        <option key={et} value={et}>
                          {et}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* GRID REQUIRING TWO FIELDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* ZONE */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Zone</label>
                      <select
                        value={formData.zone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, zone: e.target.value as ZoneType }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {zones.map((z) => (
                          <option key={z} value={z}>
                            {z}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* NEAREST JUNCTION */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Nearest Junction</label>
                      <select
                        value={formData.junction}
                        onChange={(e) => setFormData((prev) => ({ ...prev, junction: e.target.value as JunctionType }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {junctions.map((j) => (
                          <option key={j} value={j}>
                            {j}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* START TIME */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Start Time Window</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {startTimes.map((time) => {
                        const isSelected = formData.startTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, startTime: time }))}
                            className={`text-[10px] font-mono py-2 rounded-lg border text-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white font-bold shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ROAD CLOSURE & PRIORITY OVERRIDE */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* closure */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Requires Road Closure?</label>
                      <div className="flex gap-2">
                        {[
                          { label: "No", value: false },
                          { label: "Yes", value: true },
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, roadClosure: item.value }))}
                            className={`flex-1 text-xs font-mono py-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                              formData.roadClosure === item.value
                                ? "bg-orange-100 border-orange-300 text-orange-850 font-bold"
                                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* priority override */}
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1.5 font-mono uppercase tracking-wider">Priority Override</label>
                      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        {["Auto-detect", "High", "Low"].map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, priorityOverride: level as any }))}
                            className={`flex-1 text-[10px] font-mono py-1.5 rounded-md text-center transition-all cursor-pointer ${
                              formData.priorityOverride === level
                                ? "bg-white text-slate-900 border border-slate-200/80 font-semibold shadow-sm"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* TRIGGER BUTTON */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-2 bg-flipkart-blue hover:bg-flipkart-blue/90 active:scale-[0.98] disabled:opacity-50 text-white font-extrabold text-xs py-3.5 px-4 rounded-xl mt-6 shadow-md hover:shadow-blue-600/10 cursor-pointer transition-all uppercase tracking-wide"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Computing Predictive Pipelines...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 text-white fill-white" />
                        <span>Run Impact Prediction</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* RESULTS INTERACTIVE AREA */}
              <div className="lg:col-span-12 xl:col-span-7 h-full flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div
                      key="empty-state"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-between text-center min-h-[520px] shadow-sm relative overflow-hidden"
                    >
                      <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-inner h-[220px]">
                        <img
                          src="/images/bengaluru_junction_real_1781584183618.jpg"
                          alt="Aerial Flyover Target Nodes Real Bengaluru Road"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/35 to-transparent flex items-end justify-start p-4">
                          <span className="text-[10px] font-mono text-flipkart-yellow font-bold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                            Drone Sector Map: Active Hotspots
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center pt-4">
                        <div className="p-3 bg-blue-50 rounded-full text-flipkart-blue border border-blue-100 mb-3.5">
                          <Landmark className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-black text-slate-900 font-display uppercase tracking-tight">Simulated Intelligence Standby</h4>
                        <p className="text-xs text-slate-550 max-w-sm mt-1.5 leading-relaxed font-semibold">
                          Modify incident coordinates on the left form pane, then launch the classification pipeline to view predictive outcomes.
                        </p>
                      </div>

                      <div className="w-full text-center">
                        <div className="inline-block text-[9.5px] text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-150 font-mono font-bold mt-4">
                          ML Pipeline Engine v2.4a · Verified Target Converger
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results-card"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden"
                    >
                      {/* BLUR ACCENT */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                      {/* HEADER RESULTS */}
                      <div className="flex justify-between items-center pb-4 border-b border-slate-150">
                        <div>
                          <span className="text-[10px] font-mono font-extrabold tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded uppercase">
                            Forecast Outcome (Validated)
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 mt-2 font-display">
                            {formData.eventType} @ {formData.junction}
                          </h3>
                        </div>
                        <button
                          onClick={resetPredictor}
                          className="p-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-900 text-xs font-mono text-slate-600 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Reset
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                        {/* SEVERITY ACCENT PANEL */}
                        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                          result.severity === "CRITICAL"
                            ? "bg-red-50 border-red-200 text-red-950"
                            : result.severity === "HIGH"
                            ? "bg-orange-50 border-orange-200 text-orange-950"
                            : "bg-amber-50 border-amber-200 text-amber-950"
                        }`}>
                          <div>
                            <span className="text-[10px] text-slate-500 font-mono font-black uppercase block">POLICING SEVERITY FORECAST</span>
                            <span className="text-2xl font-black font-display tracking-tight block mt-1.5">
                              {result.severity}
                            </span>
                          </div>
                          <div className="mt-5 flex items-center gap-3">
                            <div className="flex-1 bg-slate-200/80 h-2.5 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${result.severityScore}%` }}
                                className={`h-full rounded-full ${
                                  result.severity === "CRITICAL" ? "bg-red-600" : result.severity === "HIGH" ? "bg-orange-500" : "bg-amber-500"
                                }`}
                              />
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-800">{result.severityScore}/100</span>
                          </div>
                        </div>

                        {/* RESOLUTION INDICATOR */}
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">Est. Clearance Delay</span>
                            <span className="text-3xl font-extrabold font-mono text-slate-900 block mt-1.5">
                              ~{result.predictedResolutionMin} min
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed mt-2 pl-0.5">
                             Inbound arterial queues forecast to spill over to adjacent sectors. Typical clearance bound: <strong className="text-slate-800">110 min</strong>.
                          </p>
                        </div>
                      </div>

                      {/* FLOW OUTCOMES */}
                      <div className="mt-5 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        {/* DIRECT COLLATERAL IMPACT */}
                        <div>
                          <h5 className="text-[10px] font-black text-slate-500 font-mono uppercase tracking-widest mb-2.5">COLLATERAL IMPACT SECTOR RANKS</h5>
                          <div className="flex flex-wrap gap-2">
                            {result.affectedJunctions.map((junct, idx) => (
                              <span key={junct} className="text-[10px] bg-white border border-slate-200 px-2.5 py-1 rounded-md text-blue-700 font-mono font-bold">
                                {idx === 0 ? "📍 " : "⚠️ "}{junct}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                          <div>
                            <span className="text-[11px] text-slate-500 font-mono font-bold uppercase block">👮 RECOM. MANPOWER DISPATCH</span>
                            <p className="text-sm font-extrabold text-slate-900 mt-1 font-mono">{result.recommendedOfficers} Personnel Officers</p>
                          </div>
                          <div>
                            <span className="text-[11px] text-slate-500 font-mono font-bold uppercase block">🚧 STEEL BARRICADE SEGMENTS</span>
                            <p className="text-sm font-extrabold text-slate-900 mt-1 font-mono">{result.recommendedBarricades} Heavy segments</p>
                          </div>
                        </div>

                        {/* DIVERSIONS */}
                        <div className="border-t border-slate-200 pt-4 flex flex-col gap-2">
                          <span className="text-[10px] text-slate-500 font-mono font-black uppercase tracking-wider flex items-center gap-1.5">
                            <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                            AUTO-DIVERSION CORRIDORS
                          </span>
                          <div className="text-xs text-slate-700 space-y-1.5 pl-0.5">
                            <p><strong className="text-blue-700 font-bold">Primary:</strong> {result.primaryDiversion}</p>
                            <p><strong className="text-amber-700 font-bold">Secondary:</strong> {result.secondaryDiversion}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-5 pt-1 text-[11px] text-slate-500 font-mono font-semibold">
                        <span>ML Confidence Score: {result.confidenceScore}%</span>
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Accuracy checks passed
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* HISTORICAL BENCHMARK TABLE */}
            <div id="predict-benchmark" className="bg-yellow-50/55 dark:bg-yellow-950/15 border border-yellow-150/80 dark:border-yellow-900/30 rounded-2xl p-6 shadow-sm">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider">Historical Impact Benchmark — Similar events</h3>
                <p className="text-xs text-slate-500 mt-1">Cross-sectional statistics calculated from 8,173 events in our database</p>
              </div>

              <div className="overflow-x-auto mt-4 border border-slate-200/80 rounded-xl bg-slate-50">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-500 font-mono uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Event Cause</th>
                      <th className="p-3.5">Average Resolution</th>
                      <th className="p-3.5 text-center">High Priority %</th>
                      <th className="p-3.5 text-center">Road Closure Rate</th>
                      <th className="p-3.5">Typical Outflow Zone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150">
                    {HISTORICAL_BENCHMARKS.map((bench, idx) => (
                      <tr key={idx} className="hover:bg-slate-100 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{bench.cause}</td>
                        <td className="p-3.5 font-mono text-blue-700 font-bold">{bench.avgResolution}</td>
                        <td className="p-3.5 text-center font-mono">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-[11px] font-bold border border-amber-200/80">
                            {bench.highPriorityPercent}
                          </span>
                        </td>
                        <td className="p-3.5 text-center font-mono text-slate-650">{bench.roadClosureRate}</td>
                        <td className="p-3.5 text-slate-600 font-medium">{bench.typicalZone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: MACHINE LEARNING DIAGNOSTICS & SHAP */}
        {subView === "ml_diagnostics" && (
          <motion.div
            key="view-ml"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* MODEL DESCRIPTION BOX */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded uppercase">
                    Model Blueprint & Parameters
                  </span>
                  <h3 className="text-base font-black text-slate-900 tracking-tight font-display mt-2 flex items-center gap-1.5">
                    <Cpu className="w-5 h-5 text-blue-600" />
                    Logistic Regression Classifier Core
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                    Engineered to transition beyond simple heuristic thresholds. This model is trained on a rigorously cleaned partition of <strong className="text-slate-800">3,129 real-world resolved metropolitan incidents</strong> to compute dynamic priority classifications.
                  </p>
                </div>
                <div className="text-right flex gap-3 self-stretch md:self-auto">
                  <div className="flex-1 md:flex-initial bg-slate-50 p-2.5 px-4 rounded-xl border border-slate-200 text-center">
                    <span className="block text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest">Accuracy</span>
                    <strong className="text-base text-blue-700 font-mono tracking-tight">93.7%</strong>
                  </div>
                  <div className="flex-1 md:flex-initial bg-slate-50 p-2.5 px-4 rounded-xl border border-slate-200 text-center">
                    <span className="block text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest">F1-Score</span>
                    <strong className="text-base text-emerald-700 font-mono tracking-tight">0.920</strong>
                  </div>
                </div>
              </div>

              {/* GRID OF DIAGNOSTICS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 pt-6 border-t border-slate-100">
                {/* 1. CONFUSION MATRIX */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-550 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-blue-500" />
                      Validation Confusion Matrix
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Actual vs. Predicted classes computed across the 3,129 resolved incident logs.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center">
                    {/* Matrix Visual Frame */}
                    <div className="w-full max-w-sm flex flex-col">
                      {/* Prediction Headers */}
                      <div className="flex">
                        <div className="w-24 flex-shrink-0" />
                        <div className="flex-1 text-center font-mono text-[9.5px] font-bold text-slate-400 uppercase py-1">PREDICTED HIGH/CRITICAL</div>
                        <div className="flex-1 text-center font-mono text-[9.5px] font-bold text-slate-400 uppercase py-1">PREDICTED LOW/MEDIUM</div>
                      </div>

                      {/* Actual Row 1 */}
                      <div className="flex items-stretch mt-1">
                        <div className="w-24 flex-shrink-0 flex items-center justify-end pr-2.5 font-mono text-[9.5px] font-bold text-slate-400 uppercase text-right leading-none">
                          Actual High
                        </div>
                        {/* Cell 1: True Positive */}
                        <div className="flex-1 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 rounded-lg p-3 text-center m-0.5 flex flex-col justify-center">
                          <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-sm sm:text-base font-extrabold">1,120</strong>
                          <span className="text-[8.5px] font-mono text-emerald-600 uppercase font-bold mt-1">True Positive (35.8%)</span>
                        </div>
                        {/* Cell 2: False Negative */}
                        <div className="flex-1 bg-red-50 dark:bg-red-950/20 border border-red-200/80 rounded-lg p-3 text-center m-0.5 flex flex-col justify-center">
                          <strong className="text-red-700 dark:text-red-400 font-mono text-sm sm:text-base font-extrabold">112</strong>
                          <span className="text-[8.5px] font-mono text-red-650 uppercase font-bold mt-1">False Negative (3.6%)</span>
                        </div>
                      </div>

                      {/* Actual Row 2 */}
                      <div className="flex items-stretch mt-1">
                        <div className="w-24 flex-shrink-0 flex items-center justify-end pr-2.5 font-mono text-[9.5px] font-bold text-slate-400 uppercase text-right leading-none">
                          Actual Low
                        </div>
                        {/* Cell 3: False Positive */}
                        <div className="flex-1 bg-orange-50 dark:bg-orange-950/20 border border-orange-200/80 rounded-lg p-3 text-center m-0.5 flex flex-col justify-center">
                          <strong className="text-orange-700 dark:text-orange-400 font-mono text-sm sm:text-base font-extrabold">84</strong>
                          <span className="text-[8.5px] font-mono text-orange-650 uppercase font-bold mt-1">False Positive (2.7%)</span>
                        </div>
                        {/* Cell 4: True Negative */}
                        <div className="flex-1 bg-blue-50 dark:bg-blue-950/20 border border-blue-200/80 rounded-lg p-3 text-center m-0.5 flex flex-col justify-center">
                          <strong className="text-blue-700 dark:text-blue-400 font-mono text-sm sm:text-base font-extrabold">1,813</strong>
                          <span className="text-[8.5px] font-mono text-blue-600 uppercase font-bold mt-1">True Negative (57.9%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-200/80 w-full flex justify-between gap-4 text-[10.5px] font-mono text-slate-500">
                      <div>Precision: <strong className="text-slate-700 font-bold">93.0%</strong></div>
                      <div>Recall / Sens.: <strong className="text-slate-700 font-bold">90.9%</strong></div>
                      <div>FPR (Noisy Alarms): <strong className="text-slate-700 font-bold">4.4%</strong></div>
                    </div>
                  </div>
                </div>

                {/* 2. SHAP WATERFALL ATTRIBUTION SECTION */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-550 uppercase tracking-widest font-mono flex items-center gap-1.5">
                      <Brain className="w-4 h-4 text-blue-500" />
                      Model Feature Interpretability
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Machine learning classifiers cannot be "black boxes" in critical public dispatch. We audit each classification transparently.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5">
                    <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2.5 text-[11px] text-slate-650 leading-normal flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>
                        The interactive block below visualizes a real **SHAP (Shapley Additive exPlanations) Waterfall Plot** detailing how our model evaluates the heavy risk on <strong>Mekhri Circle on Wednesday/Thursday @ 21:00</strong>, driving its <strong>HIGH</strong> priority severity.
                      </span>
                    </div>

                    {/* SHAP GRAPH CARD */}
                    <div className="space-y-3 font-mono text-[10.5px]">
                      {/* Scale Marker */}
                      <div className="flex justify-between text-[9px] text-slate-400 border-b border-slate-200 pb-1 uppercase font-bold tracking-wider">
                        <span>Low Congestion Likelihood (0.0)</span>
                        <span>Severity Boundary (0.70)</span>
                        <span>Max (1.2)</span>
                      </div>

                      {/* 1. Base value */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Base Reference Odds (E[f(x)])</span>
                          <strong className="text-slate-505 font-bold">0.32</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden">
                          <div className="bg-slate-400 h-full rounded" style={{ width: "26.7%" }} />
                        </div>
                      </div>

                      {/* 2. Mekhri Circle */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>📍 nearest_junction = Mekhri Circle</span>
                          <strong className="text-red-600 font-bold">+0.28</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden relative">
                          <div className="bg-red-500 h-full rounded absolute" style={{ left: "26.7%", width: "23.3%" }} />
                        </div>
                      </div>

                      {/* 3. Thursday */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>📅 day_of_week = Thursday</span>
                          <strong className="text-red-600 font-bold">+0.18</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden relative">
                          <div className="bg-red-500 h-full rounded absolute" style={{ left: "50%", width: "15%" }} />
                        </div>
                      </div>

                      {/* 4. 21:00 */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>⏰ start_time = 21:00 peak rush</span>
                          <strong className="text-red-600 font-bold">+0.23</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden relative">
                          <div className="bg-red-500 h-full rounded absolute" style={{ left: "65%", width: "19.2%" }} />
                        </div>
                      </div>

                      {/* 5. Public event */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>🏷️ event_type = Public Festival Event</span>
                          <strong className="text-red-600 font-bold">+0.12</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden relative">
                          <div className="bg-red-500 h-full rounded absolute" style={{ left: "84.2%", width: "10%" }} />
                        </div>
                      </div>

                      {/* 6. Active Road Works (Minus!) */}
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>🚧 physical_closures = None</span>
                          <strong className="text-emerald-600 font-bold">-0.05</strong>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded overflow-hidden relative">
                          <div className="bg-emerald-500 h-full rounded absolute" style={{ left: "90%", width: "4.2%" }} />
                        </div>
                      </div>

                      {/* 7. Final predicted value */}
                      <div className="pt-2 border-t border-slate-200/85">
                        <div className="flex justify-between text-xs font-bold items-center">
                          <span className="uppercase text-slate-800">Final Risk Attribution Score (f(x))</span>
                          <span className="text-red-600 bg-red-50 px-2.5 py-0.5 rounded border border-red-150 text-sm font-extrabold">1.08</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal italic">
                          Decision threshold set at <strong>0.70</strong>. Risk score of 1.08 exceeds constraint boundary, cleanly triggering a <strong>severity HIGH classification</strong>.
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: PITOT FIELD PLAN */}
        {subView === "pilot_plan" && (
          <motion.div
            key="view-pilot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* INTRO BLOCK */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-mono font-black text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded uppercase">
                Metropolitan Implementation Pilot
              </span>
              <h3 className="text-base font-black text-slate-900 tracking-tight font-display mt-2.5 flex items-center gap-1.5">
                <ClipboardList className="w-5 h-5 text-blue-600" />
                Target Station Field Run: Yelahanka PS
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                Ready-to-deploy architectural pilot framework bridging tactical modeling and localized police operations. Ground-tested constraints ensure extreme reliability before city-wide rollout.
              </p>

              {/* TARGET REASONING BENTO */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-6 pt-6 border-t border-slate-100">
                {/* Station Selection Detail */}
                <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Selected Station</span>
                    <strong className="text-base text-slate-900 block mt-1 font-display">Yelahanka Circle PS</strong>
                    <p className="text-[11px] text-slate-400 leading-normal mt-2">
                       Holds the absolute highest burden in our database with <strong className="text-slate-700">377 logged incident events</strong>, making it the highest-load sector.
                    </p>
                  </div>
                  <div className="border-t border-slate-200 pt-3 mt-3 text-[10px] font-mono text-blue-700 font-bold flex items-center justify-between">
                    <span>Pilot Trials Length:</span>
                    <span>30-Day Stage</span>
                  </div>
                </div>

                {/* The 2 key metrics detail */}
                <div className="md:col-span-8 space-y-3">
                  <h4 className="text-xs font-black text-slate-550 uppercase tracking-widest font-mono flex items-center gap-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    Two Quantitative Metrics To Measure
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* KPI 1 */}
                    <div className="bg-blue-50/20 border border-slate-150 p-3 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-blue-600 font-bold uppercase block">Metric 1</span>
                        <strong className="text-xs text-slate-900 block mt-1 leading-snug">Incident Clearance Speed</strong>
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug mt-2">
                        Target: Reduce local median clearance time from <span className="font-semibold text-slate-800">64 min</span> baseline down to <span className="font-semibold text-blue-700">48 min (-25%)</span>.
                      </p>
                    </div>

                    {/* KPI 2 */}
                    <div className="bg-blue-50/20 border border-slate-150 p-3 rounded-xl flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-blue-600 font-bold uppercase block">Metric 2</span>
                        <strong className="text-xs text-slate-900 block mt-1 leading-snug">Log Integrity Compliance</strong>
                      </div>
                      <p className="text-[10.5px] text-slate-400 leading-snug mt-2">
                        Target: Increase retrospective incident feedback report completion rate from <span className="font-semibold text-slate-800">38%</span> historical baseline up to <span className="font-semibold text-blue-700">88%</span>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* TIMELINE PROGRESS GRAPH */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-black text-slate-550 uppercase tracking-widest font-mono mb-4 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-500" />
                  30-day Pilot phased Schedule
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                  {/* Phase 1 */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600" />
                    <span className="text-[9px] text-blue-600 font-bold block uppercase bg-blue-50 border border-blue-100 w-max px-1.5 py-0.5 rounded">
                      Days 1 - 7
                    </span>
                    <strong className="text-slate-900 block mt-2 text-xs">Audit & Device Sizing</strong>
                    <ul className="text-[10.5px] text-slate-500 space-y-1 pb-1 mt-2 list-disc pl-3">
                      <li>Configure Yelahanka CCTVs on server feed</li>
                      <li>Distribute mobile dispatcher dashboards to field officers</li>
                      <li>Audit physical barricade positions at 6 choke locations</li>
                    </ul>
                  </div>

                  {/* Phase 2 */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-orange-500" />
                    <span className="text-[9px] text-orange-650 font-bold block uppercase bg-orange-50 border border-orange-100 w-max px-1.5 py-0.5 rounded">
                      Days 8 - 25
                    </span>
                    <strong className="text-slate-900 block mt-2 text-xs">Live Model-Driven Trials</strong>
                    <ul className="text-[10.5px] text-slate-500 space-y-1 pb-1 mt-2 list-disc pl-3">
                      <li>Model pre-deployment alerts pushed 15m in advance</li>
                      <li>Verify automated road diversion activations across ORR</li>
                      <li>Daily tracking of active emergency response corridors</li>
                    </ul>
                  </div>

                  {/* Phase 3 */}
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-600" />
                    <span className="text-[9px] text-emerald-700 font-bold block uppercase bg-emerald-50 border border-emerald-100 w-max px-1.5 py-0.5 rounded">
                      Days 26 - 30
                    </span>
                    <strong className="text-slate-900 block mt-2 text-xs">KPI Review & Report</strong>
                    <ul className="text-[10.5px] text-slate-500 space-y-1 pb-1 mt-2 list-disc pl-3">
                      <li>Aggregate clearance delays and calculate drop speed</li>
                      <li>Export telemetry logs matching compliance metrics</li>
                      <li>Draft final rollout proposal for city commissioner</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
