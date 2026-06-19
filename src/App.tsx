import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Layout, ShieldAlert, Award, Grid, Brain, Network, Map, Clock, Zap, Sun, Moon, Palette, Landmark } from "lucide-react";

import OverviewSection from "./components/OverviewSection";
import PredictSection from "./components/PredictSection";
import DeploySection from "./components/DeploySection";
import HotspotSection from "./components/HotspotSection";
import PostLearnSection from "./components/PostLearnSection";
import ArchSection from "./components/ArchSection";
import CopilotSection from "./components/CopilotSection"; // Dynamic AI copilot
import LiveAlertsTicker from "./components/LiveAlertsTicker";
import DebtSection from "./components/DebtSection";
import { ClickPopEffect } from "./components/ClickPopEffect";

type TabID = "overview" | "copilot" | "predict" | "congestion_debt" | "deploy" | "hotspot" | "post_event" | "arch";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabID>("overview");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [bgTheme, setBgTheme] = useState<"blue" | "yellow" | "white">("blue");

  // Synchronize dynamic body dark theme class for global CSS overrides
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const getBgClass = () => {
    if (isDarkMode) {
      return "bg-[#121927] text-slate-100 dark";
    }
    switch (bgTheme) {
      case "blue":
        return "bg-[#f1f3f6] text-flipkart-darkblue";
      case "yellow":
        return "bg-[#fffdeb] text-flipkart-darkblue";
      case "white":
        return "bg-[#ffffff] text-[#172337]";
    }
  };

  const statItems = [
    { label: "Historical events analysed", value: "8,173", targetTab: "overview" as TabID, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Planned events predictive load", value: "467", targetTab: "predict" as TabID, color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { label: "High priority zones covered", value: "10 Zones", targetTab: "hotspot" as TabID, color: "text-amber-700 bg-amber-50 border-amber-100" },
    { label: "Clearance resolution target", value: "64 min", targetTab: "post_event" as TabID, color: "text-cyan-700 bg-cyan-50 border-cyan-100" },
  ];

  const tabs = [
    { id: "overview" as TabID, label: "Live Overview", icon: Layout },
    { id: "copilot" as TabID, label: "AI Copilot Simulator", icon: Sparkles, highlight: true },
    { id: "predict" as TabID, label: "Predict Impact", icon: ShieldAlert },
    { id: "congestion_debt" as TabID, label: "Congestion Debt Engine", icon: Landmark },
    { id: "deploy" as TabID, label: "Deploy Recommendations", icon: Award },
    { id: "hotspot" as TabID, label: "Hotspot Map", icon: Map },
    { id: "post_event" as TabID, label: "Post-Event Learning", icon: Brain },
    { id: "arch" as TabID, label: "Architecture Specs", icon: Network },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSection />;
      case "copilot":
        return <CopilotSection />;
      case "predict":
        return <PredictSection />;
      case "congestion_debt":
        return <DebtSection />;
      case "deploy":
        return <DeploySection />;
      case "hotspot":
        return <HotspotSection />;
      case "post_event":
        return <PostLearnSection />;
      case "arch":
        return <ArchSection />;
    }
  };

  return (
    <div className={`min-h-screen ${getBgClass()} font-sans antialiased overflow-x-hidden selection:bg-flipkart-blue selection:text-white transition-colors duration-300`}>
      {/* GLOBAL MOUNT OF HAPTIC CLICK POP EFFECTS */}
      <ClickPopEffect />

      {/* GLOBAL BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-flipkart-blue/5 rounded-full blur-3xl pointer-events-none text-left" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-flipkart-yellow/5 rounded-full blur-3xl pointer-events-none text-left" />

      {/* FLIPKART DESIGNED TOP COMMAND BAR */}
      <div className="bg-[#172337] border-b border-slate-900 px-4 py-3.5 text-xs text-slate-300 font-mono tracking-wider flex justify-between items-center z-11 w-full relative">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-400 font-extrabold uppercase">FLIPKART GRIDLOCK OPERATIONAL HQ</span>
          <span className="text-slate-700">|</span>
          <span className="hidden sm:inline text-slate-300 font-bold">Node: BLR-ASTRAM-02</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-300">
          <span className="hidden md:inline font-semibold">Feed: ON_STANDBY_SECURE</span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="flex items-center gap-1.5 text-flipkart-yellow font-extrabold">
            <Clock className="w-3.5 h-3.5" />
            BENGALURU INTELLIGENCE CORE
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* LIGHT-THEME BACKGROUND CUSTOMIZER & DARK MODE SWITCH */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#064e3b] border border-[#047857]/40 p-4 rounded-xl shadow-sm z-10 relative text-white">
          <div className="text-left animate-fade-in">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="p-1 bg-white/10 text-emerald-300 rounded-md">
                <Palette className="w-4 h-4" />
              </span>
              Appearance Configuration Control
            </h4>
            <p className="text-[11px] text-emerald-100/90 mt-1">
              Toggle between Flipkart standard Light and Dark Theme mode.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Dark & Light toggle with icons */}
            <div className="flex items-center bg-[#022c22] p-1 rounded-xl border border-emerald-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setIsDarkMode(false)}
                className={`px-3 py-1.5 text-[10px] font-bold font-mono tracking-wide rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  !isDarkMode
                    ? "bg-flipkart-blue text-white shadow-sm font-black"
                    : "text-emerald-300 hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light Theme</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setIsDarkMode(true)}
                className={`px-3 py-1.5 text-[10px] font-bold font-mono tracking-wide rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-flipkart-yellow text-slate-900 shadow-sm font-black"
                    : "text-emerald-300 hover:text-white"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark Theme</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* HERO HEADER SECTION WITH FLIPKART STYLING & HERO IMAGE ACCENT */}
        <div id="hero-section" className="bg-[#ebf4ff] dark:bg-[#1c2638] border border-[#2874f0]/15 dark:border-[#2e3d54] rounded-3xl p-10 sm:p-12 lg:p-14 shadow-sm flex flex-col lg:flex-row justify-between items-center gap-10 relative overflow-hidden">
          <div className="space-y-5 max-w-2xl text-left">
            {/* Badge */}
            <div className="flex">
              <span className="px-3.5 py-1.5 rounded-lg text-[11px] font-black bg-flipkart-yellow text-[#172337] border border-amber-300 uppercase tracking-wider font-mono shadow-sm">
                Flipkart Gridlock 2.0 · Live Telemetry Protocol
              </span>
            </div>

            {/* Headline & Subtext */}
            <div className="space-y-3">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black tracking-tight text-[#172337] dark:text-white leading-none font-display whitespace-nowrap">
                TrafficSense <span className="text-flipkart-blue dark:text-amber-400 underline decoration-flipkart-yellow decoration-4">AI Bengaluru</span>
              </h1>
              <p className="text-slate-550 dark:text-slate-350 text-xs sm:text-sm leading-relaxed max-w-xl font-medium">
                Next-generation event-driven traffic intelligence for metropolitan Bengaluru. Predict bottleneck impacts, allocate dispatch officers dynamically, and generate AI routing mitigations.
              </p>
            </div>

            {/* KPI Display Metrics with Big Fonts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {statItems.map((stat) => (
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  key={stat.label}
                  onClick={() => setActiveTab(stat.targetTab)}
                  className={`p-4 rounded-2xl text-left transition-all border border-[#ebd03b] outline-none ${
                    activeTab === stat.targetTab 
                      ? "ring-2 ring-flipkart-blue bg-[#ffd91a] text-[#172337] border-[#ffd91a] shadow-md font-black" 
                      : "bg-[#ffe141]/95 text-[#172337] hover:bg-[#ffe141] dark:bg-[#d9b310]/15 dark:text-yellow-400 dark:border-amber-400/20"
                  } cursor-pointer group`}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold font-display text-clip-text text-[#172337] dark:text-yellow-300 tracking-tight group-hover:scale-105 transition-transform">
                    {stat.value}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-[#172337]/75 dark:text-yellow-450 uppercase mt-1.5 font-black font-mono tracking-wider">
                    <span>{stat.label.split(" ").slice(0, 2).join(" ")}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-flipkart-blue dark:text-yellow-400 tracking-normal transition-all text-xs">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* GENERATED HERO PHOTOGRAPH PORTRAYING HIGH-DEFINITION ACTION CO-PILOT ROOM */}
          <div className="w-full lg:w-[500px] xl:w-[550px] flex-shrink-0 relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-flipkart-blue/10 to-transparent rounded-2xl pointer-events-none" />
            <img
              src="/images/bengaluru_junction_real_1781584183618.jpg"
              alt="Bengaluru Traffic Control Command Operations Center"
              referrerPolicy="no-referrer"
              className="w-full h-[285px] object-cover rounded-2xl border border-slate-250 shadow-md"
            />
            <div className="absolute bottom-3 right-3 bg-flipkart-darkblue/90 border border-flipkart-yellow/40 text-[9.5px] font-mono text-white px-2.5 py-1 rounded-md shadow flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE FEED: HQ CTRL</span>
            </div>
          </div>
        </div>

        {/* REAL-TIME BENGALURU LIVE TRAFFIC ALERTS TICKER */}
        <LiveAlertsTicker />

        {/* FLIPKART NAVIGATION TAB BAR */}
        <div className="border-none w-full">
          <nav className="flex flex-wrap gap-2 p-2 bg-[#172337] rounded-2xl shadow-md">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                  }}
                  className={`px-4 py-3 text-[11px] font-bold font-mono tracking-wider cursor-pointer transition-all rounded-xl flex-1 flex items-center justify-center gap-2.5 border ${
                    isActive
                      ? "bg-flipkart-blue text-white shadow-md border-flipkart-blue"
                      : tab.highlight
                      ? "bg-flipkart-yellow text-flipkart-darkblue border-flipkart-yellow hover:bg-flipkart-yellow/90"
                      : "text-slate-300 hover:text-white hover:bg-white/10 border-transparent"
                  }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? "text-white" : tab.highlight ? "text-[#172337] animate-bounce" : "text-slate-400"}`} />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(" ")[0]}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* CONTAINER CONTENT STAGE */}
        <main className="min-h-[500px] border border-blue-100 dark:border-slate-850 bg-blue-50/40 dark:bg-slate-900/40 shadow-sm rounded-3xl p-6 sm:p-8 relative">
          {/* Subtle Dynamic Overlay decoration */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-flipkart-blue/5 rounded-tr-3xl" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER METADATA BAR (DARK AND PROFESSIONAL) */}
      <footer className="bg-[#172337] border-t border-slate-900 py-10 text-slate-400 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-left">
            <p className="font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-flipkart-yellow" />
              TrafficSense AI Bengaluru Operational Console
            </p>
            <p className="text-[10px] text-slate-500">Autonomous Congestion Intelligence Gridlock 2.0. Built with Flipkart Brand Alignment.</p>
          </div>
          <div className="flex gap-6 text-slate-500 text-[11px]">
            <span className="hover:text-flipkart-yellow transition-colors cursor-help">Telemetry Guide</span>
            <span>·</span>
            <span className="hover:text-flipkart-yellow transition-colors cursor-help">Astram Dataset Spec</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-help">Security Controls</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
