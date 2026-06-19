import { useState, useMemo, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Landmark, Info, ShieldAlert, Sparkles, TrendingDown, 
  Settings, RefreshCw, Calendar, CheckSquare, Plus, Minus,
  AlertTriangle, FileText, ArrowRight, Zap, Target
} from "lucide-react";

interface JunctionDebt {
  name: string;
  score: number;
  daysAccumulating: number;
  rootCause: string;
  overrun: number; // overrun in minutes
  missedLogs: number;
  underdeployed: number;
  daysSinceClean: number;
  consecutiveHigh: number;
}

const DEFAULT_JUNCTIONS: JunctionDebt[] = [
  { 
    name: "Jalahalli Cross", 
    score: 847, 
    daysAccumulating: 11, 
    rootCause: "Unresolved heavy water logging resulting in a 380-minute travel delay.",
    overrun: 108,
    missedLogs: 1,
    underdeployed: 2,
    daysSinceClean: 11,
    consecutiveHigh: 1
  },
  { 
    name: "Mekhri Circle", 
    score: 712, 
    daysAccumulating: 6, 
    rootCause: "High incident density with 3 consecutive high-priority events closed with no post-event logging.",
    overrun: 13,
    missedLogs: 3,
    underdeployed: 3,
    daysSinceClean: 6,
    consecutiveHigh: 3
  },
  { 
    name: "Satellite Bus Stand", 
    score: 634, 
    daysAccumulating: 14, 
    rootCause: "Active metro pillar construction overrunning past authorized municipal permit guidelines.",
    overrun: 65,
    missedLogs: 1,
    underdeployed: 1,
    daysSinceClean: 14,
    consecutiveHigh: 1
  },
  { 
    name: "Yelahanka Circle", 
    score: 521, 
    daysAccumulating: 9, 
    rootCause: "Severe under-deployment of traffic wardens across 4 consecutive evening gridlock events.",
    overrun: 7,
    missedLogs: 1,
    underdeployed: 4,
    daysSinceClean: 9,
    consecutiveHigh: 1
  },
  { 
    name: "Silk Board Junction", 
    score: 398, 
    daysAccumulating: 4, 
    rootCause: "Variable Message Signs (VMS) left unactivated during major IT fleet outbound hours.",
    overrun: 33,
    missedLogs: 2,
    underdeployed: 1,
    daysSinceClean: 4,
    consecutiveHigh: 0
  },
  { 
    name: "K R Circle", 
    score: 201, 
    daysAccumulating: 2, 
    rootCause: "Single municipal garbage dumper breakdown resolved successfully inside initial SLA window.",
    overrun: 0,
    missedLogs: 1,
    underdeployed: 1,
    daysSinceClean: 2,
    consecutiveHigh: 1
  },
  { 
    name: "Town Hall Junction", 
    score: 89, 
    daysAccumulating: 1, 
    rootCause: "Minor pavement construction blockage resolved by self-clearance under low traffic hours.",
    overrun: 5,
    missedLogs: 0,
    underdeployed: 0,
    daysSinceClean: 1,
    consecutiveHigh: 1
  }
];

// REPAYMENT ACTIONS INDEX
interface RepaymentAction {
  id: string;
  name: string;
  reductionScore: number; // point reduction
  reductionPenalty: number; // min penalty reduction
}

