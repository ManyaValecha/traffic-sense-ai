import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, Clock, ShieldAlert, Award, Info, Camera, Tv, Video, Activity, Radio, Minimize2, Map, MapPin, Compass, Globe, RefreshCw, FileText, ExternalLink, TrendingUp, AlertTriangle } from "lucide-react";
import { CAUSES_BREAKDOWN, ZONE_LOAD, HOURLY_HEATMAP } from "../data";

export default function OverviewSection() {
  const [hoveredCause, setHoveredCause] = useState<string | null>(null);
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [selectedCam, setSelectedCam] = useState<"operations" | "dispatch" | "junction">("operations");
  const [zoneViewMode, setZoneViewMode] = useState<"map" | "list">("map");
  const [selectedZoneName, setSelectedZoneName] = useState<string>("Central Zone 2");

  const [bulletins, setBulletins] = useState<string>("");
  const [sources, setSources] = useState<{ title: string; uri: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);

  const fetchBulletins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini/traffic-bulletins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setBulletins(data.text);
        setSources(data.sources || []);
        setIsFallback(!!data.isFallback);
        
        // Format timestamp elegantly
        const dateObj = new Date(data.timestamp);
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastUpdated(formattedTime);
      } else {
        setError(data.error || "Failed to load bulletins.");
        setIsFallback(false);
      }
    } catch (err: any) {
      console.error(err);
      setError("Network or server connection issue while loading live search bulletins.");
      setIsFallback(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBulletins();
  }, []);

  const cameraSpecs = {
    operations: {
      name: "BLR-HQ-OPS: Central Control Room",
      img: "/images/bengaluru_ops_real_1781584200335.jpg",
      status: "ACTIVE",
      load: "High (HQ Dispatch active)",
      vehicleCount: "148 vehicles/min (Spike)",
      fps: "60 FPS",
      radar: "Radar Link Active",
      incidentCause: "Co-pilot actively fanning out intelligent recommendations.",
    },
    dispatch: {
      name: "BLR-POLICE-DISPATCH: Frontline Dispatch Terminal",
      img: "/images/bengaluru_dispatch_real_1781584218438.jpg",
      status: "STATIONED",
      load: "Nominal (Command room feed)",
      vehicleCount: "N/A (HQ Command Desk)",
      fps: "30 FPS",
      radar: "Microwave Link 24G",
      incidentCause: "Deployment personnel reviewing active barrier and timeline schedules.",
    },
    junction: {
      name: "BLR-SECTOR-09: Silk Board & Mekhri Circle Junction Drone",
      img: "/images/bengaluru_junction_real_1781584183618.jpg",
      status: "STREAMING",
      load: "Extreme (Bottleneck in lane 3)",
      vehicleCount: "294 vehicles/min (Heavy)",
      fps: "45 FPS",
      radar: "UAV Satellite Feed",
      incidentCause: "Water logging at underpass + breakdown causes 320m backup.",
    },
  };

  // Maximum values for normalization
  const maxCauseCount = Math.max(...CAUSES_BREAKDOWN.map((c) => c.count));
  const maxZoneCount = Math.max(...ZONE_LOAD.map((z) => z.count));
  const maxHeatmapCount = Math.max(...HOURLY_HEATMAP.map((h) => h.events));
  const minHeatmapCount = Math.min(...HOURLY_HEATMAP.map((h) => h.events));

  // Determine heat opacity based on event weight
  const getHeatColorClass = (events: number) => {
    const ratio = (events - minHeatmapCount) / (maxHeatmapCount - minHeatmapCount);
    if (ratio > 0.8) return "bg-red-600 border border-red-500 text-white font-extrabold shadow-sm";
    if (ratio > 0.6) return "bg-flipkart-orange border border-orange-400 text-white font-bold shadow-sm";
    if (ratio > 0.4) return "bg-flipkart-yellow border border-amber-300 text-slate-950 font-bold";
    if (ratio > 0.2) return "bg-blue-100 border border-blue-200 text-blue-950 font-medium";
    if (ratio > 0.1) return "bg-slate-100 border border-slate-200 text-slate-700";
    return "bg-slate-50 border border-slate-200/60 text-slate-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 text-slate-800"
    >
      {/* SECTION HEADER */}
      <div id="overview-header" className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-200 pb-5">
        <div className="text-left">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-flipkart-darkblue flex items-center gap-2.5 uppercase font-display">
            <span className="w-2.5 h-2.5 rounded-full bg-red-650 bg-red-600 animate-pulse inline-block" />
            Live Command Centre
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time snapshot of Bengaluru event-driver traffic — powered by{" "}
            <strong className="text-flipkart-blue">Astram Dataset</strong> of 8,173 structured records.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-650 font-mono font-bold">
          <Clock className="w-3.5 h-3.5 text-flipkart-blue" />
          <span>Sync Status: Core Online</span>
        </div>
      </div>

      {/* KPI CARDS WITH BIG FONTS */}
      <div id="overview-kpis" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            title: "Active Incidents",
            value: "1,007",
            status: "↑ 12% vs last week",
            statusColor: "text-red-750 bg-red-50 border-red-200 text-red-700",
            icon: AlertCircle,
            iconBg: "bg-red-50 text-red-600 border border-red-100",
            desc: "Active field logs in dispatcher queues"
          },
          {
            title: "High Priority",
            value: "5,030",
            status: "61.5% of all events",
            statusColor: "text-amber-750 bg-amber-50 border-amber-200 text-amber-800",
            icon: ShieldAlert,
            iconBg: "bg-amber-50 text-amber-650 border border-amber-100",
            desc: "Events flagged as critical dispatches"
          },
          {
            title: "Vehicle Breakdowns",
            value: "4,896",
            status: "Top cause (59.9%)",
            statusColor: "text-blue-800 bg-blue-50 border-blue-200 text-flipkart-blue",
            icon: Award,
            iconBg: "bg-blue-50 text-flipkart-blue border border-blue-105",
            desc: "Primary source of gridlock events"
          },
          {
            title: "Avg Resolution",
            value: "64 min",
            status: "↓ 8 min vs baseline",
            statusColor: "text-emerald-800 bg-emerald-50 border-emerald-250 text-emerald-800",
            icon: Clock,
            iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
            desc: "Median time to clear standard bottlenecks"
          }
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 flex flex-col justify-between border border-slate-200 shadow-sm hover:shadow-md transition-all group hover:border-flipkart-blue/20"
            >
              <div className="flex justify-between items-start text-left">
                <div>
                  <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest font-mono block">{kpi.title}</span>
                  <p className="text-3xl font-black font-display text-slate-900 mt-1 transition-colors group-hover:text-flipkart-blue">
                    {kpi.value}
                  </p>
                </div>
                <div className={`p-2.5 rounded-xl ${kpi.iconBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-1.5 text-left">
                <div className="flex items-center">
                  <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-md border ${kpi.statusColor}`}>
                    {kpi.status}
                  </span>
                </div>
                <span className="text-[11px] text-slate-505 text-slate-500 leading-relaxed font-sans">{kpi.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* DISPATCH ALERTS GRID */}
      <div id="overview-alerts" className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ALERT 1 - CRITICAL */}
        <div className="p-5 rounded-2xl border border-orange-200/80 bg-orange-50 text-orange-950 relative overflow-hidden shadow-sm text-left">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black text-orange-700 uppercase font-display tracking-wider">Critical — Mekhri Circle</span>
            <span className="text-[10px] font-mono font-bold text-orange-650 bg-orange-100 border border-orange-200 px-1.5 py-0.5 rounded">64 incidents</span>
          </div>
          <p className="text-xs text-slate-650 leading-relaxed pt-1 font-sans font-medium">
            Recommend pre-deployment of 4 officers + clear diversion messaging ahead of any upcoming festivals.
          </p>
        </div>

        {/* ALERT 2 - AMBER */}
        <div className="p-5 rounded-2xl border border-orange-200 bg-orange-50 text-orange-950 relative overflow-hidden shadow-sm text-left">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-black text-flipkart-orange uppercase font-display tracking-wider">Peak surge — 21:00 HRS</span>
            <span className="text-[10px] font-mono font-bold text-orange-700 bg-orange-100 border border-orange-200 px-1.5 py-0.5 rounded">810 events</span>
          </div>
          <p className="text-xs text-slate-650 leading-relaxed pt-1 font-sans font-medium">
            Vehicle breakdown + road pavement distress events trigger simultaneously nightly at this hour.
          </p>
        </div>
      </div>

      {/* GOOGLE SEARCH GROUNDED TRAFFIC INTELLIGENCE BULLETINS */}
      <div id="grounded-traffic-bulletins" className="bg-[#4169e1] border border-blue-400/40 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left text-white">
        {/* Decorative background visualizers */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-blue-300/30 gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-950/40 border border-blue-300/30 text-[#ffd91a] rounded-xl flex-shrink-0">
              <Globe className="w-5 h-5 animate-spin" style={{ animationDuration: '30s' }} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isFallback ? "bg-amber-400" : "bg-emerald-400"}`} />
                <span className={`text-[9px] font-mono font-black uppercase tracking-widest ${isFallback ? "text-amber-300" : "text-emerald-300"}`}>
                  {isFallback ? "Grounded Telemetry Fallback engaged" : "Google Search Grounding Engine Active"}
                </span>
              </div>
              <h3 className="text-base font-black text-white font-display mt-0.5 uppercase tracking-wide">
                Bengaluru Daily Dispatch Bulletins
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {lastUpdated && (
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950/60 border border-slate-850 px-2.5 py-1 rounded-md">
                SYNCED: {lastUpdated}
              </span>
            )}
            <motion.button
              whileHover={loading ? {} : { scale: 1.04 }}
              whileTap={loading ? {} : { scale: 0.96 }}
              onClick={fetchBulletins}
              disabled={loading}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                loading
                  ? "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-blue-650 border-blue-550 hover:bg-blue-600 text-white shadow-lg bg-blue-600 border-blue-500 hover:brightness-110"
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-slate-500" : "text-[#ffd91a]"}`} />
              <span>{loading ? "SEARCHING..." : "SYNC DISPATCH"}</span>
            </motion.button>
          </div>
        </div>

        {/* BULLETINS CONTENT */}
        <div className="mt-5 relative z-10">
          {loading ? (
            <div className="space-y-4 py-6">
              <div className="flex items-center gap-3 text-xs text-blue-100 font-mono">
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>Scanning Google Search index for real-time Bengaluru Traffic Police (BTP) advisories, flood warnings, and transit bottlenecks...</span>
              </div>
              <div className="space-y-2.5">
                <div className="h-3.5 bg-blue-300/20 rounded w-3/4 animate-pulse" />
                <div className="h-3.5 bg-blue-300/20 rounded w-11/12 animate-pulse" />
                <div className="h-3.5 bg-blue-300/20 rounded w-5/6 animate-pulse" />
                <div className="h-3.5 bg-blue-300/20 rounded w-2/3 animate-pulse" />
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-950/40 border border-red-900/40 p-4 rounded-xl text-red-200 text-xs">
              <p className="font-bold uppercase tracking-wider text-red-400">Intelligence Link Interrupted</p>
              <p className="mt-1 font-mono">{error}</p>
              <button
                onClick={fetchBulletins}
                className="mt-3.5 px-3 py-1.5 bg-red-900/60 hover:bg-red-800 border border-red-700 text-white rounded-lg transition-all font-mono text-[10px] font-extrabold uppercase tracking-wide cursor-pointer"
              >
                Force Recalibrate
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="bg-blue-950/40 border border-blue-400/30 p-5 rounded-2xl text-blue-50 font-sans tracking-wide leading-relaxed text-[13px] whitespace-pre-wrap text-left">
                {bulletins ? bulletins : "Initializing search-grounded traffic feeds. Use 'Sync Dispatch' to manually trigger lookup."}
              </div>

              {/* CITATIONS BAR */}
              {sources.length > 0 && (
                <div className="pt-4 border-t border-blue-400/30">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-blue-200 uppercase tracking-widest mb-3.5 font-black">
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>Google Grounded Sources ({sources.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-blue-950/50 hover:bg-blue-950/75 border border-blue-400/30 hover:border-blue-300/50 rounded-lg px-2.5 py-1 text-[10.5px] font-mono text-blue-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3 h-3 text-blue-300" />
                        <span className="max-w-[280px] truncate">{src.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CORRIDOR STRESS SCORE */}
      <div id="corridor-stress-score-panel" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm text-left">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/50 text-flipkart-blue dark:text-blue-400 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white font-display uppercase tracking-wider">
              Live Corridor Stress Index
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Every major Bengaluru corridor scored 0–100 in real time. Composite of incident density, time-of-day multiplier, and active event overlap.
            </p>
          </div>
        </div>

        {/* SCORE CARDS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { 
              name: "Tumkur Road (NH-48)", 
              score: 87, 
              status: "🔴 Critical", 
              events: 3, 
              alert: true,
              imageUrl: "/images/tumkur_road_real_aerial_1781668663147.jpg"
            },
            { 
              name: "Outer Ring Road East", 
              score: 74, 
              status: "🟠 High", 
              events: 2, 
              alert: false,
              imageUrl: "/images/regenerated_image_1781668359372.png"
            },
            { 
              name: "Bellary Road", 
              score: 68, 
              status: "🟠 High", 
              events: 1, 
              alert: false,
              imageUrl: "/images/bellary_road_flyover_elevation_1781668884669.jpg"
            },
            { 
              name: "Mysore Road", 
              score: 61, 
              status: "🟡 Moderate", 
              events: 2, 
              alert: false,
              imageUrl: "/images/mysore_road_expressway_scenic_1781669283119.jpg"
            },
            { 
              name: "Old Madras Road", 
              score: 54, 
              status: "🔵 Moderate", 
              events: 1, 
              alert: false,
              imageUrl: "/images/old_madras_road_sign_highway_1781669527164.jpg"
            },
            { 
              name: "Hosur Road (NH-44)", 
              score: 41, 
              status: "🟢 Low", 
              events: 0, 
              alert: false,
              imageUrl: "/images/hosur_road_elevated_expressway_1781669641543.jpg"
            },
            { 
              name: "Magadi Road", 
              score: 38, 
              status: "🟢 Low", 
              events: 1, 
              alert: false,
              imageUrl: "/images/magadi_road_toll_plaza_1781669763822.jpg"
            },
            { 
              name: "Bannerghatta Road", 
              score: 29, 
              status: "🟢 Clear", 
              events: 0, 
              alert: false,
              imageUrl: "/images/bannerghatta_road_street_1781669900103.jpg"
            },
          ].map((corridor, idx) => {
            const getColorClasses = (score: number) => {
              if (score >= 80) return {
                bg: "bg-red-50 dark:bg-red-955/20 border-red-200 dark:border-red-900/60",
                text: "text-red-700 dark:text-red-400",
                bar: "bg-red-500"
              };
              if (score >= 60) return {
                bg: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900/40",
                text: "text-orange-700 dark:text-orange-400",
                bar: "bg-orange-500"
              };
              if (score >= 50) return {
                bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40",
                text: "text-blue-700 dark:text-blue-400",
                bar: "bg-blue-500"
              };
              return {
                bg: "bg-slate-50 dark:bg-slate-900/40 border-slate-205 dark:border-slate-800",
                text: "text-slate-600 dark:text-slate-400",
                bar: "bg-emerald-500"
              };
            };

            const styles = getColorClasses(corridor.score);

            return (
              <div 
                key={idx}
                className={`rounded-2xl border transition-all hover:shadow-md ${styles.bg} relative overflow-hidden flex flex-col justify-between h-full group`}
              >
                {/* Road Cover Image */}
                <div className="relative h-28 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-800">
                  <img 
                    src={corridor.imageUrl} 
                    alt={corridor.name} 
                    className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                  
                  {corridor.alert && (
                    <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-400 dark:text-slate-500">
                      Corridor Sector
                    </span>
                    <h4 className="text-sm font-black text-slate-800 dark:text-white mt-0.5 truncate" title={corridor.name}>
                      {corridor.name}
                    </h4>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                      {corridor.score}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      /100
                    </span>
                  </div>

                  <div className="space-y-2">
                    {/* Micro bar visualizer */}
                    <div className="h-1.5 w-full bg-slate-200/60 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${styles.bar}`} style={{ width: `${corridor.score}%` }} />
                    </div>

                    <div className="flex justify-between items-center text-[10.5px] font-mono select-none">
                      <span className={`font-bold ${styles.text}`}>
                        {corridor.status}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">
                        {corridor.events} {corridor.events === 1 ? "Active Event" : "Active Events"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INSIGHTS FOOTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          {/* Key insight box */}
          <div className="lg:col-span-12 bg-blue-50 dark:bg-blue-950/25 p-4 rounded-2xl border border-blue-100 dark:border-blue-900/60 flex flex-col gap-2.5">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-405 rounded-lg mt-0.5 flex-shrink-0">
                <AlertTriangle className="w-4 h-4 text-flipkart-blue dark:text-blue-300" />
              </div>
              <div className="text-[11.5px] leading-relaxed">
                <span className="font-mono text-[9px] font-black uppercase text-flipkart-blue dark:text-blue-400 tracking-wider block mb-0.5">
                  Dispatch Tactical Insight
                </span>
                <p className="text-slate-700 dark:text-slate-350">
                  <strong className="text-slate-900 dark:text-white">Tumkur Road</strong> carries 3 simultaneous active events — statistically the highest co-occurrence in the dataset. Recommend immediate diversion activation to NICE Road.
                </p>
              </div>
            </div>
            
            {/* EMERGENCY VEHICLE IMPACT METRICS */}
            <div className="mt-1 pt-2.5 border-t border-blue-200/50 dark:border-blue-900/40 text-[11.5px] leading-relaxed bg-white/60 dark:bg-slate-900/40 p-2.5 rounded-xl">
              <div className="flex items-center gap-1.5 font-mono text-[9.5px] font-black text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
                <span className="animate-pulse">🔴</span>
                <span>Corridor Emergency Transit Delay</span>
              </div>
              <p className="text-slate-705 text-slate-700 dark:text-slate-300">
                During the <span className="font-semibold text-slate-900 dark:text-white">21:00–22:30 peak window</span>, ambulance response time on the <span className="font-semibold text-slate-905 dark:text-slate-100">Tumkur Road corridor</span> increases by an estimated <strong className="text-red-650 dark:text-red-400 font-extrabold">8.4 minutes</strong>. With our full deployment plan, this delay drops to <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">2.1 minutes</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC CCTV CAMERA VISUAL FEED BOX (MOST INTERACTIVE PROTOTYPE IMAGE ENGINE) */}
      <div id="cctv-interactive-visualizer" className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-slate-150 gap-4">
          <div className="text-left">
            <span className="text-[9px] font-mono font-black text-flipkart-blue uppercase bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              Interactive Hardware Integrator
            </span>
            <h3 className="text-base font-black text-flipkart-darkblue tracking-tight font-display mt-1.5 flex items-center gap-1.5">
              <Camera className="w-5 h-5 text-flipkart-blue" />
              Live Bengaluru CCTV Visual Feed simulation (Astram Grid)
            </h3>
          </div>
          
          {/* CAMERA FEED TOGGLE */}
          <div className="flex bg-[#f1f3f6] p-1.5 rounded-xl border border-slate-205 gap-1.5 w-full md:w-auto">
            {(["operations", "dispatch", "junction"] as const).map((camKey) => (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                key={camKey}
                onClick={() => setSelectedCam(camKey)}
                className={`flex-1 md:flex-none text-[10px] font-mono font-extrabold px-3 py-2 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCam === camKey
                    ? "bg-flipkart-blue text-white shadow-md font-black"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {camKey === "operations" ? "HQ Control Room" : camKey === "dispatch" ? "Dispatch Desks" : "Aerial Flyover Drone"}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-stretch">
          {/* CAMERA VIEWER WINDOW */}
          <div className="lg:col-span-8 bg-[#172337] rounded-2xl relative overflow-hidden border border-slate-800 h-[280px] sm:h-[340px] flex flex-col justify-between group shadow-inner">
            {/* Camera Visual */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedCam}
                src={cameraSpecs[selectedCam].img}
                alt={cameraSpecs[selectedCam].name}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
              />
            </AnimatePresence>

            {/* SCANNER OVERLAY */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-emerald-400/35 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-bounce pointer-events-none" />

            {/* HEADER METRICS (SIMULATION OVERLAY) */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-mono text-[9px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                <span>REC LIVE</span>
              </div>
              <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-mono text-[9px] flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                <span>{cameraSpecs[selectedCam].radar}</span>
              </div>
            </div>

            {/* BOTTOM SPECS INSIDE VIDEO */}
            <div className="absolute bottom-4 inset-x-4 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 rounded-xl text-left pointer-events-none z-10 border border-white/5 space-y-1">
              <span className="text-[10px] font-mono text-flipkart-yellow font-bold uppercase tracking-wider block">
                {cameraSpecs[selectedCam].name}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-300 font-mono">
                <div>FEED FPS: <strong className="text-green-400">{cameraSpecs[selectedCam].fps}</strong></div>
                <div>BANDWIDTH: <strong className="text-white">LTE-BTP</strong></div>
                <div>STATUS: <strong className="text-white">{cameraSpecs[selectedCam].status}</strong></div>
                <div>LOAD INDEX: <strong className="text-orange-400">{cameraSpecs[selectedCam].load}</strong></div>
              </div>
            </div>
          </div>

          {/* TELEMETRY READOUT PANES */}
          <div className="lg:col-span-4 bg-[#4169e1] border border-blue-400/35 rounded-2xl p-5 flex flex-col justify-between text-left text-white shadow-md">
            <div className="space-y-4">
              <h4 className="text-[10px] font-mono font-black text-blue-100/90 uppercase tracking-widest border-b border-blue-400/40 pb-2">
                CCTV FEED DATA SPECIFICATION
              </h4>
              
              <div className="space-y-3 font-sans text-xs">
                <div>
                  <span className="text-blue-200 text-[10px] uppercase font-mono block">Selected Camera Sensor</span>
                  <strong className="text-white font-bold text-sm block mt-0.5">{selectedCam === "operations" ? "Live HQ Commander Console" : selectedCam === "dispatch" ? "Dispatch Field Comm Desk" : "Drone Sector Flyover-9"}</strong>
                </div>

                <div>
                  <span className="text-blue-200 text-[10px] uppercase font-mono block">Traffic Sensed Metric</span>
                  <strong className="text-yellow-300 font-bold text-base block mt-0.5">{cameraSpecs[selectedCam].vehicleCount}</strong>
                </div>

                <div>
                  <span className="text-blue-200 text-[10px] uppercase font-mono block">Dynamic Feed Diagnostic</span>
                  <p className="text-white leading-relaxed mt-1">{cameraSpecs[selectedCam].incidentCause}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-400/40 text-[10.5px] text-blue-100/90 flex items-center gap-1.5 mt-3.5">
              <Activity className="w-4 h-4 text-yellow-300 animate-pulse flex-shrink-0" />
              <span>Simulated telemetry from real grid nodes. Validated with Flipkart Gold quality checks.</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div id="overview-charts" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CAUSES BREAKDOWN */}
        <div className="bg-[#ffd91a] border border-amber-400 rounded-2xl p-6 relative shadow-md text-slate-900">
          <div className="flex justify-between items-center mb-5 border-b border-amber-950/15 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-slate-950 font-sans uppercase tracking-wider">Event Causes Breakdown</h3>
              <p className="text-xs text-slate-800 mt-0.5">Astram historical classification densities</p>
            </div>
            {hoveredCause && (
              <motion.div
                layout
                className="bg-slate-900 text-white rounded-lg px-2.5 py-1 text-xs font-mono font-bold"
              >
                {hoveredCause}
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            {CAUSES_BREAKDOWN.map((cause) => {
              const widthPct = (cause.count / maxCauseCount) * 100;
              const isHovered = hoveredCause === cause.name;
              return (
                <div
                  key={cause.name}
                  className="space-y-1.5 cursor-default"
                  onMouseEnter={() => setHoveredCause(`${cause.name}: ${cause.count.toLocaleString()} events`)}
                  onMouseLeave={() => setHoveredCause(null)}
                >
                  <div className="flex justify-between text-xs font-semibold select-none">
                    <span className="text-slate-900 hover:text-black transition-colors">{cause.name}</span>
                    <span className="text-slate-950 font-mono font-bold">{cause.count.toLocaleString()}</span>
                  </div>
                  <div className="h-6 w-full bg-black/10 rounded-xl overflow-hidden border border-black/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ backgroundColor: cause.color }}
                      className={`h-full rounded-xl ${isHovered ? "brightness-120 shadow-md" : ""}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 text-[11px] text-slate-800 text-right font-mono">
            *N = 8,173 verified events categorized
          </div>
        </div>

        {/* ZONE INCIDENT LOAD / MAP TYPE VIEW */}
        <div className="bg-[#1d4ed8] dark:bg-[#1e3a8a] border border-blue-400/50 dark:border-blue-900 rounded-2xl p-6 relative shadow-md flex flex-col justify-between text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 border-b border-blue-400/30 pb-3 gap-3">
            <div>
              <h3 className="text-sm font-extrabold text-white font-sans uppercase tracking-wider flex items-center gap-1.5">
                <Map className="w-4 h-4 text-[#ffd91a]" />
                Bengaluru Sector Load Map
              </h3>
              <p className="text-xs text-blue-100/90 mt-0.5">Interactive spatial sector distribution analysis</p>
            </div>
            
            {/* Toggles between Map type and List type view */}
            <div className="flex bg-blue-900/60 p-0.5 rounded-lg border border-blue-400/40">
              <button
                type="button"
                onClick={() => setZoneViewMode("map")}
                className={`px-3 py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition-all ${
                  zoneViewMode === "map"
                    ? "bg-[#ffd91a] text-slate-900 shadow-sm border border-amber-300"
                    : "text-blue-150 hover:text-white"
                }`}
              >
                🗺️ Spatial Map
              </button>
              <button
                type="button"
                onClick={() => setZoneViewMode("list")}
                className={`px-3 py-1 text-[10px] font-mono font-bold rounded cursor-pointer transition-all ${
                  zoneViewMode === "list"
                    ? "bg-[#ffd91a] text-slate-900 shadow-sm border border-amber-300"
                    : "text-blue-150 hover:text-white"
                }`}
              >
                📊 Load List
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {zoneViewMode === "map" ? (
              <motion.div
                key="map-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left"
              >
                {/* INTERACTIVE COMPACT VECTOR GRAPHICS MAP POINT GRID */}
                <div className="relative w-full aspect-[4/3] bg-blue-950/80 dark:bg-slate-950 rounded-xl border border-blue-400/40 overflow-hidden flex items-center justify-center shadow-inner">
                  {/* GRID LINES BACKDROP */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />

                  {/* ARTISTIC CO-CONCENTRIC RADAR RINGS */}
                  <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
                    <circle cx="50%" cy="50%" r="20%" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="3 4" />
                    <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="6 4" />
                    <line x1="50%" y1="0%" x2="50%" y2="100%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="1 1" className="opacity-40" />
                    <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#3b82f6" strokeWidth="1" strokeDasharray="1 1" className="opacity-40" />
                  </svg>

                  {/* DUSTY COMPASS GRID INTRO */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[8.5px] font-mono text-blue-200 uppercase tracking-widest font-black">
                    <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "18s" }} />
                    <span>Astra Spatial Telemetry Core</span>
                  </div>

                  {/* GEOGRAPHICAL REGIONS OVERLAY BOUNDS */}
                  <div className="absolute top-4 right-4 text-[8px] font-mono text-blue-200 font-bold tracking-wider">DEV CLUSTER: ACTIVE</div>

                  {/* SECTOR NODE BUBBLES */}
                  {[
                    { name: "Central Zone 2", cx: "50%", cy: "48%", r: 22, label: "Central", desc: "MG Road & CBD", severity: "Critical", count: 623, badge: "bg-red-500" },
                    { name: "West Zone 1", cx: "26%", cy: "39%", r: 20, label: "West 1", desc: "Yeshwanthpur logistics", severity: "High", count: 433, badge: "bg-orange-500" },
                    { name: "North Zone 2", cx: "50%", cy: "31%", r: 19, label: "North 2", desc: "Hebbal Corridor link", severity: "High", count: 413, badge: "bg-orange-500" },
                    { name: "West Zone 2", cx: "24%", cy: "68%", r: 18, label: "West 2", desc: "Mysore Exit transit", severity: "Medium", count: 358, badge: "bg-amber-500" },
                    { name: "South Zone 2", cx: "71%", cy: "76%", r: 21, label: "South 2", desc: "Silk Board & IT Loop", severity: "Medium", count: 354, badge: "bg-amber-550" },
                    { name: "North Zone 1", cx: "50%", cy: "15%", r: 16, label: "North 1", desc: "Yelahanka sector", severity: "Medium", count: 318, badge: "bg-blue-500" },
                    { name: "East Zone 1", cx: "78%", cy: "45%", r: 18, label: "East 1", desc: "Whitefield IT belt", severity: "Medium", count: 253, badge: "bg-cyan-500" },
                    { name: "South Zone 1", cx: "50%", cy: "64%", r: 16, label: "South 1", desc: "Jayanagar interior", severity: "Medium", count: 233, badge: "bg-emerald-500" },
                  ].map((geom) => {
                    const isSelected = selectedZoneName === geom.name;
                    const maxScale = geom.count / 623;
                    const redHeat = maxScale > 0.8 ? "bg-red-500/15 text-red-400 border-red-500 dark:border-red-600 text-red-400" :
                                    maxScale > 0.6 ? "bg-orange-500/15 text-orange-400 border-orange-500 dark:border-orange-500 text-orange-450" :
                                    maxScale > 0.4 ? "bg-amber-500/15 text-amber-400 border-amber-400 dark:border-amber-400 text-amber-400" :
                                    "bg-blue-500/15 text-blue-400 border-blue-400 dark:border-blue-500 text-blue-400";

                    return (
                      <button
                        key={geom.name}
                        type="button"
                        onClick={() => setSelectedZoneName(geom.name)}
                        style={{ left: geom.cx, top: geom.cy }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group/nodepoint cursor-pointer z-10 focus:outline-none"
                      >
                        {/* Ping radar if selected or critical */}
                        {(isSelected || geom.severity === "Critical") && (
                          <span className={`absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full opacity-35 animate-ping w-8 h-8 ${
                            geom.severity === "Critical" ? "bg-red-500" : "bg-blue-400"
                          }`} />
                        )}

                        {/* Interactive circle */}
                        <div 
                          className={`rounded-full transition-all border w-6 h-6 flex items-center justify-center text-[8.5px] font-mono font-black ${redHeat} ${
                            isSelected 
                              ? "scale-[1.5] ring-4 ring-[#ffd91a]/30 shadow-md border-[#ffd91a] bg-blue-900" 
                              : "hover:scale-125 hover:bg-blue-900 bg-white/95"
                          }`}
                          title={`${geom.name}: ${geom.count} cases`}
                        >
                          {geom.label[0]}
                        </div>

                        {/* Subtle tag overlay */}
                        <span className={`absolute left-4.5 top-1/2 -translate-y-1/2 ml-1 text-[8.5px] font-mono font-black py-0.5 px-1.5 rounded transition-all whitespace-nowrap shadow-sm border ${
                          isSelected 
                            ? "opacity-100 scale-105 bg-slate-900 border-slate-950 text-white" 
                            : "opacity-0 group-hover/nodepoint:opacity-100 bg-white border-slate-205 text-slate-800 pointer-events-none"
                        }`}>
                          {geom.label}: {geom.count}
                        </span>
                      </button>
                    );
                  })}

                  {/* GPS LEGEND */}
                  <div className="absolute bottom-3 left-3 p-1.5 bg-blue-900/90 rounded-lg border border-blue-450 text-[8.5px] font-mono text-blue-105 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400 animate-bounce" />
                    <span className="text-white">Radial Spatial Map Control</span>
                  </div>
                </div>

                {/* DYNAMIC TELEMETRY FOOTNOTE OF SELECTED SECTOR */}
                {(() => {
                  const activeGeom = [
                    { name: "Central Zone 2", label: "Central", desc: "MG Road, Cubbon Park, and CBD sector. Extreme daily office vehicle saturation.", severity: "Critical", count: 623, action: "Re-route inbound delivery vehicles via outer loops; adjust metro-transit coordination schedules." },
                    { name: "West Zone 1", label: "West 1", desc: "Yeshwanthpura and Rajajinagar transport hubs. Heavy delivery and freight conflicts.", severity: "High", count: 433, action: "Implement freight-entry restriction bands between 17:00 and 21:00." },
                    { name: "North Zone 2", label: "North 2", desc: "Hebbal Flyover and Outer Ring road connection. Critical airport commute corridor.", severity: "High", count: 413, action: "Activate physical lanes barrier allocation; prioritize airport shuttle lanes dynamic greening." },
                    { name: "West Zone 2", label: "West 2", desc: "Mysore road outbound arterial, toll gate queues, Kengeri sub-grid bottlenecking.", severity: "Medium", count: 358, action: "Pre-deploy towing payloads near underpass points to accelerate vehicle breakdown extraction." },
                    { name: "South Zone 2", label: "South 2", desc: "Silk Board junction and Electronic City corridor. Dense corporate IT park transit.", severity: "Medium", count: 354, action: "Employ peak timing signals index optimization (~22s excess queue clearance window code)." },
                    { name: "North Zone 1", label: "North 1", desc: "Yelahanka aerospace and residential sub-district. Standard airport approach loops.", severity: "Medium", count: 318, action: "Ensure radar microwave line status checks operate smoothly." },
                    { name: "East Zone 1", label: "East 1", desc: "Whitefield, Marathahalli IT zone load. Continuous construction & bottleneck risk.", severity: "Medium", count: 253, action: "Enforce bypass signaling for heavy commercial trucks during night construction." },
                    { name: "South Zone 1", label: "South 1", desc: "Jayanagar, JP Nagar premium zones. Intermittent bottlenecks at signal junctions.", severity: "Medium", count: 233, action: "Deploy auxiliary bicycle patrol team for immediate signal coordination." },
                  ].find(g => g.name === selectedZoneName) || { name: "Central Zone 2", desc: "", severity: "Critical", count: 623, action: "" };

                  return (
                    <div className="bg-blue-950/70 dark:bg-slate-950/40 p-4 rounded-xl border border-blue-400/35 space-y-2.5">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono uppercase bg-[#ffd91a] text-slate-900 border border-amber-300 px-1.5 py-0.5 rounded font-black">
                            Selected Segment Telemetry
                          </span>
                          <span className={`text-[9px] font-mono uppercase border px-1.5 py-0.5 rounded-md font-bold bg-white/10 text-white border-white/20`}>
                            {activeGeom.severity} Load
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-yellow-300">
                          {activeGeom.count} historical cases
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold text-white">{activeGeom.name}</h4>
                      <p className="text-[11px] text-blue-100 leading-relaxed font-sans">{activeGeom.desc}</p>
                      
                      <div className="pt-2 border-t border-blue-800 text-[11px] text-yellow-300 font-semibold leading-relaxed">
                        <strong className="text-white uppercase font-mono text-[9px] block mb-0.5">Tactical Command recommendation</strong>
                        {activeGeom.action}
                      </div>
                    </div>
                  );
                })()}

              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 text-left text-white"
              >
                <div className="space-y-4">
                  {ZONE_LOAD.map((z) => {
                    const widthPct = (z.count / maxZoneCount) * 100;
                    const isHovered = hoveredZone === z.name;
                    return (
                      <div
                        key={z.name}
                        className="space-y-1.5 cursor-default"
                        onMouseEnter={() => setHoveredZone(`${z.name}: ${z.count} records`)}
                        onMouseLeave={() => setHoveredZone(null)}
                      >
                        <div className="flex justify-between text-xs font-semibold select-none">
                          <span className="text-white">{z.name}</span>
                          <span className="text-yellow-300 font-mono font-bold">{z.count}</span>
                        </div>
                        <div className="h-2 w-full bg-blue-900/50 rounded-full overflow-hidden border border-blue-400/30">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${widthPct}%` }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                            className={`h-full rounded-full bg-[#ffd91a] ${isHovered ? "bg-yellow-300 shadow-sm" : ""}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 text-[11px] text-blue-150 text-right font-mono">
                  *Representative of analyzed records (3,129 tagged zones)
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* HEATMAP GRID SUMMARY */}
      <div id="overview-heatmap" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 pb-4 border-b border-slate-150">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900 font-sans uppercase tracking-wider">Hourly Incident Heatmap — 24 Hrs Cycle</h3>
            <p className="text-xs text-slate-500 mt-0.5">Distribution of events in dataset by 24h cycle (darker blocks = higher loads)</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 font-medium">
            <span className="text-slate-400">Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-slate-50 border border-slate-200/60" />
              <span className="text-slate-650 text-[10px]">Low (&lt;100)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-200" />
              <span className="text-slate-650 text-[10px]">Moderate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 border border-amber-300" />
              <span className="text-slate-650 text-[10px]">Peak Surge</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-red-605 bg-red-600" />
              <span className="text-slate-650 text-[10px]">Extreme (&gt;600)</span>
            </div>
          </div>
        </div>

        {/* HEAT GRID */}
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-3">
          {HOURLY_HEATMAP.map((item) => {
            const label = item.hour.toString().padStart(2, "0") + ":00";
            const isHovered = hoveredHour === item.hour;
            return (
              <div
                key={item.hour}
                onMouseEnter={() => setHoveredHour(item.hour)}
                onMouseLeave={() => setHoveredHour(null)}
                className={`relative rounded-xl p-3 flex flex-col justify-between items-center transition-all cursor-pointer h-20 ${getHeatColorClass(
                  item.events
                )} ${isHovered ? "scale-105 border-slate-600 shadow-md z-10" : ""}`}
              >
                <span className="text-[10px] font-mono tracking-wider block opacity-85">{label}</span>
                <span className="text-sm sm:text-base font-extrabold font-mono mt-1.5 block">{item.events}</span>
                <span className="text-[9px] block opacity-70">events</span>

                {isHovered && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 border border-slate-950 text-[11px] text-white px-3 py-2 rounded-lg whitespace-nowrap shadow-xl z-20">
                    <p className="font-bold">{label} — {item.events} Events</p>
                    <p className="text-[10px] text-slate-350 mt-0.5">
                      {item.hour === 21 ? "⭐ Day Peak Surge Point" : `Load: ${Math.round((item.events / maxHeatmapCount)*100)}% of Max`}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 mt-5 text-[11.5px] text-amber-800 bg-amber-50 px-4 py-3 rounded-xl border border-amber-250 p-4">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span><strong>Surge Window Insight:</strong> The massive surge spikes between 19:00 hrs (578), 20:00 hrs (681) and 21:00 hrs (810) indicate heavy commercial freight overlays, transit breakdowns and corporate back-to-office load convergences.</span>
        </div>
      </div>
    </motion.div>
  );
}
