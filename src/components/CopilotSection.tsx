import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Send, MapPin, AlertCircle, ShieldAlert, Cpu, Calendar, Clock, BarChart3, HelpCircle, Landmark } from "lucide-react";

interface TimelineStep {
  time: string;
  action: string;
}

interface AIPlan {
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  severityReasoning: string;
  estClearanceTime: number;
  manpowerPlan: string;
  barricadeDetails: string;
  primaryRoute: string;
  secondaryRoute: string;
  timeline: TimelineStep[];
}

export default function CopilotSection() {
  const [scenario, setScenario] = useState("");
  const [location, setLocation] = useState("Silk Board Junction");
  const [timeOfDay, setTimeOfDay] = useState("20:00 (Thursday Peak)");
  const [eventType, setEventType] = useState("Water logging");
  const [isLoading, setIsLoading] = useState(false);
  const [aiPlan, setAiPlan] = useState<AIPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    {
      title: "Monsoon Deluge at Silk Board",
      scenario: "Torrential rain has caused 2 feet of waterlogging at the Silk Board underpass, blocking 3 lanes. A vehicle has also broken down trying to cross.",
      location: "Silk Board Junction",
      timeOfDay: "18:30 (Friday Peak)",
      eventType: "Water logging",
    },
    {
      title: "VIP Convoy & Rally Match",
      scenario: "A diplomatic high-security delegation of 15 vehicles is crossing from the Airport through Mekhri Circle, intersecting with a synchronized citizen procession.",
      location: "Mekhri Circle",
      timeOfDay: "09:30 (Tuesday Peak)",
      eventType: "VIP movement",
    },
    {
      title: "Expressway Construction Block",
      scenario: "Unscheduled metro pillar maintenance concrete laying has overshot its block, restricting Outer Ring Road near Nagavara to a single operational lane.",
      location: "Nagavara-ORR Junction",
      timeOfDay: "11:00 (Monday)",
      eventType: "Construction activity",
    },
  ];

  const handleRunPreset = (preset: typeof presets[0]) => {
    setScenario(preset.scenario);
    setLocation(preset.location);
    setTimeOfDay(preset.timeOfDay);
    setEventType(preset.eventType);
    triggerAIEngine(preset.scenario, preset.location, preset.timeOfDay, preset.eventType);
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!scenario.trim()) return;
    triggerAIEngine(scenario, location, timeOfDay, eventType);
  };

  const triggerAIEngine = async (sc: string, loc: string, tod: string, et: string) => {
    setIsLoading(true);
    setError(null);
    setAiPlan(null);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: sc,
          location: loc,
          timeOfDay: tod,
          eventType: et,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to receive feedback from server-side Gemini.");
      }

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setAiPlan(resJson.data);
      } else {
        throw new Error(resJson.error || "Malformed analytical response.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred contacting the AI server.");
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (sev?: string) => {
    switch (sev) {
      case "CRITICAL":
        return "text-red-700 bg-red-100 border-red-200";
      case "HIGH":
        return "text-orange-700 bg-orange-100 border-orange-200";
      case "MEDIUM":
        return "text-amber-700 bg-amber-100 border-amber-200";
      default:
        return "text-blue-700 bg-blue-100 border-blue-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-6 text-left">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-flipkart-blue text-white rounded-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#2874f0] uppercase">DYNAMIC INTELLIGENCE</span>
            <h2 className="text-2xl sm:text-3xl font-black text-flipkart-darkblue tracking-tight font-display">
              Gemini Traffic Copilot Simulator
            </h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 pl-1 max-w-3xl">
          A truly unique AI-driven operational simulator. Provide any real-world Bengaluru traffic emergency or select a preset, and our server-side <strong className="text-neutral-900">Gemini 3.5 Flash Model</strong> customizes physical assets, timeline containment steps, and priority routings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: SIMULATION INPUT */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass rounded-2xl p-6 bg-white shrink-0 border border-slate-200">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest font-sans mb-4 flex items-center justify-between">
              <span>Scenario parameters</span>
              <span className="text-[10px] font-mono text-flipkart-blue font-bold bg-blue-50 px-2.5 py-0.5 rounded">MODERN LLM V3.5</span>
            </h3>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-1.5">
                  Describe Traffic Emergency
                </label>
                <textarea
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="e.g., Heavy rain tree fall blocking all lanes of Hebbal flyover..."
                  rows={4}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl p-3 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-sans leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-1.5">
                    Nearest Landmark
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-1.5">
                    Time Window
                  </label>
                  <input
                    type="text"
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-1.5">
                  Incident Category
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-blue-600"
                >
                  <option>Water logging</option>
                  <option>Vehicle breakdown</option>
                  <option>Accident</option>
                  <option>VIP movement</option>
                  <option>Construction activity</option>
                  <option>Political Procession</option>
                  <option>Festival / Holiday Crowds</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading || !scenario.trim()}
                className="w-full flex items-center justify-center gap-2.5 bg-flipkart-blue hover:bg-flipkart-blue/90 active:scale-95 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg hover:shadow-blue-600/15 transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer uppercase tracking-wider font-display"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Gemini is compiling strategy...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-white fill-white" />
                    <span>Generate AI Mitigation Plan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SIMULATOR PRESETS */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest font-mono pl-1">
              Popular Emergency Scenarios
            </h4>
            <div className="space-y-3">
              {presets.map((preset) => (
                <button
                  key={preset.title}
                  onClick={() => handleRunPreset(preset)}
                  className="w-full bg-white border border-slate-200 hover:border-blue-300 rounded-xl p-4 text-left transition-all hover:shadow-md cursor-pointer block group"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 text-xs tracking-tight group-hover:text-blue-600 transition-colors">
                      {preset.title}
                    </span>
                    <span className="text-[9px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase border border-slate-200">
                      {preset.eventType}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {preset.scenario}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {preset.location}
                    </span>
                    <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      Deploy simulator →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI RESPONSE OUTCOME */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-8 border border-dashed border-blue-200 flex flex-col items-center justify-center text-center bg-white/50 h-[560px]"
              >
                <div className="p-4 bg-blue-50 text-blue-600 border border-blue-100 rounded-full mb-4 animate-bounce">
                  <Cpu className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-display">Fanning out telemetry vectors...</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                  Querying server-side <strong className="text-blue-600">Gemini 3.5 AI model</strong>. Computing crowd-density matrices, barrier layouts, spatial clearance corridors, and dispatch SLAs.
                </p>
                <div className="mt-6 flex gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-blue-600 animate-ping [animation-delay:0.4s]" />
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
              >
                <AlertCircle className="w-8 h-8 text-red-650 mx-auto mb-3" />
                <h5 className="font-bold text-red-900 text-sm">Failed to generate plan</h5>
                <p className="text-xs text-red-700 mt-1">{error}</p>
                <p className="text-[10px] text-red-500 mt-4">
                  Please ensure your server environment is configured with a valid Gemini API key in Settings &gt; Secrets.
                </p>
              </motion.div>
            ) : aiPlan ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-6 bg-white border border-slate-200 space-y-6 relative overflow-hidden"
              >
                {/* Visual Highlight Badge */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start border-b border-slate-150 pb-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-600 px-2 py-0.5 bg-blue-50 border border-blue-100 rounded-md">
                      Interactive AI Operational Blueprint
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1.5 font-display tracking-tight leading-tight">
                      {aiPlan.title}
                    </h3>
                  </div>
                  <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-full border shrink-0 ${getSeverityColor(aiPlan.severity)}`}>
                    ● {aiPlan.severity}
                  </span>
                </div>

                {/* KPI SQUARES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wide">Severity Reasoning Matrix</span>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans mt-1.5">
                      {aiPlan.severityReasoning}
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wide">SLA Clearance Window</span>
                      <p className="text-3xl font-extrabold text-blue-650 tracking-tight font-mono mt-1">
                        ~{aiPlan.estClearanceTime} min
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-450 mt-2 font-mono">Dynamic queue convergence SLA</span>
                  </div>
                </div>

                {/* TACTICAL ASSETS INSTRUCTIONS */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
                    Tactical Deployment Specs
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-slate-150 bg-white shadow-sm p-4 rounded-xl">
                      <span className="text-xs font-display font-bold text-slate-900 block border-b border-slate-100 pb-1">
                        👮 Manpower Allocation
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans">
                        {aiPlan.manpowerPlan}
                      </p>
                    </div>

                    <div className="border border-slate-150 bg-white shadow-sm p-4 rounded-xl">
                      <span className="text-xs font-display font-bold text-slate-900 block border-b border-slate-100 pb-1">
                        🚧 Barricading Layout
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 font-sans">
                        {aiPlan.barricadeDetails}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ROUTING CORRIDORS */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-2.5">
                  <span className="text-[10px] font-mono text-blue-650 font-bold uppercase tracking-wider block">
                    ⚡ Auto-Diversion Routing
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <strong className="text-blue-700 block mb-0.5">Primary Corridor Link:</strong>
                      <span className="text-slate-600 leading-relaxed">{aiPlan.primaryRoute}</span>
                    </div>
                    <div>
                      <strong className="text-[#d97706] block mb-0.5">Secondary Buffer Bypass:</strong>
                      <span className="text-slate-600 leading-relaxed">{aiPlan.secondaryRoute}</span>
                    </div>
                  </div>
                </div>

                {/* TIMELINE STEPS */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-mono">
                    Chronological Deployment Sequence
                  </h4>

                  <div className="relative pl-5 border-l-2 border-slate-200 ml-2 space-y-4 pt-1">
                    {aiPlan.timeline.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                        <div>
                          <span className="text-[10px] font-mono font-bold text-blue-650 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 inline-block">
                            {step.time}
                          </span>
                          <p className="text-xs text-slate-650 leading-relaxed mt-1 font-sans">
                            {step.action}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-right bg-slate-50 p-2 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span>Simulated via Gemini live feed</span>
                  <span className="font-bold">SLA ACCURACY ASSURED</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                tabIndex={0}
                className="glass border border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-white/40 h-[560px]"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-full border border-blue-100 mb-4">
                  <Landmark className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-900 font-display">Awaiting AI Input Payload</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-2 leading-relaxed">
                  Enter custom details in the scenario configuration block, or click on a real-time pre-seeded emergency preset to trigger the Gemini Copilot analysis.
                </p>
                <div className="mt-6 text-[10px] text-slate-450 bg-white/80 px-3 py-1 rounded-full border border-slate-200 font-mono">
                  Powered by @google/genai & gemini-3.5-flash
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