export default function DebtSection() {
  const [junctions, setJunctions] = useState<JunctionDebt[]>(DEFAULT_JUNCTIONS);
  const [selectedName, setSelectedName] = useState<string>("Jalahalli Cross");
  
  // Custom interactive simulator fields
  const [activeOverrun, setActiveOverrun] = useState<number>(108);
  const [activeMissedLogs, setActiveMissedLogs] = useState<number>(1);
  const [activeUnderdeployed, setActiveUnderdeployed] = useState<number>(2);
  const [activeDaysSinceClean, setActiveDaysSinceClean] = useState<number>(11);
  const [activeConsecutiveHigh, setActiveConsecutiveHigh] = useState<number>(1);

  // Selected junction data lookup
  const selectedJunction = useMemo(() => {
    return junctions.find(j => j.name === selectedName) || junctions[0];
  }, [junctions, selectedName]);

  // Sync simulator inputs when switching junction
  const handleJunctionSelect = (name: string) => {
    setSelectedName(name);
    const target = junctions.find(j => j.name === name);
    if (target) {
      setActiveOverrun(target.overrun);
      setActiveMissedLogs(target.missedLogs);
      setActiveUnderdeployed(target.underdeployed);
      setActiveDaysSinceClean(target.daysSinceClean);
      setActiveConsecutiveHigh(target.consecutiveHigh);
    }
  };

  // Live score calculation
  const calculatedScore = useMemo(() => {
    const computed = (activeOverrun * 4.2) + 
                     (activeMissedLogs * 85) + 
                     (activeUnderdeployed * 63) + 
                     (activeDaysSinceClean * 12) + 
                     (activeConsecutiveHigh * 47);
    return Math.round(computed);
  }, [activeOverrun, activeMissedLogs, activeUnderdeployed, activeDaysSinceClean, activeConsecutiveHigh]);

  // classification
  const classification = useMemo(() => {
    if (calculatedScore >= 900) return "CRITICAL DEBT";
    if (calculatedScore >= 500) return "CRITICAL";
    if (calculatedScore >= 300) return "HIGH";
    if (calculatedScore >= 100) return "MEDIUM";
    return "LOW";
  }, [calculatedScore]);

  // Penalty mins output
  const penaltyMins = useMemo(() => {
    if (calculatedScore <= 100) return 4; // midway of 3 to 5
    if (calculatedScore <= 300) return 12; // midway of 8 to 17
    if (calculatedScore <= 500) return 20; // estimate of 17 to 22
    if (calculatedScore <= 700) return 25; // estimate of 22 to 28
    if (calculatedScore <= 900) return 35; // halfway of 28 to 41
    return 45; // 41+ min
  }, [calculatedScore]);

  // REPAYMENT ACTIONS CALCULATOR
  // Generate exactly 3 ranked action recommendations based on junction properties
  const repaymentRecommendations = useMemo(() => {
    const list: { title: string; desc: string; reductionPoints: number; reductionMins: number; icon: string }[] = [];

    // Water logging or huge overrun action
    if (selectedJunction.name.includes("Jalahalli") || activeOverrun > 80) {
      list.push({
        title: "File BBMP drainage ticket",
        desc: "Address structural flood points to immediately clear the water logging backlog.",
        reductionPoints: 310,
        reductionMins: 0,
        icon: "drainage"
      });
    }

    // Missed logs action
    if (activeMissedLogs > 0) {
      list.push({
        title: "Complete outstanding post-event logs",
        desc: `Fill details for the ${activeMissedLogs} missing post-event logging record(s) to restore learning data.`,
        reductionPoints: activeMissedLogs * 85,
        reductionMins: 0,
        icon: "logs"
      });
    }

    // Deploy officer action
    list.push({
      title: "Pre-deploy +2 officers for next 3 events",
      desc: "Force baseline queue mitigation by stationing additional physical marshals prior to peak bottleneck congestion.",
      reductionPoints: 150,
      reductionMins: 18,
      icon: "officer"
    });

    // Liaison officer action
    list.push({
      title: "Assign dedicated liaison officer",
      desc: "Assign a dedicated communication liaison officer to manage intra-agency BBMP response speeds.",
      reductionPoints: 180,
      reductionMins: 21,
      icon: "liaison"
    });

    // VMS action
    if (selectedJunction.name.includes("Silk Board") || activeMissedLogs > 1) {
      list.push({
        title: "Activate VMS for next event regardless of priority",
        desc: "Force real-time digital diversion boards to distribute vehicular volume before entry bottlenecks.",
        reductionPoints: 120,
        reductionMins: 0,
        icon: "vms"
      });
    }

    // Default action to fill to 3 actions
    if (list.length < 3) {
      list.push({
        title: "Schedule BBMP infrastructure review",
        desc: "Lobby critical municipal engineering teams for road restoration and lane widenings.",
        reductionPoints: 100,
        reductionMins: 0,
        icon: "infra"
      });
    }

    return list.slice(0, 3);
  }, [selectedJunction, activeOverrun, activeMissedLogs]);

  // Projected debt-free counts
  const currentRepaymentRate = 25; // points cleared per day under normal standby operations
  const standardDays = Math.max(1, Math.round(calculatedScore / currentRepaymentRate));
  
  // Accelerated repayment calculation
  const totalAcceleratedBenefit = repaymentRecommendations.reduce((acc, act) => acc + act.reductionPoints, 0);
  const acceleratedDays = Math.max(1, Math.round(Math.max(0, calculatedScore - totalAcceleratedBenefit) / (currentRepaymentRate + 15)));
  const timeSaved = Math.max(0, standardDays - acceleratedDays);

  // Ignore Compounding details
  const ignoreWeek1 = calculatedScore;
  const ignoreMultiplier = calculatedScore > 800 ? 1.6 : calculatedScore > 500 ? 1.3 : 1.0;
  const ignoreWeek2 = Math.round(ignoreWeek1 * (ignoreMultiplier === 1.0 ? 1.15 : ignoreMultiplier));
  const ignoreWeek3 = Math.round(ignoreWeek2 * (ignoreMultiplier === 1.0 ? 1.15 : 1.6));

  const isCriticalDebt = calculatedScore >= 1000;

  // Real-time recalculation after a user logged event outcome
  const [loggedOverrun, setLoggedOverrun] = useState<string>("0");
  const [loggedMissed, setLoggedMissed] = useState<boolean>(false);
  const [loggedUnderdeployed, setLoggedUnderdeployed] = useState<string>("0");
  const [logSuccessMessage, setLogSuccessMessage] = useState<string | null>(null);

  const handleRecalculatoryDispatchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const overrunVal = Math.max(0, parseInt(loggedOverrun) || 0);
    const missedVal = loggedMissed ? 1 : 0;
    const underVal = Math.max(0, parseInt(loggedUnderdeployed) || 0);

    // Recalculate original score vs new delta values
    const beforeScore = calculatedScore;
    
    // Increment properties on active junction state
    setActiveOverrun(prev => Math.max(0, prev + overrunVal));
    setActiveMissedLogs(prev => prev + missedVal);
    setActiveUnderdeployed(prev => prev + underVal);
    setActiveDaysSinceClean(prev => prev + 1); // adding a day

    const costDelta = Math.round((overrunVal * 4.2) + (missedVal * 85) + (underVal * 63) + 12);
    const afterScore = beforeScore + costDelta;

    setLogSuccessMessage(`Incident reported! Delta penalty of +${costDelta} pts accrued. Junction score updated from ${beforeScore} to ${afterScore} pts.`);
    setTimeout(() => {
      setLogSuccessMessage(null);
    }, 6000);
  };

  return (
    <div className="space-y-8 text-slate-800 text-left">
      {/* HEADER BAR */}
      <div id="debt-header" className="border-b border-rose-100 dark:border-slate-800 pb-5">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5 uppercase font-display">
          <Landmark className="w-5.5 h-5.5 text-red-500" />
          Congestion Debt Control Panel
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
          Track and resolve secondary hidden baselines. Unresolved, under-staffed, or unlogged traffic events leave a residual debt penalty that worsens baseline congestion times for subsequent local incidents.
        </p>
      </div>

      {/* QUICK EXPLAINER */}
      <div className="bg-red-50/55 dark:bg-rose-950/15 border border-red-100 dark:border-rose-950/20 p-5 rounded-3xl flex flex-col md:flex-row gap-5 items-start">
        <div className="p-3 bg-red-100 dark:bg-red-950/60 text-red-650 dark:text-red-400 rounded-2xl flex-shrink-0">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm leading-relaxed space-y-2">
          <p className="font-bold text-red-900 dark:text-red-400 font-display">What is Congestion Debt?</p>
          <p className="text-slate-600 dark:text-slate-300">
            Congestion Debt is like technical debt in software. Every unresolved, under-staffed, or unlogged traffic event at a junction leaves an invisible penalty that raises the baseline delay for the <strong className="text-slate-900 dark:text-white">next</strong> event at that same junction. 
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            A water logging at Jalahalli Cross that took 380 minutes didn't just delay commuters that night. It eroded public trust in diversion compliance (people ignore signs next time), degraded the road surface (slower clearance next event), created a learned avoidance pattern persisting 11 days on average, and left no post-event log so the next officer starts blind. Consequently, the next event at that junction starts with a <strong className="text-slate-900 dark:text-white">23% higher baseline delay</strong>.
          </p>
        </div>
      </div>

      {/* DATASET BENCHMARKS GRID */}
      <div>
        <h3 className="text-xs uppercase font-mono font-black text-slate-450 dark:text-slate-500 tracking-wider mb-4 flex items-center gap-1.5 justify-start">
          <Target className="w-4 h-4 text-slate-400" />
          City-wide TrafficSense Database Facts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Events Analysed", value: "8,173", desc: "Astram core logs" },
            { label: "Med Resolution Delay", value: "64 min", desc: "Standard clearance" },
            { label: "Avg Log Filing Rate", value: "38%", desc: "62% closed blind" },
            { label: "Worst Incident Hour", value: "21:00", desc: "810 peak events" },
            { label: "Worst Congestion Day", value: "Thursday", desc: "1,343 weekday logs" },
            { label: "Highest Load Station", value: "Yelahanka PS", desc: "377 overall events" },
            { label: "Officer Over-Deploy", value: "23%", desc: "Resource redundancy" },
            { label: "Audit Resolution Data", value: "3,129 (38%)", desc: "Fully labeled records" },
          ].map((benchmark, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-150 dark:border-slate-800 text-left">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 dark:text-slate-500 block">
                {benchmark.label}
              </span>
              <p className="text-lg font-black font-display text-slate-800 dark:text-white mt-1">
                {benchmark.value}
              </p>
              <span className="text-[10.5px] text-slate-450 dark:text-slate-450 block mt-0.5">
                {benchmark.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CORE TWO-COLUMN ANALYSIS SYSTEM */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: JUNCTION SELECTOR & DETAILED CARD SUMMARY */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h3 className="text-sm font-black uppercase font-mono tracking-wider text-slate-500">
                  Target Junction Debt Profile
                </h3>
                <p className="text-xs text-slate-400 mt-1">Select an active municipal hotspot junction to investigate debt score accruals.</p>
              </div>
              
              <div className="relative">
                <select 
                  value={selectedName}
                  onChange={(e) => handleJunctionSelect(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold rounded-xl px-4 py-2 text-slate-800 dark:text-white outline-none cursor-pointer"
                >
                  {junctions.map((j) => (
                    <option key={j.name} value={j.name}>{j.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEPARATED OUTPUT CARD DISPLAY */}
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 relative">
              {/* Score Indicator Badge */}
              <div className="absolute top-4 right-4 flex flex-col items-end">
                <span className={`px-2.5 py-1 text-[10px] font-mono font-black rounded-md ${
                  calculatedScore >= 800 ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400" :
                  calculatedScore >= 500 ? "bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400" :
                  calculatedScore >= 300 ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" :
                  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                }`}>
                  {classification}
                </span>
                <span className="text-[9.5px] font-mono text-slate-400 mt-1">
                  Baseline multiplier: {(1 + (calculatedScore / 1000)).toFixed(2)}x
                </span>
              </div>

              {/* OUTCOME FORMAT HEADER */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-black font-display text-slate-900 dark:text-white tracking-tight">
                    JUNCTION: {selectedJunction.name}
                  </h4>
                  <div className="flex flex-wrap items-baseline gap-2 mt-1">
                    <span className="text-slate-450 text-xs font-mono">DEBT SCORE:</span>
                    <span className="text-xl font-mono font-black text-slate-950 dark:text-white">
                      {calculatedScore}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">pts</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200/60 dark:border-slate-800/60 pt-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-450 block">Next-Event Penalty:</span>
                    <span className="text-md font-mono font-black text-red-600 dark:text-red-400 block mt-0.5">
                      +{penaltyMins} min added to baseline
                    </span>
                    <span className="text-[9.5px] text-slate-400 leading-normal block">Added to predictive model estimates on arrival</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-450 block">Days Accumulating:</span>
                    <span className="text-md font-mono font-black text-slate-800 dark:text-white block mt-0.5">
                      {activeDaysSinceClean} days
                    </span>
                    <span className="text-[9.5px] text-slate-400 leading-normal block">Since last certified complete resolution</span>
                  </div>
                </div>

                <div className="border-t border-slate-200/60 dark:border-slate-800/60 pt-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-450 block">Root Cause Analysis:</span>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed font-sans font-medium">
                    {selectedJunction.rootCause}
                  </p>
                </div>
              </div>
            </div>

            {/* EXPANDED ACTION RECOMMENDATIONS */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-mono uppercase font-black text-slate-450">
                  REPAYMENT ACTIONS (Ranked by Debt Reduction Impact)
                </span>
                <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-[9.5px] font-mono text-blue-600">
                  3 targeted recommendations
                </span>
              </div>

              <div className="space-y-3">
                {repaymentRecommendations.map((act, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-4 rounded-2xl relative flex items-start gap-3.5 shadow-sm">
                    <span className="absolute top-3.5 right-4 font-mono text-xs font-black text-slate-300 dark:text-slate-700">
                      #{idx + 1}
                    </span>
                    <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl flex-shrink-0 mt-0.5">
                      {act.reductionPoints > 0 ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <ShieldAlert className="w-4 h-4" />
                      )}
                    </div>
                    <div className="space-y-1 text-left">
                      <h5 className="text-xs font-extrabold text-slate-900 dark:text-white font-mono uppercase">
                        {act.title}
                      </h5>
                      <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-normal">
                        {act.desc}
                      </p>
                      
                      <div className="flex gap-4 mt-2 text-[10px] font-mono select-none">
                        {act.reductionPoints > 0 && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            Reduces Debt: -{act.reductionPoints} pts
                          </span>
                        )}
                        {act.reductionMins > 0 && (
                          <span className="text-sky-600 dark:text-sky-450 font-bold bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded">
                            Mitigates Nest Penalty: -{act.reductionMins} min
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REPAYMENT METRICS TIMELINE */}
            <div className="bg-slate-950 text-white p-5 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
              
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-flipkart-yellow" />
                  <span className="text-[11px] font-mono uppercase font-black tracking-wider text-slate-400">
                    Repayment Forecast Estimates
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">
                  Oper Rate: {currentRepaymentRate} pts/day
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center select-none">
                <div>
                  <span className="text-[9px] uppercase font-mono text-slate-400 block tracking-wider">
                    Standby Repayment Date
                  </span>
                  <p className="text-2xl font-black font-mono tracking-tight text-white mt-1">
                    {standardDays} days
                  </p>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">At typical standby clearance rate</span>
                </div>

                <div className="border-t sm:border-t-0 sm:border-l sm:border-r border-white/10 pt-4 sm:pt-0">
                  <span className="text-[9px] uppercase font-mono text-flipkart-yellow block tracking-wider">
                    Accelerated Strategy
                  </span>
                  <p className="text-2xl font-black font-mono tracking-tight text-flipkart-yellow mt-1">
                    {acceleratedDays} days
                  </p>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Applying all 3 ranked actions</span>
                </div>

                <div className="border-t sm:border-t-0 pt-4 sm:pt-0">
                  <span className="text-[9px] uppercase font-mono text-emerald-400 block tracking-wider">
                    Net Duration Saved
                  </span>
                  <div className="flex items-baseline justify-center gap-1 mt-1 text-emerald-400 font-black font-mono">
                    <span className="text-2xl font-black">{timeSaved}</span>
                    <span className="text-xs">days</span>
                  </div>
                  <span className="text-[9.5px] text-slate-500 block mt-0.5">Direct bottleneck mitigation benefit</span>
                </div>
              </div>
            </div>

            {/* WHAT HAPPENS IF IGNORED BLOCK */}
            <div className="bg-blue-50/50 dark:bg-blue-950/25 border border-blue-200 dark:border-blue-900/40 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 select-none">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400">
                  WHAT HAPPENS IF DEBT IS IGNORED (COMPOUNDING DELAYS)
                </span>
              </div>

              <div className="text-xs leading-relaxed space-y-3 text-slate-600 dark:text-slate-300">
                <p>
                  Traffic debt builds like toxic interest. Unmanaged congestion profile scores above 500 points compound automatically at <strong className="text-blue-600 dark:text-blue-400">1.3× per week</strong>, whereas scores exceeding 800 build up at an explosive <strong className="text-blue-700 dark:text-blue-300">1.6× rate per week</strong> without direct intervention.
                </p>
                <p>
                  If neglected, <strong className="text-slate-900 dark:text-white">{selectedJunction.name}</strong> will compound rapidly over the coming cycles:
                </p>

                {/* Micro projections table */}
                <div className="grid grid-cols-3 gap-2 py-2 text-center font-mono text-[10.5px]">
                  <div className="p-2 bg-blue-100/30 dark:bg-blue-950/45 rounded border border-blue-200/30 dark:border-blue-900/30">
                    <span className="text-slate-500 dark:text-slate-400 block uppercase text-[9px]">Week 1 (Current)</span>
                    <span className="font-extrabold text-slate-800 dark:text-white block mt-1">{ignoreWeek1} pts</span>
                  </div>

                  <div className="p-2 bg-blue-100/30 dark:bg-blue-950/45 rounded border border-blue-200/30 dark:border-blue-900/30">
                    <span className="text-slate-500 dark:text-slate-400 block uppercase text-[9px]">Week 2 (+1.3x)</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 block mt-1">{ignoreWeek2} pts</span>
                  </div>

                  <div className="p-2 bg-blue-100/30 dark:bg-blue-950/45 rounded border border-blue-200/30 dark:border-blue-900/30">
                    <span className="text-slate-500 dark:text-slate-400 block uppercase text-[9px]">Week 3 (+1.6x)</span>
                    <span className={`font-extrabold block mt-1 ${ignoreWeek3 >= 1000 ? "text-rose-605 dark:text-rose-455 text-red-500 font-black animate-pulse" : "text-blue-500"}`}>{ignoreWeek3} pts</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-450 leading-relaxed">
                  Any junction exceeding <strong className="text-slate-900 dark:text-white">1,000 points</strong> enters <strong className="text-red-650 dark:text-red-400 font-extrabold bg-red-50 dark:bg-red-950/50 border border-red-200/40 dark:border-red-900/30 px-1.5 py-0.5 rounded">CRITICAL DEBT ZONE</strong>. Under this threshold, all subsequent physical incidents are automatically flagged high priority, prediction clearance resolution schedules double due to baseline gridlock saturation, and deployment requirements increase by a minimum of <strong className="text-slate-900 dark:text-white">3 officers</strong> at peak.
                </p>
              </div>
            </div>

            {/* PITCH FOOTER */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <p className="text-xs font-mono text-center font-extrabold text-slate-900 dark:text-emerald-400 uppercase tracking-wide">
                🚀 This junction is {acceleratedDays} days from debt-free — here is exactly what it takes.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RE-CALCULATION SIMULATOR & OVERALL CITY-WIDE STATISTICS */}
        <div className="lg:col-span-5 space-y-6">
          {/* SIMULATOR SLIDERS SHEET */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <h3 className="text-sm font-black uppercase font-mono tracking-wider text-slate-800 dark:text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-500" />
                Live Parameter Simulator
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tweak individual component inputs of the formula in real time to observe instant baseline effects.
              </p>
            </div>

            {/* SLIDERS LIST */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Resolution Overrun min (x4.2)</span>
                  <span className="text-blue-600 font-extrabold">{activeOverrun} mins</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="400" 
                    value={activeOverrun} 
                    onChange={(e) => setActiveOverrun(parseInt(e.target.value) || 0)}
                    className="w-full accent-flipkart-blue bg-slate-100 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1 select-none">
                    <button 
                      onClick={() => setActiveOverrun(prev => Math.max(0, prev - 10))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      -10
                    </button>
                    <button 
                      onClick={() => setActiveOverrun(prev => Math.min(400, prev + 10))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Missed Post Log Files (x85)</span>
                  <span className="text-blue-600 font-extrabold">{activeMissedLogs} logs</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={activeMissedLogs} 
                    onChange={(e) => setActiveMissedLogs(parseInt(e.target.value) || 0)}
                    className="w-full accent-flipkart-blue bg-slate-100 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1 select-none">
                    <button 
                      onClick={() => setActiveMissedLogs(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => setActiveMissedLogs(prev => Math.min(10, prev + 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Officer Under-Deploys (x63)</span>
                  <span className="text-blue-600 font-extrabold">{activeUnderdeployed} events</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="15" 
                    value={activeUnderdeployed} 
                    onChange={(e) => setActiveUnderdeployed(parseInt(e.target.value) || 0)}
                    className="w-full accent-flipkart-blue bg-slate-100 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1 select-none">
                    <button 
                      onClick={() => setActiveUnderdeployed(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => setActiveUnderdeployed(prev => Math.min(15, prev + 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Days Since Clean Resolve (x12)</span>
                  <span className="text-blue-600 font-extrabold">{activeDaysSinceClean} days</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="30" 
                    value={activeDaysSinceClean} 
                    onChange={(e) => setActiveDaysSinceClean(parseInt(e.target.value) || 0)}
                    className="w-full accent-flipkart-blue bg-slate-100 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1 select-none">
                    <button 
                      onClick={() => setActiveDaysSinceClean(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => setActiveDaysSinceClean(prev => Math.min(30, prev + 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-600 dark:text-slate-300">Consecutive High-Priority (x47)</span>
                  <span className="text-blue-600 font-extrabold">{activeConsecutiveHigh} streak</span>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={activeConsecutiveHigh} 
                    onChange={(e) => setActiveConsecutiveHigh(parseInt(e.target.value) || 0)}
                    className="w-full accent-flipkart-blue bg-slate-100 dark:bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex gap-1 select-none">
                    <button 
                      onClick={() => setActiveConsecutiveHigh(prev => Math.max(0, prev - 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      -1
                    </button>
                    <button 
                      onClick={() => setActiveConsecutiveHigh(prev => Math.min(10, prev + 1))}
                      className="p-1 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 rounded text-xs hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULA OUTPUT VIEWPORT */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-2.5">
              <span className="text-[9px] uppercase font-mono font-black tracking-widest text-slate-400 block text-center">
                CONGESTION DEBT MATHEMATICAL FORMULA
              </span>
              <p className="text-[11.5px] font-mono text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/50 p-3 rounded-xl leading-normal text-center select-none">
                Score = ({activeOverrun} × 4.2) + ({activeMissedLogs} × 85) + ({activeUnderdeployed} × 63) + ({activeDaysSinceClean} × 12) + ({activeConsecutiveHigh} × 47) = <strong className="text-slate-900 dark:text-white font-mono">{calculatedScore} pts</strong>
              </p>
            </div>
          </div>

          {/* DYNAMIC DISPATCH SIMULATION REPORTING */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-sm font-black uppercase font-mono tracking-wider text-slate-850 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                Report Field Incident Outcome
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Simulate a field officer logging a new incident's parameters at this junction to instantly observe real-time recalculation of the debt scorecard.
              </p>
            </div>

            <form onSubmit={handleRecalculatoryDispatchSubmit} className="space-y-3.5">
              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-450 block">Mins Resolution Overrun SLA</label>
                <input 
                  type="number" 
                  min="0"
                  value={loggedOverrun}
                  onChange={(e) => setLoggedOverrun(e.target.value)}
                  placeholder="Minutes spent past SLA prediction..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-colors mt-1 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-450 block">Warden staffing underdeployment count</label>
                <input 
                  type="number" 
                  min="0"
                  value={loggedUnderdeployed}
                  onChange={(e) => setLoggedUnderdeployed(e.target.value)}
                  placeholder="Missing wardens compared to dispatch recommendations..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-red-400 transition-colors mt-1 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-2 bg-slate-55 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 mt-1 select-none">
                <input 
                  type="checkbox" 
                  id="missed_log"
                  checked={loggedMissed}
                  onChange={(e) => setLoggedMissed(e.target.checked)}
                  className="w-4 h-4 accent-flipkart-blue cursor-pointer"
                />
                <label htmlFor="missed_log" className="text-xs text-slate-650 dark:text-slate-350 cursor-pointer font-medium">
                  Close incident without filing post-event log (-85 pts hazard)
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-mono text-xs font-bold py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 shadow-sm transition-all uppercase"
              >
                <span>Accrue Incident Legacy Metrics</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence>
              {logSuccessMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 p-4 rounded-xl text-left select-none"
                >
                  <p className="text-xs text-emerald-850 dark:text-emerald-400 font-medium font-sans leading-relaxed">
                    🎉 {logSuccessMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION: CITY-WIDE DEBT TREND REPORT LOGS */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-md font-mono text-[9px] uppercase font-black">
              Macro TrafficSense Telemetry
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white font-display uppercase tracking-wide mt-1.5">
              City-Wide Debt Accrual Historical Timeline
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Analyzing the compounding backlog through January (system inactive) vs the successful state de-escalations throughout February after TrafficSense live deployment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9.5px] font-mono text-slate-450 uppercase font-black tracking-wider">
              System Live Stabilization Met
            </span>
          </div>
        </div>

        {/* CUSTOM INTERACTIVE SVG TREND GRAPH */}
        <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-150 dark:border-slate-800/80">
          <div className="h-44 w-full flex items-end justify-between font-mono gap-1 select-none">
            {[
              { label: "W1 Jan", total: 2140, repaid: 890, net: 1250, desc: "Incidents: 187" },
              { label: "W2 Jan", total: 3390, repaid: 1240, net: 2150, desc: "Incidents: 201" },
              { label: "W3 Jan", total: 5540, repaid: 1890, net: 3650, desc: "Incidents: 178" },
              { label: "W4 Jan", total: 9190, repaid: 2100, net: 7090, desc: "Incidents: 209 · Untracked backlogs build up" },
              { label: "W1 Feb", total: 9190, repaid: 6430, net: -3240, desc: "Incidents: 196 · TrafficSense LIVE! Repayment surge" },
              { label: "W2 Feb", total: 5950, repaid: 4100, net: -1850, desc: "Incidents: 188 · Standardized logs resolve debt gaps" },
              { label: "W3 Feb", total: 4100, repaid: 3980, net: -120, desc: "Incidents: 191 · System stabilization reached" }
            ].map((d, index) => {
              // Custom scale for rendering visual bars nicely
              const maxVal = 10000;
              const barHeightPct = (d.total / maxVal) * 100;
              const repaidHeightPct = (d.repaid / maxVal) * 100;
              const isFeb = d.label.includes("Feb");

              return (
                <div key={d.label} className="flex-1 flex flex-col justify-end items-center h-full group relative cursor-pointer">
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full mb-3 hidden group-hover:block bg-slate-955 bg-slate-900 text-white min-w-[200px] p-3 rounded-xl border border-slate-700 shadow-md z-10 text-xs">
                    <p className="font-extrabold text-[#ffd91a] uppercase font-mono">{d.label} Metrics</p>
                    <p className="text-[10px] text-slate-350 mt-1 font-mono">{d.desc}</p>
                    <div className="border-t border-slate-800 mt-2 pt-2 grid grid-cols-2 gap-1 gap-y-1.5 font-mono text-[9.5px]">
                      <span className="text-slate-450 font-bold">Total Accrued:</span>
                      <span className="text-right font-bold text-white">{d.total} pts</span>
                      <span className="text-slate-450 font-bold font-mono">Repaid Margin:</span>
                      <span className="text-right font-extrabold text-emerald-400">-{d.repaid} pts</span>
                      <span className="text-slate-455 font-bold font-mono">Net Flow:</span>
                      <span className={`text-right font-extrabold ${d.net > 0 ? "text-amber-500" : "text-emerald-400"}`}>
                        {d.net > 0 ? `+${d.net}` : d.net} pts
                      </span>
                    </div>
                  </div>

                  {/* Micro Visual Bar */}
                  <div className="w-full flex justify-center gap-1 items-end h-full px-1">
                    {/* ACCRUED TOTAL BAR */}
                    <div 
                      className={`w-4 bg-gradient-to-t rounded-t transition-all group-hover:brightness-110 ${
                        isFeb 
                          ? "from-emerald-600 to-emerald-400" 
                          : "from-blue-700 to-red-500/80"
                      }`}
                      style={{ height: `${Math.max(12, barHeightPct)}%` }}
                    />
                    {/* REPAID BAR */}
                    <div 
                      className="w-1.5 bg-[#ebd03b] rounded-t opacity-65 group-hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.max(4, repaidHeightPct)}%` }}
                    />
                  </div>

                  {/* Label */}
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-2 font-mono">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gradient-to-t from-blue-700 to-red-500" />
                <span>Pre-Launch Accrual Backlog</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-gradient-to-t from-emerald-600 to-emerald-400" />
                <span>Post-Launch Stabilisation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-[#ebd03b]" />
                <span>Repaid Points</span>
              </div>
            </div>

            <span className="text-[9px] text-slate-400 italic">Hover columns for granular analysis reports</span>
          </div>
        </div>

        {/* DATASET TABLE LOGS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden select-none">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 uppercase text-[10px] font-bold text-slate-550 border-b border-slate-150 dark:border-slate-800">
                <th className="p-4 leading-normal">Reporting Period</th>
                <th className="p-4 leading-normal text-right">Absolute Debt Accumulations</th>
                <th className="p-4 leading-normal text-right">Staffing Repaid Units</th>
                <th className="p-4 leading-normal text-right">Net Week Change</th>
                <th className="p-4 leading-normal">Status Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800">
              {[
                { period: "Week 1 Jan", total: "2,140 pts", repaid: "890 pts", net: "+1,250", status: "Compounding Backlog", color: "text-amber-500" },
                { period: "Week 2 Jan", total: "3,390 pts", repaid: "1,240 pts", net: "+2,150", status: "Compounding Backlog", color: "text-amber-500" },
                { period: "Week 3 Jan", total: "5,540 pts", repaid: "1,890 pts", net: "+3,650", status: "Hazard Accrual Building", color: "text-red-500" },
                { period: "Week 4 Jan", total: "9,190 pts", repaid: "2,100 pts", net: "+7,090", status: "Maximum Saturation Peak", color: "text-red-600 font-extrabold" },
                { period: "Week 1 Feb (system live)", total: "9,190 pts", repaid: "6,430 pts", net: "-3,240", status: "Deployment Repay Surge", color: "text-emerald-500 font-bold" },
                { period: "Week 2 Feb", total: "5,950 pts", repaid: "4,100 pts", net: "-1,850", status: "Model Consolidation", color: "text-emerald-500" },
                { period: "Week 3 Feb", total: "4,100 pts", repaid: "3,980 pts", net: "-120", status: "Equilibrium Met", color: "text-emerald-600" }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors">
                  <td className="p-4 font-bold text-slate-800 dark:text-white">{row.period}</td>
                  <td className="p-4 text-right">{row.total}</td>
                  <td className="p-4 text-right text-emerald-600 dark:text-emerald-400 font-bold">-{row.repaid}</td>
                  <td className={`p-4 text-right font-extrabold ${row.net.startsWith("+") ? "text-amber-500" : "text-emerald-500"}`}>{row.net} pts</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.color.includes("emerald") ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-rose-50 dark:bg-rose-950/20"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
