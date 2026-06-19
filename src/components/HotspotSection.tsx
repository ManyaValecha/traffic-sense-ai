import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Map, MapPin, Search, Compass, Info } from "lucide-react";
import { HOTSPOT_JUNCTIONS, POLICE_STATION_LOAD } from "../data";
import { HotspotJunction } from "../types";

export default function HotspotSection() {
  const [selectedJunction, setSelectedJunction] = useState<HotspotJunction | null>(HOTSPOT_JUNCTIONS[0]);
  const [filterSeverity, setFilterSeverity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJunctions = HOTSPOT_JUNCTIONS.filter((j) => {
    const matchesSeverity = filterSeverity ? j.severity === filterSeverity : true;
    const matchesSearch = j.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadgeClass = (severity: "Critical" | "High" | "Medium") => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200 font-bold";
      case "High":
        return "bg-orange-100 text-orange-850 border-orange-200 font-bold";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200 font-bold";
    }
  };

  const getPulseColorClass = (severity: "Critical" | "High" | "Medium") => {
    switch (severity) {
      case "Critical":
        return "bg-red-650 bg-red-600 text-red-600";
      case "High":
        return "bg-orange-500 text-orange-500";
      case "Medium":
        return "bg-amber-500 text-amber-500";
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
      <div id="hotspot-header" className="border-b border-slate-200 pb-5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5 uppercase font-display">
          <Map className="w-5 h-5 text-blue-600" />
          Bengaluru Incident Hotspot Map
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Spatial distribution of all 8,173 incident records across Bengaluru sectors. Hover or select individual nodes to retrieve live telemetry grids.
        </p>
      </div>

      {/* FILTER & FILTER STATUS ROW */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-150 bg-slate-100 p-4 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-slate-500 mr-1.5 uppercase">Quick Filters:</span>
          {[
            { label: "All Junctions", value: null, color: "border-slate-200 hover:bg-slate-200 text-slate-600 cursor-pointer" },
            { label: "Critical (>50)", value: "Critical", color: "border-red-200 hover:bg-red-50 text-red-700 cursor-pointer" },
            { label: "High (30–50)", value: "High", color: "border-orange-200 hover:bg-orange-50 text-orange-700 cursor-pointer" },
            { label: "Medium (15–30)", value: "Medium", color: "border-amber-200 hover:bg-amber-50 text-amber-700 cursor-pointer" },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={() => setFilterSeverity(btn.value)}
              className={`text-[10px] sm:text-[11px] px-3 py-1.5 rounded-lg border font-mono tracking-wider transition-all ${
                filterSeverity === btn.value
                  ? "bg-blue-600 border-blue-600 text-white font-black shadow-md"
                  : btn.color
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search junctions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-250 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-850 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-sans"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* INTERACTIVE VECTOR GRAPHICS MAP POINT GRID */}
        <div className="lg:col-span-12 xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 relative shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-450 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: "14s" }} />
              Operational Vector Grid Blueprint
            </h4>
            <span className="text-[10px] text-slate-450 font-mono font-semibold">Select a node to query spatial feedback</span>
          </div>

          {/* THE STYLIZED BENGALURU OPERATIONAL SVG MAP - Crisp Light Theme */}
          <div className="relative w-full aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
            {/* GRID LINES BACKDROP */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* ARTISTIC REGIONAL RINGS (ORR, etc.) */}
            <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
              {/* Outer Ring Road (ORR) Outline */}
              <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 4" />
              <circle cx="50%" cy="50%" r="38%" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="8 6" />

              {/* Major Highway Corridors */}
              <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#e2e8f0" strokeWidth="1" />
            </svg>

            {/* ZONE LABELS OVERLAY */}
            <div className="absolute top-6 left-6 text-[9.5px] font-mono text-slate-455 font-bold tracking-widest uppercase">North Zone (Yelahanka Sector)</div>
            <div className="absolute top-1/2 left-6 text-[9.5px] font-mono text-slate-455 font-bold tracking-widest uppercase">West Zone (Yeshwanthpur)</div>
            <div className="absolute bottom-6 right-6 text-[9.5px] font-mono text-slate-455 font-bold tracking-widest uppercase">South-East Zone (Silk Board Sector)</div>
            <div className="absolute top-1/2 right-6 text-[9.5px] font-mono text-slate-455 font-bold tracking-widest uppercase">East Zone (Whitefield Sector)</div>

            {/* NODES ITERATOR */}
            {filteredJunctions.map((node) => {
              const isSelected = selectedJunction?.id === node.id;
              const severityColor = getPulseColorClass(node.severity);
              const radiusSize = node.events > 50 ? "w-4 h-4" : node.events > 35 ? "w-3 h-3" : "w-2.5 h-2.5";
              const pulseSize = node.events > 50 ? "w-7 h-7" : node.events > 35 ? "w-5.5 h-5.5" : "w-4 h-4";

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedJunction(node)}
                  style={{ left: `${node.coordinates.x}%`, top: `${node.coordinates.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none z-10 cursor-pointer"
                >
                  {/* PULSING OUTER BOUNDARY */}
                  <div className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full opacity-35 animate-ping ${pulseSize} ${severityColor}`} />

                  {/* SOLID CENTER */}
                  <div className={`rounded-full transition-all border border-slate-900 ${radiusSize} ${severityColor} ${
                    isSelected ? "scale-[1.60] ring-4 ring-blue-600/20 shadow-lg" : "group-hover/node:scale-130"
                  }`} />

                  {/* MINI LABEL HOVER (OR IF SELECTED) */}
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded text-[10px] font-mono whitespace-nowrap bg-slate-900 border text-white transition-all shadow-md pointer-events-none ${
                    isSelected
                      ? "opacity-100 scale-105 z-25 border-blue-500"
                      : "opacity-0 group-hover/node:opacity-100 border-transparent"
                  }`}>
                    {node.name} ({node.events} events)
                  </div>
                </button>
              );
            })}

            {/* GPS COORD */}
            <div className="absolute bottom-4 left-4 p-2 bg-white/90 rounded-lg border border-slate-200 text-[10px] font-mono text-slate-500 flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Center GPS: 12.9716° N, 77.5946° E</span>
            </div>
          </div>

          {/* SELECTED NODE TELEMETRY CARD */}
          <AnimatePresence mode="wait">
            {selectedJunction && (
              <motion.div
                key={selectedJunction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-5 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 relative overflow-hidden text-left"
              >
                <div className="space-y-2 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase bg-blue-600/10 text-blue-700 border border-blue-150 px-2 py-0.5 rounded font-bold">
                      Spatial Telemetry Node
                    </span>
                    <span className={`text-[10px] font-bold font-mono border px-2 py-0.5 rounded-md ${getSeverityBadgeClass(selectedJunction.severity)}`}>
                      {selectedJunction.severity} Rank
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 mt-1.5 font-display">{selectedJunction.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">{selectedJunction.description}</p>
                </div>
                <div className="bg-white border border-slate-200 p-4 rounded-xl text-center min-w-[130px] flex-shrink-0 shadow-sm relative">
                  <span className="text-[10px] text-slate-450 font-mono tracking-wider block uppercase font-bold">Historical Events</span>
                  <span className="text-3xl font-black font-mono text-blue-650 block mt-1">{selectedJunction.events}</span>
                  <span className="text-[9px] text-slate-450 block font-sans">total records</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN - TOP 10 LIST & POLICE LOAD */}
        <div className="lg:col-span-12 xl:col-span-5 space-y-6">
          {/* TOP 10 JUNCTIONS LIST */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4 text-left border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest font-mono">Top Juntions Hotspot Rank</h3>
                <p className="text-[10px] text-slate-500">Click a record node to sync spatial telemetry</p>
              </div>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {filteredJunctions.map((j) => {
                const isSelected = selectedJunction?.id === j.id;
                return (
                  <button
                    key={j.id}
                    onClick={() => setSelectedJunction(j)}
                    className={`w-full text-left p-3 rounded-xl border text-xs flex justify-between items-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-600/10 border-blue-400 text-slate-900 font-bold shadow-sm"
                        : "bg-slate-50 border-slate-200/80 text-slate-600 hover:border-slate-350 hover:text-slate-900 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate font-medium">
                      <span className="font-mono text-[10px] text-slate-400">#{j.id}</span>
                      <span className="truncate">{j.name}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded ${getSeverityBadgeClass(j.severity)}`}>
                        {j.severity}
                      </span>
                      <span className="font-mono font-bold text-slate-800 min-w-[24px] text-right">{j.events}</span>
                    </div>
                  </button>
                );
              })}
              {filteredJunctions.length === 0 && (
                <div className="text-center p-6 text-slate-400 text-xs font-mono">
                  No junctions match search queries.
                </div>
              )}
            </div>
          </div>

          {/* POLICE STATION WORKLOADS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="border-b border-slate-100 pb-3 mb-4 text-left">
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest font-mono">Dispatch Station Workloads</h3>
              <p className="text-[10.5px] text-slate-500">Estimated case-density queues per precinct</p>
            </div>

            <div className="space-y-3.5">
              {POLICE_STATION_LOAD.map((station) => {
                const maxLoad = Math.max(...POLICE_STATION_LOAD.map((s) => s.loadValue));
                const barWidth = (station.loadValue / maxLoad) * 100;
                return (
                  <div key={station.name} className="space-y-1 text-left">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-700">{station.name} Station</span>
                      <span className="font-mono text-blue-650 font-bold">{station.loadValue} cases</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${barWidth}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-blue-600 rounded-full shadow-sm"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
