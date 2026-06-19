import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, RefreshCw, Landmark } from "lucide-react";

export default function PostLearnSection() {
  const [pipelineProcessing, setPipelineProcessing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  const triggerPipelineDemo = () => {
    if (pipelineProcessing) return;
    setPipelineProcessing(true);
    setPipelineStep(1);

    const timeouts = [
      setTimeout(() => setPipelineStep(2), 1000),
      setTimeout(() => setPipelineStep(3), 2000),
      setTimeout(() => setPipelineStep(4), 3000),
      setTimeout(() => setPipelineStep(5), 4000),
      setTimeout(() => {
        setPipelineProcessing(false);
        setPipelineStep(0);
      }, 5200),
    ];

    return () => timeouts.forEach(clearTimeout);
  };

  const scores = [
    { name: "Response Score", value: 87, color: "stroke-blue-600", text: "text-blue-600" },
    { name: "Accuracy Score", value: 91, color: "stroke-emerald-600", text: "text-emerald-600" },
    { name: "Resource Efficiency", value: 74, color: "stroke-amber-600", text: "text-amber-600" },
    { name: "Diversion Flow Optimal", value: 62, color: "stroke-orange-600", text: "text-orange-600" },
  ];

  const pipeline = [
    { step: 1, label: "Event Closed", desc: "Signal parsed from field officer mobile terminal." },
    { step: 2, label: "Auto-Log Telemetry", desc: "Write active operational durations and logs to Astram." },
    { step: 3, label: "Delta Computation", desc: "Compare predicted (90m) vs actual (78m) delta models." },
    { step: 4, label: "Backpropagation", desc: "Feed regression error gradients to the LightGBM weights." },
    { step: 5, label: "Model Deploy", desc: "Push optimized staffing tables to active officer dispatch." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 text-slate-800"
    >
      <div id="postlearn-header" className="border-b border-slate-200 pb-5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5 uppercase font-display">
          <Brain className="w-5 h-5 text-blue-600" />
          Post-Event Learning Loop
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          The missing piece in contemporary traffic operations today. Every closed incident generates an automated lessons-learned record that feeds back into predictive models.
        </p>
      </div>

      {/* KPI STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          {
            title: "Events with Resolution Data",
            count: "3,129",
            badge: "38% of overall dataset",
            desc: "Labeled samples available for training predictions",
            color: "text-blue-600",
          },
          {
            title: "Median Resolution Time",
            count: "64 min",
            badge: "25th percentile: 28 min",
            desc: "Standard cleared intervals under base constraints",
            color: "text-emerald-700",
          },
          {
            title: "Long-Tail Outliers (>24 hrs)",
            count: "~8% of logs",
            badge: "Construction & water-logging",
            desc: "Complex structural blockages with prolonged duration rates",
            color: "text-amber-800",
          },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white border border-slate-205 border-slate-200 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-350 transition-all text-left shadow-sm">
            <div>
              <span className="text-[11px] text-slate-500 font-mono tracking-wider uppercase block font-bold">{kpi.title}</span>
              <p className={`text-3xl font-black font-display mt-2 ${kpi.color}`}>{kpi.count}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-1">
              <span className="text-xs text-slate-800 font-bold block">{kpi.badge}</span>
              <span className="text-[11px] text-slate-500 block leading-relaxed font-sans">{kpi.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* AUTOMATED POST-EVENT SCORECARD */}
        <div id="scorecard-block" className="bg-white border border-slate-202 border-slate-200 rounded-2xl p-6 lg:col-span-12 xl:col-span-7 space-y-5 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 text-left">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider">Automated Post-Event Scorecard</h3>
              <p className="text-xs text-slate-500">Live feedback log sample from active database records</p>
            </div>
            <span className="text-[10px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded font-black font-mono">
              COMPLETED RECORD
            </span>
          </div>

          {/* EVENT DETAIL HEADER */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 justify-between items-center text-xs text-left">
            <div>
              <span className="text-[9px] text-slate-450 font-mono block font-bold">EVENT SUBJECT</span>
              <strong className="text-slate-900 font-sans text-sm font-extrabold">Public event · Mekhri Circle · Thurs 21:00</strong>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-1 bg-white p-3 rounded-lg border border-slate-200 font-mono text-[11px]">
              <div className="text-slate-550 text-slate-500 font-medium">Predicted Resolution:</div>
              <div className="text-right text-blue-600 font-extrabold">90 min</div>
              <div className="text-slate-550 text-slate-500 font-medium">Actual Resolution:</div>
              <div className="text-right text-emerald-700 font-extrabold">78 min</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {/* KPI METERS */}
            {scores.map((score) => {
              // Standard SVG Dash Circumference for Radius=24 is 2*pi*r approx 150.79
              const r = 24;
              const circ = 2 * Math.PI * r;
              const strokeOffset = circ - (score.value / 100) * circ;
              return (
                <div key={score.name} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col items-center">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r={r} fill="transparent" stroke="#e2e8f0" strokeWidth="4.5" />
                      <motion.circle
                        cx="32"
                        cy="32"
                        r={r}
                        fill="transparent"
                        className={score.color}
                        strokeWidth="4.5"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        animate={{ strokeDashoffset: strokeOffset }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute text-xs font-black font-mono text-slate-900">{score.value}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 text-center font-bold mt-2.5 leading-tight block uppercase tracking-wide">{score.name}</span>
                </div>
              );
            })}
          </div>

          {/* DUST-JACKET COMPARISON BLOCK */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-left">
            <div>
              <span className="text-[9px] text-slate-450 font-mono block font-bold">OFFICERS DEPLOYED</span>
              <p className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">8 Officers</p>
            </div>
            <div>
              <span className="text-[9px] text-slate-450 font-mono block font-bold">OFFICERS NEEDED (OPTIMAL)</span>
              <p className="text-xl font-extrabold text-blue-600 font-mono mt-0.5 font-bold">6 Officers</p>
            </div>
          </div>

          {/* SCORECARD NOTE CARD */}
          <div className="bg-blue-50 border border-blue-200/60 p-4 rounded-xl text-xs space-y-2 relative overflow-hidden text-left shadow-sm">
            <h5 className="font-extrabold text-blue-700 font-mono tracking-wider uppercase text-[10px]">OPERATIONAL VARIANCE ANALYSIS</h5>
            <p className="text-slate-650 leading-relaxed font-sans">
              <strong>Over-deployed by 2 officers.</strong> Diversion via Tumkur Road underutilised — 40% of diverted vehicles re-entered via secondary connectors. Predictive pipeline weight update triggered: <strong className="text-slate-900 font-bold">+1 barricade segment</strong> recommendation for subsequent matching incidents.
            </p>
          </div>
        </div>

        {/* PIPELINE VISUALIZATION COLUMN */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-250 border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-2 text-left border-b border-slate-100">
            <div>
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest font-mono">Continuous Feedback Pipeline</h3>
              <p className="text-[10px] text-slate-500">Auto-tuning weights per event closure</p>
            </div>
            <button
              onClick={triggerPipelineDemo}
              disabled={pipelineProcessing}
              className="p-1 px-3 bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 tracking-wider text-[10px] text-white font-mono rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm select-none"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${pipelineProcessing ? "animate-spin" : ""}`} />
              <span>Simulate Feed</span>
            </button>
          </div>

          {/* PIPELINE TIMELINE CARDS */}
          <div className="space-y-3 relative pt-1 text-left">
            {pipeline.map((step) => {
              const checked = pipelineStep >= step.step;
              const active = pipelineStep === step.step;
              const isStep5 = step.step === 5;
              return (
                <div
                  key={step.step}
                  className={`p-3 rounded-xl border text-xs transition-all flex gap-3 ${
                    isStep5
                      ? "bg-[#064e3b] text-emerald-50 border-emerald-700/60 shadow-sm"
                      : active
                      ? "bg-blue-50 border-blue-300 shadow-md scale-[1.03]"
                      : checked
                      ? "bg-slate-50 border-emerald-300/60 text-slate-600"
                      : "bg-slate-50/50 border-slate-150 text-slate-450"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-mono font-bold ${
                    isStep5
                      ? "bg-[#022c22] text-white border border-[#047857]/40"
                      : active
                      ? "bg-blue-600 text-white animate-pulse"
                      : checked
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-slate-200 text-slate-400"
                  }`}>
                    {checked && !active ? "✓" : step.step}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className={`font-bold tracking-wide ${
                      isStep5 ? "text-white" : active ? "text-blue-700" : checked ? "text-slate-900" : "text-slate-450"
                    }`}>
                      {step.label}
                    </h4>
                    <p className={`text-[10px] leading-relaxed font-sans ${isStep5 ? "text-emerald-200" : "text-slate-500"}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-[10px] text-slate-500 text-center font-mono leading-relaxed pt-2">
            Feedback models execute backpropagation adjustments dynamically on database transaction triggers.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
