import { useState } from "react";
import { motion } from "motion/react";
import { Cpu, Server, Database, Smartphone, LayoutGrid, Network } from "lucide-react";

export default function ArchSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const dataFlowSteps = [
    { id: "sources", label: "Astram API + BTP Core Ingestion", desc: "Ingests real-time alerts and parses 8,173 historical incident records." },
    { id: "etl", label: "Spatial ETL Stream", desc: "Cleanses, maps, and normalizes geographic, temporal, and metadata points." },
    { id: "inference", label: "Predictive ML Pipelines", desc: "Estimates severity scores and clearance delay durations." },
    { id: "rule_engine", label: "Dynamic Rule Heuristics", desc: "Matches predicted severity to tactical staffing plans and barrier segments." },
    { id: "distrib", label: "REST Dispatch Hub", desc: "Exposes real-time endpoints and streams actions to field terminals." }
  ];

  const techStack = [
    {
      title: "Data Layer",
      icon: Database,
      items: ["PostgreSQL spatial", "Astram API Integration", "8,173 BTP Dataset logs"],
      color: "border-blue-200 text-blue-700 bg-blue-50"
    },
    {
      title: "ML Engine",
      icon: Cpu,
      items: ["XGBoost Classifier", "LightGBM Estimator", "Gemini 3.5 Copilot"],
      color: "border-emerald-250 text-emerald-800 bg-emerald-50"
    },
    {
      title: "Backend API",
      icon: Server,
      items: ["Express + Node.js", "Vite SSR Client Middleware", "REST Routing channels"],
      color: "border-amber-250 text-amber-800 bg-amber-50"
    },
    {
      title: "Officer Terminal",
      icon: Smartphone,
      items: ["React Progressive Client", "Offline-first sync engine", "PWA push updates"],
      color: "border-cyan-250 text-cyan-800 bg-cyan-50"
    },
    {
      title: "Command Console",
      icon: LayoutGrid,
      items: ["Vite + React 19 App", "Lucide Icon Suite", "Motion animations"],
      color: "border-purple-250 text-purple-800 bg-purple-50"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 text-slate-800"
    >
      <div id="arch-header" className="border-b border-slate-200 pb-5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5 uppercase font-display">
          <Network className="w-5 h-5 text-blue-600" />
          System Architecture Specs
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Full-stack layout specs — from live dataset integration to dispatcher mobile synchronization. Engineered for production-ready Bengaluru command operations.
        </p>
      </div>

      {techStack.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {techStack.map((tech) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.title}
                className={`border rounded-xl p-4 flex flex-col justify-between transition-all hover:scale-[1.03] cursor-default group shadow-sm ${tech.color}`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-450 font-bold">Precinct Desk</span>
                    <Icon className="w-4 h-4 opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider font-sans mt-3.5 mb-2.5 pb-1.5 border-b border-inherit">
                    {tech.title}
                  </h4>
                  <ul className="space-y-1 block text-left text-[11px] font-mono leading-relaxed opacity-90">
                    {tech.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* DATA FLOW INTERACTIVE PIPELINE */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100 text-left">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider">Telemetry Cascade Pipeline</h3>
              <p className="text-xs text-slate-500">Live operational data flow mapping directly from BTP databases</p>
            </div>
            <span className="text-[10px] text-blue-700 font-mono font-bold">Data visualization enabled</span>
          </div>

          {/* VISUAL DIAGRAM CARD FLOW */}
          <div className="space-y-4">
            {dataFlowSteps.map((step, idx) => {
              const isActive = activeNode === step.id;
              return (
                <div key={step.id} className="relative text-left">
                  {/* DATA PATH Connector */}
                  {idx < dataFlowSteps.length - 1 && (
                    <div className="absolute left-[34px] top-full h-4 w-[2px] bg-blue-300 overflow-hidden">
                      <div className="w-full h-1/2 bg-blue-500 animate-bounce" style={{ animationDuration: "1.5s" }} />
                    </div>
                  )}

                  <div
                    onMouseEnter={() => setActiveNode(step.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`flex items-start gap-4 p-3 bg-slate-50 rounded-xl border transition-all cursor-default relative overflow-hidden ${
                      isActive ? "border-blue-400 bg-blue-50/55 scale-[1.02]" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black font-mono text-xs border flex-shrink-0 transition-colors ${
                      isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-400 border-slate-200 shadow-inner"
                    }`}>
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h4 className={`text-xs font-extrabold uppercase tracking-widest ${isActive ? "text-blue-700" : "text-slate-900"}`}>
                        {step.label}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ATTR SPECIFICATION DETAILS */}
        <div id="feature-spec-block" className="lg:col-span-12 xl:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-905 text-slate-900 font-sans uppercase tracking-wider mb-2.5 pb-2 border-b border-slate-100 text-left">
              Data Feature Structures
            </h3>
            <div className="space-y-4 text-xs font-sans text-left">
              {[
                { title: "Temporal Vectors", desc: "Day-of-week indicators and hour cyclic peaks extracted from system dates. Tracks evening surge volumes at 21:00 hrs precisely.", color: "text-blue-750 text-blue-700" },
                { title: "Spatial Clustering", desc: "Hotspot GPS boundaries matching traffic risk weights across 3,129 tagged zones.", color: "text-emerald-800" },
                { title: "Categorical Metadata", desc: "Input metrics: closure requests, event type classes, diversion indices map to classifier nodes.", color: "text-amber-800" },
                { title: "Resolution Clocks", desc: "Closes data feedback loops by checking actual versus predicted resolution rates in minutes.", color: "text-cyan-705 text-cyan-800" }
              ].map((feat) => (
                <div key={feat.title} className="space-y-1">
                  <h4 className={`font-bold flex items-center gap-1.5 ${feat.color}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-650 bg-blue-600" />
                    {feat.title}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed pl-3 font-medium font-sans">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SLA METRICS */}
          <div className="grid grid-cols-3 gap-3 bg-white border border-slate-200 p-4 rounded-xl text-center relative overflow-hidden shadow-sm">
            {[
              { label: "Prediction Latency", val: "< 2 sec", scale: "Express API" },
              { label: "Severity Accuracy", val: "~84%", scale: "Validated Models" },
              { label: "Pipeline Retrain Zone", val: "Weekly", scale: "Dynamic Convergence" }
            ].map((metric) => (
              <div key={metric.label} className="space-y-1">
                <span className="text-[10px] text-slate-450 font-mono uppercase tracking-wider block font-bold">{metric.label}</span>
                <span className="text-[13px] sm:text-sm font-black text-blue-600 font-mono block">{metric.val}</span>
                <span className="text-[9px] text-slate-450 block font-mono font-medium">{metric.scale}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
