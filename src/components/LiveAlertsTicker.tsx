import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AlertTriangle, 
  ChevronUp, 
  ChevronDown, 
  Play, 
  Pause, 
  ListRestart, 
  Clock, 
  Radio, 
  CheckCircle,
  LayoutList,
  Flame,
  ShieldAlert
} from "lucide-react";
import { HOTSPOT_JUNCTIONS, CAUSES_BREAKDOWN } from "../data";

interface AlertItem {
  id: string;
  junction: string;
  cause: string;
  severity: "Critical" | "High" | "Medium";
  timestamp: string;
  eventsCount: number;
  message: string;
  recommendedAction: string;
}

export default function LiveAlertsTicker() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [severityFilter, setSeverityFilter] = useState<"All" | "Critical" | "High" | "Medium">("All");
  const [isExpandedView, setIsExpandedView] = useState<boolean>(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>("");

  // Seed initial alerts based on dataset
  useEffect(() => {
    const generatedAlerts: AlertItem[] = HOTSPOT_JUNCTIONS.map((j, index) => {
      // Rotate through causes
      const causeObj = CAUSES_BREAKDOWN[index % CAUSES_BREAKDOWN.length];
      
      const messages = [
        `Heavy congestion detected. Physical barriers suggested to split inbound lane bottlenecks.`,
        `Water logging causing acute vehicle blockades. Diversions advised at critical nodes.`,
        `Vehicle breakdown reported in primary lane. Spillovers expected to adjacent avenues.`,
        `Underpass construction blockage. Pre-deployment of officers requested to regulate peak surges.`,
        `High volume lane weaving. Lane safety coordination currently active.`
      ];

      const recommendations = [
        `Deploy 2 auxiliary patrol officers immediately for manual intervention.`,
        `Activate electronic overhead signage: "Route via outer bypass."`,
        `Request towing payload crane to clear primary lane obstacle.`,
        `Re-phase nearby traffic signals to expand green phase index by 20s.`,
        `Restrict freight vehicle intake between 17:00 and 21:00 HRS.`
      ];

      // Format time offset nicely
      const minutesAgo = (index + 2) * 4;
      const d = new Date();
      d.setMinutes(d.getMinutes() - minutesAgo);
      const timeStr = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

      return {
        id: `alert-${j.id}-${index}`,
        junction: j.name,
        cause: causeObj.name,
        severity: j.severity as "Critical" | "High" | "Medium",
        timestamp: timeStr,
        eventsCount: j.events,
        message: `${causeObj.name} at ${j.name}. ${messages[index % messages.length]}`,
        recommendedAction: recommendations[index % recommendations.length]
      };
    });

    setAlerts(generatedAlerts);
    setLastUpdateTime(new Date().toLocaleTimeString("en-IN"));
  }, []);

  // Filtered alerts
  const filteredAlerts = alerts.filter(
    (alert) => severityFilter === "All" || alert.severity === severityFilter
  );

  // Handle auto-scroll interval
  useEffect(() => {
    if (!isPlaying || filteredAlerts.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredAlerts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying, filteredAlerts.length]);

  // Sync current index if list length changes due to filtering
  useEffect(() => {
    setCurrentIndex(0);
  }, [severityFilter]);

  // Push new dynamic simulation alerts every 25 seconds to feel live
  useEffect(() => {
    const simulationTimer = setInterval(() => {
      const randomJunction = HOTSPOT_JUNCTIONS[Math.floor(Math.random() * HOTSPOT_JUNCTIONS.length)];
      const randomCause = CAUSES_BREAKDOWN[Math.floor(Math.random() * CAUSES_BREAKDOWN.length)];
      
      const newAlert: AlertItem = {
        id: `alert-sim-${Date.now()}`,
        junction: randomJunction.name,
        cause: randomCause.name,
        severity: Math.random() > 0.65 ? "Critical" : Math.random() > 0.35 ? "High" : "Medium",
        timestamp: new Date().toLocaleTimeString("en-IN"),
        eventsCount: randomJunction.events + Math.floor(Math.random() * 5),
        message: `Dynamic alert: ${randomCause.name} detected on high-throughput road section of ${randomJunction.name}. Impacting regional timeline forecast.`,
        recommendedAction: "Dispatch officer team to verify grid lock load status."
      };

      setAlerts((prev) => [newAlert, ...prev.slice(0, 14)]);
      setLastUpdateTime(new Date().toLocaleTimeString("en-IN"));
    }, 25000);

    return () => clearInterval(simulationTimer);
  }, []);

  const handleNext = () => {
    if (filteredAlerts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredAlerts.length);
  };

  const handlePrev = () => {
    if (filteredAlerts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredAlerts.length) % filteredAlerts.length);
  };

  // Styles based on Severity
  const getSeverityBadge = (severity: "Critical" | "High" | "Medium") => {
    switch (severity) {
      case "Critical":
        return "bg-red-50 text-red-700 border border-red-200";
      case "High":
        return "bg-orange-50 text-orange-700 border border-orange-200";
      case "Medium":
        return "bg-blue-50 text-flipkart-blue border border-blue-100";
    }
  };

  const activeAlert = filteredAlerts[currentIndex];

  return (
    <div className="w-full bg-[#fff6f0] dark:bg-[#1c2638] border border-orange-200/70 dark:border-slate-805 rounded-3xl p-5 shadow-sm space-y-4">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5 text-left">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <div>
            <h3 className="text-xs font-black text-flipkart-darkblue uppercase tracking-widest font-mono flex items-center gap-1.5">
              Live Bengaluru Traffic Alerts Ticker
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Real-time events sync. Last simulated poll: <span className="font-mono font-bold text-flipkart-blue">{lastUpdateTime}</span>
            </p>
          </div>
        </div>

        {/* CONTROLS BOX */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Filters */}
          <div className="flex bg-[#f1f3f6] p-0.5 rounded-lg border border-slate-200">
            {(["All", "Critical", "High"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSeverityFilter(lvl)}
                className={`px-2.5 py-1 text-[9.5px] font-bold font-mono rounded cursor-pointer transition-all ${
                  severityFilter === lvl 
                    ? "bg-white text-[#172337] shadow-sm border border-slate-200" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Expanded View Switcher */}
          <button
            onClick={() => setIsExpandedView(!isExpandedView)}
            className={`p-1.5 rounded-lg border cursor-pointer transition-all flex items-center gap-1 text-[9.5px] font-black font-mono ${
              isExpandedView 
                ? "bg-[#172337] text-white border-[#172337]" 
                : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
            }`}
            title="Toggle Expanded Status Grid"
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">{isExpandedView ? "Hide Grid" : "Show Grid"}</span>
          </button>
        </div>
      </div>

      {/* COMPACT TICKER STAGE */}
      <div className="relative bg-slate-50/70 border border-slate-150 rounded-2xl p-4 min-h-[92px] flex flex-col sm:flex-row justify-between items-center gap-4">
        {filteredAlerts.length === 0 ? (
          <div className="w-full text-center py-4 text-xs font-mono text-slate-400">
            No live warnings found matching the filter selection.
          </div>
        ) : (
          <>
            {/* ALERT BOX WITH VERTICAL TRANSITION */}
            <div className="flex-1 w-full text-left relative overflow-hidden min-h-[64px] flex items-center">
              <AnimatePresence mode="wait">
                {activeAlert && (
                  <motion.div
                    key={activeAlert.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex items-start gap-3"
                  >
                    <div className={`p-2 rounded-xl mt-0.5 ${
                      activeAlert.severity === "Critical" 
                        ? "bg-red-500/10 text-red-650" 
                        : "bg-orange-500/10 text-orange-650"
                    }`}>
                      <AlertTriangle className="w-4.5 h-4.5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[9px] font-black font-mono uppercase px-2 py-0.5 rounded ${getSeverityBadge(activeAlert.severity)}`}>
                          {activeAlert.severity} ALERT
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-400 font-semibold">
                          {activeAlert.timestamp}
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-500">
                          | Events: <strong className="text-slate-800">{activeAlert.eventsCount}</strong>
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 leading-normal">
                        {activeAlert.message}
                      </p>
                      <p className="text-[10px] text-flipkart-blue font-semibold flex items-center gap-1">
                        <span className="inline-block w-4 h-0.5 bg-flipkart-blue/30" />
                        Action: {activeAlert.recommendedAction}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* TICKER CONTROLLER BUTTONS */}
            <div className="flex sm:flex-col items-center gap-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 cursor-pointer transition-colors"
                  title="Previous Warning"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 cursor-pointer transition-colors flex items-center justify-center"
                  title={isPlaying ? "Pause Rotation" : "Resume Rotation"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-650 cursor-pointer transition-colors"
                  title="Next Warning"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <span className="text-[9px] font-mono text-slate-400 font-bold hidden sm:inline">
                {currentIndex + 1} of {filteredAlerts.length}
              </span>
            </div>
          </>
        )}
      </div>

      {/* FILTERABLE EXPANDED GRID LIST */}
      <AnimatePresence>
        {isExpandedView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="border border-slate-150 rounded-2xl bg-slate-50/30 p-4 space-y-3.5 text-left max-h-[300px] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  Full Grid lock Warning Registers
                </h4>
                <div className="text-[9.5px] font-mono text-slate-400">
                  Showing <strong className="text-slate-800">{filteredAlerts.length}</strong> incidents
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredAlerts.map((alert, idx) => (
                  <div 
                    key={alert.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex justify-between items-start gap-4 ${
                      currentIndex === idx 
                        ? "bg-white border-flipkart-blue ring-1 ring-flipkart-blue/50 shadow-sm"
                        : "bg-white/90 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[8.5px] font-black font-mono uppercase px-1.5 py-0.5 rounded ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-800 font-extrabold">{alert.junction}</span>
                        <span className="text-[9px] font-mono text-slate-400">{alert.timestamp}</span>
                      </div>
                      <p className="text-slate-650 text-[11px] font-medium leading-relaxed">
                        {alert.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 shrink-0">
                      <span>Events: <strong className="text-slate-800">{alert.eventsCount}</strong></span>
                      {currentIndex === idx && (
                        <span className="w-1.5 h-1.5 rounded-full bg-flipkart-blue animate-ping" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
