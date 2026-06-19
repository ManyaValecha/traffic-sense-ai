import { useState } from "react";
import { motion } from "motion/react";
import { Shield, Landmark, Flame, Siren, Zap } from "lucide-react";

export default function DeploySection() {
  const [activeTab, setActiveTab] = useState<"public_event" | "rally" | "vip" | "accident">("public_event");

  const tabMeta = {
    public_event: {
      title: "Public Event",
      badge: "Scale: Moderate/High",
      icon: Landmark,
      color: "border-blue-200 text-blue-700 bg-blue-50",
    },
    rally: {
      title: "Political Rally",
      badge: "Scale: High Threat",
      icon: Flame,
      color: "border-red-200 text-red-700 bg-red-50",
    },
    vip: {
      title: "VIP Movement",
      badge: "Scale: Precision Escort",
      icon: Zap,
      color: "border-amber-200 text-amber-700 bg-amber-50",
    },
    accident: {
      title: "Accident Mode",
      badge: "Scale: SLA Response",
      icon: Siren,
      color: "border-cyan-205 text-cyan-705 text-cyan-700 bg-cyan-50",
    },
  };

  const getUrgencyBadge = (level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW") => {
    switch (level) {
      case "CRITICAL":
        return "bg-red-100 text-red-750 border-red-200 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-750 border-orange-200 text-orange-850";
      case "MEDIUM":
        return "bg-amber-100 text-amber-750 border-amber-200 text-amber-800";
      case "LOW":
        return "bg-blue-105 bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 text-slate-800"
    >
      <div id="deploy-header" className="border-b border-slate-200 pb-5 text-left">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-flipkart-darkblue flex items-center gap-2.5 uppercase font-display">
          <Shield className="w-5 h-5 text-flipkart-blue" />
          Deployment Recommendation Engine
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Dynamically generated tactical manpower maps, physical barrier setups, and sector-wise diversion layouts calibrated to event constraints.
        </p>
      </div>

      {/* RECO NAV TABS */}
      <div className="flex flex-wrap gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
        {(Object.keys(tabMeta) as Array<keyof typeof tabMeta>).map((key) => {
          const tab = tabMeta[key];
          const Icon = tab.icon;
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-white text-blue-700 shadow-md border-slate-250 border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.title}</span>
            </button>
          );
        })}
      </div>

      {/* RECOMMENDATION DETAILS BY SELECTED TAB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* RECOMMENDATION CARDS COLUMN */}
        <div className="lg:col-span-7 space-y-5">
          {activeTab === "public_event" && (
            <>
              {/* Card 1 - High */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("HIGH")}`}>
                        HIGH urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Personnel Allocations</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Stationing & Deployment Protocols</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      Deploy <strong className="text-slate-900">6 personnel officers minimum</strong> at Mekhri Circle <strong className="text-slate-900">90 min</strong> prior to public crowd launch. Station 2 at Yeshwanthpura crossing (major collateral spillover route). Establish a physical crowd-density staging area of 100m.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - Medium */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("MEDIUM")}`}>
                        MEDIUM urgency
                      </span>
                      <span className="text-[11px] text-slate-455 font-bold font-mono uppercase">Physical Barriers</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Barricade Setups & Signs</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      Position high-grade metallic crowd-control rails across <strong className="text-slate-900">3 key approach feeders</strong> (Tumkur Road ingress, Residency Road block, ORR East loop). Place variable emergency signages at 400m and 800m radial offsets.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Low */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("LOW")}`}>
                        LOW urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Alternate Routing</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Dynamic Divert Corridors</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      <strong className="text-blue-650 font-bold">Primary diversion routing:</strong> NICE Road link for fast bypass. <strong className="text-amber-705 text-amber-700 font-bold">Secondary:</strong> Outer Ring Road. Broadcast routing advisories via public VMS panels 3 hrs early. Coordinate with BMTC for re-routing bus lines.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "rally" && (
            <>
              {/* Card 1 - High */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("HIGH")}`}>
                        HIGH urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Tactical Escort</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Rally Crowd Allocation</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      Deploy <strong className="text-slate-900">10 officers minimum</strong>. The processing corridor must have a dedicated patrol vehicle trailing the crowd. Foot constables stationed on crossing junctions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - High */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("HIGH")}`}>
                        HIGH urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Full Seal</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Corridor Sealing Structure</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      Lock secondary alleys and radial connectors leading into the main rally route <strong className="text-slate-900">2 hours pre-event</strong>. Maintain full uninhibited clearance for emergency services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - Medium */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("MEDIUM")}`}>
                        MEDIUM urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Bypass routing</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Metropolitan Radial Outlets</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      Activate <strong className="text-slate-900">3 dynamic bypass lines</strong> simultaneously. Guide commuter volume away from core central sectors. Standard BTP closure indices suggest a 41% spillover rate.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "vip" && (
            <>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("HIGH")}`}>
                        HIGH urgency
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Protocol</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">Cavalkade Escort Protocol</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      VIP escorts occupy <strong className="text-slate-900">95% priority levels</strong>. Preemption logs execute automated greenhold cues across the grid. Clear path 3km in advance of the forward outriders.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "accident" && (
            <>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-550/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-black tracking-wider uppercase border px-2.5 py-0.5 rounded-md ${getUrgencyBadge("CRITICAL")}`}>
                        CRITICAL Response
                      </span>
                      <span className="text-[11px] text-slate-450 font-bold font-mono uppercase">Emergency Service</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 pt-1 font-display">SLA Rapid Spillover Clearing</h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 font-sans">
                      First response dispatch loop: nearest patrol jeep + heavy commercial towing truck within <strong className="text-red-650 font-bold text-red-600">8 min SLA target</strong>. Clear single lateral line immediately to prevent heavy gridlocks.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* TIMELINE SEQUENCE STAGE */}
        <div className="lg:col-span-12 xl:col-span-5 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm relative space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono">Operations Timeline Sequence</h3>
            <span className="text-[10px] bg-blue-50 border border-blue-100 text-flipkart-blue font-mono font-bold px-2 py-0.5 rounded">Action-Log</span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-200/80 shadow-sm">
            <img
              src="/images/bengaluru_dispatch_real_1781584218438.jpg"
              alt="Police Dispatch Command Center Dashboard"
              referrerPolicy="no-referrer"
              className="w-full h-[150px] object-cover"
            />
            <div className="absolute top-2 right-2 bg-slate-900/95 text-white font-mono text-[8px] px-2 py-0.5 rounded shadow">
              SENSOR DESK DIRECT_SLA
            </div>
          </div>

          <div className="relative pl-6 border-l-2 border-slate-150 space-y-6 pt-1 ml-2">
            {activeTab === "public_event" && (
              <>
                {[
                  { time: "T-90 min", text: "Tactical Officers deployed. Physical barricades pre-staged." },
                  { time: "T-30 min", text: "VMS advisory channels activated. Radial diversions route vehicles." },
                  { time: "T+0 min", text: "Event start. Signal cycle preemption loops initialized." },
                  { time: "T+60 min", text: "Dispersal phase active. Maintain secondary manual priority overlays." },
                  { time: "T+90 min", text: "Clearance declared. Preemption feeds logged out to performance feedback database." },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />
                    <div>
                      <span className="text-[11px] font-mono font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                        {step.time}
                      </span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">{step.text}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "rally" && (
              <>
                {[
                  { time: "T-120 min", text: "Staff positioned. Alternative bypass routers published." },
                  { time: "T-60 min", text: "Corridor sealed entirely. Heavy barriers secured." },
                  { time: "T+0 min", text: "Procession start. Mobile patrol units tracking tail grid." },
                  { time: "T+120 min", text: "Barriers progressively removed behind the crowd flow." },
                  { time: "T+180 min", text: "Route fully re-opened. Standard signal loops returned to active." },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-red-600 border-4 border-white shadow-sm" />
                    <div>
                      <span className="text-[11px] font-mono font-black text-red-750 text-red-700 bg-red-50 px-2.5 py-0.5 rounded border border-red-100">
                        {step.time}
                      </span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">{step.text}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "vip" && (
              <>
                {[
                  { time: "T-30 min", text: "Pilot outriders staged. Target preemptions verified." },
                  { time: "T-10 min", text: "Continuous greenholds triggered. Connectors restricted." },
                  { time: "T+0 min", text: "Convoy transit. Monitoring sector outflow velocities." },
                  { time: "T+15 min", text: "Transit cleared. Global preemptions reset to baseline schedules." },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-sm" />
                    <div>
                      <span className="text-[11px] font-mono font-black text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100">
                        {step.time}
                      </span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">{step.text}</p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "accident" && (
              <>
                {[
                  { time: "T+0 min", text: "Incident logged. SLA response clocks dispatch vehicles." },
                  { time: "T+8 min", text: "PCR and heavy tow arrive at coordinates. Upstream safety cones placed." },
                  { time: "T+15 min", text: "Single lateral bypass line structured for traffic discharge." },
                  { time: "T+45 min", text: "Damaged vehicles cleared. Debris swept entirely." },
                  { time: "T+60 min", text: "SLA performance stats logged and finalized." },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-cyan-600 border-4 border-white shadow-sm" />
                    <div>
                      <span className="text-[11px] font-mono font-black text-cyan-705 text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-100">
                        {step.time}
                      </span>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">{step.text}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
