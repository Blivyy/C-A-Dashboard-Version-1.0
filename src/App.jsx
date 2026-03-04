import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Search,
  TrendingUp,
  Users,
  X,
  RefreshCw,
  Eye,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────
   MAG Journey Makers Brand Tokens
   ─────────────────────────────────────────────────────────── */
const MAG = {
  navy: "#041E42",
  navyLight: "#0A2A56",
  ocean: "#0043B4",
  sky: "#62B5E5",
  skyMuted: "#62B5E540",
  white: "#FFFFFF",
  offWhite: "#F0F4F8",
  grey100: "#E8ECF1",
  grey200: "#C5CDD8",
  grey400: "#8494A7",
  grey600: "#4A5568",
  red: "#DC2626",
  redSoft: "#FEE2E2",
  amber: "#F59E0B",
  amberSoft: "#FEF3C7",
  green: "#16A34A",
  greenSoft: "#DCFCE7",
};

/* ───────────────────────────────────────────────────────────
   Mock FY27 Data
   ─────────────────────────────────────────────────────────── */
const MOCK_TASKS = [
  {
    id: "T-001",
    taskName: "BS 9997 assurance review",
    assignedTo: "Steve",
    labels: ["Audit"],
    quarter: "Q1",
    start: "2026-04-08",
    finish: "2026-05-02",
    bucket: "Fire Safety",
    priority: "High",
    percentComplete: 35,
    effort: 5,
    effortCompleted: 1.75,
    effortRemaining: 3.25,
    delayCausedBy: "Awaiting evidence",
    goal: "HSR Compliance",
    commentary: "Evidence pack requested from MAN ops 28/04. Chasing.",
  },
  {
    id: "T-002",
    taskName: "Wildlife management review",
    assignedTo: "Dave",
    labels: ["Audit"],
    quarter: "Q1",
    start: "2026-04-15",
    finish: "2026-05-10",
    bucket: "Airfield",
    priority: "Medium",
    percentComplete: 0,
    effort: 4,
    effortCompleted: 0,
    effortRemaining: 4,
    delayCausedBy: "",
    goal: "Operational Safety",
    commentary: "",
  },
  {
    id: "T-003",
    taskName: "MoC process spot-check",
    assignedTo: "Rebecca",
    labels: ["Health Check"],
    quarter: "Q2",
    start: "2026-07-06",
    finish: "2026-07-26",
    bucket: "Governance",
    priority: "High",
    percentComplete: 10,
    effort: 3,
    effortCompleted: 0.3,
    effortRemaining: 2.7,
    delayCausedBy: "Resourcing",
    goal: "Assurance Framework",
    commentary: "Delayed due to Cap Del availability.",
  },
  {
    id: "T-004",
    taskName: "Fuel storage compliance audit",
    assignedTo: "Dave",
    labels: ["Audit"],
    quarter: "Q2",
    start: "2026-07-12",
    finish: "2026-08-05",
    bucket: "Engineering",
    priority: "High",
    percentComplete: 55,
    effort: 6,
    effortCompleted: 3.3,
    effortRemaining: 2.7,
    delayCausedBy: "",
    goal: "Regulatory",
    commentary: "On track. Fieldwork complete, drafting findings.",
  },
  {
    id: "T-005",
    taskName: "Critical infrastructure walkthrough",
    assignedTo: "Steve",
    labels: ["Inspection"],
    quarter: "Q2",
    start: "2026-07-20",
    finish: "2026-07-24",
    bucket: "Resilience",
    priority: "Medium",
    percentComplete: 100,
    effort: 1,
    effortCompleted: 1,
    effortRemaining: 0,
    delayCausedBy: "",
    goal: "Resilience",
    commentary: "Complete. No major findings.",
  },
  {
    id: "T-006",
    taskName: "Minor works oversight review",
    assignedTo: "Emma",
    labels: ["Health Check"],
    quarter: "Q2",
    start: "2026-07-18",
    finish: "2026-08-12",
    bucket: "Projects",
    priority: "Low",
    percentComplete: 25,
    effort: 3,
    effortCompleted: 0.75,
    effortRemaining: 2.25,
    delayCausedBy: "Dependencies",
    goal: "Construction Oversight",
    commentary: "Waiting on updated contractor register.",
  },
  {
    id: "T-007",
    taskName: "LOLER & PUWER compliance audit",
    assignedTo: "Emma",
    labels: ["Audit"],
    quarter: "Q1",
    start: "2026-04-18",
    finish: "2026-04-30",
    bucket: "Engineering",
    priority: "High",
    percentComplete: 90,
    effort: 4,
    effortCompleted: 3.6,
    effortRemaining: 0.4,
    delayCausedBy: "",
    goal: "Regulatory",
    commentary: "Final QA review before issue.",
  },
  {
    id: "T-008",
    taskName: "3rd party construction oversight",
    assignedTo: "Rebecca",
    labels: ["Audit"],
    quarter: "Q1",
    start: "2026-04-09",
    finish: "2026-04-25",
    bucket: "Projects",
    priority: "Medium",
    percentComplete: 100,
    effort: 3,
    effortCompleted: 3,
    effortRemaining: 0,
    delayCausedBy: "",
    goal: "Construction Oversight",
    commentary: "Complete. 2 actions raised.",
  },
  {
    id: "T-009",
    taskName: "Security compliance pulse-check",
    assignedTo: "Rebecca",
    labels: ["Health Check"],
    quarter: "Q3",
    start: "2026-10-03",
    finish: "2026-10-18",
    bucket: "Security",
    priority: "Medium",
    percentComplete: 0,
    effort: 2,
    effortCompleted: 0,
    effortRemaining: 2,
    delayCausedBy: "",
    goal: "HSR Compliance",
    commentary: "",
  },
  {
    id: "T-010",
    taskName: "Emergency planning tabletop",
    assignedTo: "Rebecca",
    labels: ["Exercise"],
    quarter: "Q4",
    start: "2027-01-12",
    finish: "2027-01-28",
    bucket: "Resilience",
    priority: "High",
    percentComplete: 0,
    effort: 5,
    effortCompleted: 0,
    effortRemaining: 5,
    delayCausedBy: "",
    goal: "Resilience",
    commentary: "",
  },
  {
    id: "T-011",
    taskName: "CDM compliance deep-dive",
    assignedTo: "Steve",
    labels: ["Audit"],
    quarter: "Q3",
    start: "2026-10-12",
    finish: "2026-11-08",
    bucket: "Projects",
    priority: "High",
    percentComplete: 0,
    effort: 5,
    effortCompleted: 0,
    effortRemaining: 5,
    delayCausedBy: "",
    goal: "Construction Oversight",
    commentary: "",
  },
  {
    id: "T-012",
    taskName: "Airside driving standards review",
    assignedTo: "Dave",
    labels: ["Health Check"],
    quarter: "Q3",
    start: "2026-11-01",
    finish: "2026-11-20",
    bucket: "Airfield",
    priority: "Medium",
    percentComplete: 0,
    effort: 3,
    effortCompleted: 0,
    effortRemaining: 3,
    delayCausedBy: "",
    goal: "Operational Safety",
    commentary: "",
  },
  {
    id: "T-013",
    taskName: "Annual fire safety programme review",
    assignedTo: "Emma",
    labels: ["Audit"],
    quarter: "Q4",
    start: "2027-01-05",
    finish: "2027-02-06",
    bucket: "Fire Safety",
    priority: "High",
    percentComplete: 0,
    effort: 6,
    effortCompleted: 0,
    effortRemaining: 6,
    delayCausedBy: "",
    goal: "HSR Compliance",
    commentary: "",
  },
  {
    id: "T-014",
    taskName: "Contractor management assurance",
    assignedTo: "Steve",
    labels: ["Audit"],
    quarter: "Q4",
    start: "2027-02-09",
    finish: "2027-03-06",
    bucket: "Projects",
    priority: "Medium",
    percentComplete: 0,
    effort: 4,
    effortCompleted: 0,
    effortRemaining: 4,
    delayCausedBy: "",
    goal: "Construction Oversight",
    commentary: "",
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */
const parseDate = (d) => new Date(d + "T00:00:00");
const daysBetween = (a, b) => Math.floor((parseDate(b) - parseDate(a)) / 86400000);
const unique = (vals) => [...new Set(vals)].filter(Boolean).sort();

function statusFor(task, todayISO) {
  const pc = task.percentComplete ?? 0;
  if (pc >= 100) return "Complete";
  const d = daysBetween(todayISO, task.finish);
  if (d < 0) return "Overdue";
  if (d <= 30) return "Due soon";
  if (pc > 0) return "In progress";
  return "Not started";
}

function riskScore(task, todayISO) {
  const s = statusFor(task, todayISO);
  let score = 0;
  if (s === "Overdue") score += 50;
  if (s === "Due soon") score += 20;
  if ((task.priority || "").toLowerCase() === "high") score += 15;
  score += Math.max(0, Math.min(30, 30 - (task.percentComplete ?? 0) / 3.5));
  if ((task.delayCausedBy || "").trim().length) score += 10;
  return Math.round(score);
}

const STATUS_STYLES = {
  Overdue: { bg: MAG.redSoft, color: MAG.red, icon: AlertTriangle },
  "Due soon": { bg: MAG.amberSoft, color: MAG.amber, icon: Clock },
  Complete: { bg: MAG.greenSoft, color: MAG.green, icon: CheckCircle2 },
  "In progress": { bg: "#EFF6FF", color: MAG.ocean, icon: TrendingUp },
  "Not started": { bg: MAG.grey100, color: MAG.grey600, icon: Clock },
};

const PRIORITY_DOT = { High: MAG.red, Medium: MAG.amber, Low: MAG.grey400 };

/* ─── Reusable Components ────────────────────────────────── */

function StatusBadge({ status }) {
  const st = STATUS_STYLES[status] || STATUS_STYLES["Not started"];
  const Icon = st.icon;
  return (
    <span
      style={{
        background: st.bg,
        color: st.color,
        fontSize: 12,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 6,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      <Icon size={13} /> {status}
    </span>
  );
}

function PriorityDot({ priority }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        color: MAG.grey600,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: PRIORITY_DOT[priority] || MAG.grey400,
        }}
      />
      {priority}
    </span>
  );
}

function ProgressBar({ value, width = "100%" }) {
  return (
    <div
      style={{
        background: MAG.grey100,
        borderRadius: 4,
        height: 8,
        width,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: value >= 100 ? MAG.green : value > 0 ? MAG.ocean : MAG.grey200,
          height: "100%",
          width: `${Math.min(100, value)}%`,
          borderRadius: 4,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}

function KpiCard({ title, value, sub, accent, icon: Icon }) {
  const borderColor =
    accent === "red"
      ? MAG.red
      : accent === "amber"
      ? MAG.amber
      : accent === "green"
      ? MAG.green
      : MAG.grey200;

  return (
    <div
      style={{
        background: MAG.white,
        borderRadius: 12,
        padding: "18px 20px",
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontSize: 12,
              color: MAG.grey400,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, color: MAG.navy, marginTop: 4 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: MAG.grey400, marginTop: 2 }}>{sub}</div>}
        </div>
        {Icon && <Icon size={20} color={borderColor} />}
      </div>
    </div>
  );
}

function FilterDropdown({ label, value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: MAG.grey400,
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "7px 10px",
          borderRadius: 8,
          border: `1px solid ${MAG.grey200}`,
          fontSize: 13,
          color: MAG.navy,
          background: MAG.white,
          cursor: "pointer",
          outline: "none",
        }}
      >
        <option value="All">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function SectionHeader({ children, sub }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ fontSize: 16, fontWeight: 800, color: MAG.navy, margin: 0 }}>{children}</h2>
      {sub && <p style={{ fontSize: 13, color: MAG.grey400, marginTop: 2 }}>{sub}</p>}
    </div>
  );
}

/* ─── Tab Components ─────────────────────────────────────── */

function OverviewTab({ filtered, kpis, todayISO }) {
  const quarterData = useMemo(() => {
    const byQ = {};
    filtered.forEach((t) => {
      if (!byQ[t.quarter]) byQ[t.quarter] = { quarter: t.quarter, total: 0, complete: 0, overdue: 0 };
      byQ[t.quarter].total++;
      if (t.status === "Complete") byQ[t.quarter].complete++;
      if (t.status === "Overdue") byQ[t.quarter].overdue++;
    });
    return ["Q1", "Q2", "Q3", "Q4"].map((q) => byQ[q] || { quarter: q, total: 0, complete: 0, overdue: 0 });
  }, [filtered]);

  const topRisks = useMemo(
    () =>
      [...filtered]
        .sort((a, b) => b.risk - a.risk)
        .filter((t) => t.status !== "Complete")
        .slice(0, 8),
    [filtered]
  );

  const effortRemainingTotal = useMemo(
    () => filtered.reduce((s, t) => s + (t.effortRemaining || 0), 0),
    [filtered]
  );

  return (
    <div>
      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <KpiCard title="Total" value={kpis.total} icon={LayoutDashboard} />
        <KpiCard
          title="Complete"
          value={kpis.complete}
          accent="green"
          icon={CheckCircle2}
          sub={kpis.total ? `${Math.round((kpis.complete / kpis.total) * 100)}% of plan` : ""}
        />
        <KpiCard
          title="Overdue"
          value={kpis.overdue}
          accent="red"
          icon={AlertTriangle}
          sub={kpis.overdue > 0 ? "Needs attention" : "Clear"}
        />
        <KpiCard title="Due soon" value={kpis.dueSoon} accent="amber" icon={Clock} sub="Next 30 days" />
        <KpiCard title="In progress" value={kpis.inProgress} icon={TrendingUp} />
        <KpiCard
          title="Effort remaining"
          value={`${effortRemainingTotal.toFixed(1)}d`}
          icon={RefreshCw}
          sub="Days"
        />
      </div>

      {/* Quarter chart + At risk table */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <SectionHeader sub="Tasks by quarter — complete vs overdue vs remaining">Quarter delivery</SectionHeader>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quarterData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={MAG.grey100} />
                <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: MAG.grey600 }} />
                <YAxis tick={{ fontSize: 12, fill: MAG.grey600 }} allowDecimals={false} />
                <RechartsTooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: `1px solid ${MAG.grey200}` }}
                />
                <Bar dataKey="complete" name="Complete" fill={MAG.green} radius={[4, 4, 0, 0]} />
                <Bar dataKey="overdue" name="Overdue" fill={MAG.red} radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total" fill={MAG.sky} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <SectionHeader sub="Sorted by risk score — overdue, priority, delays">Top at-risk items</SectionHeader>
          <div style={{ overflowY: "auto", maxHeight: 220 }}>
            <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${MAG.grey100}` }}>
                  {["Task", "Owner", "Finish", "Status", "%"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "6px 8px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: MAG.grey400,
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topRisks.map((t) => (
                  <tr key={t.id} style={{ borderBottom: `1px solid ${MAG.grey100}` }}>
                    <td
                      style={{
                        padding: "8px 8px",
                        color: MAG.navy,
                        fontWeight: 600,
                        maxWidth: 200,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t.taskName}
                    </td>
                    <td style={{ padding: "8px 8px", color: MAG.grey600 }}>{t.assignedTo}</td>
                    <td style={{ padding: "8px 8px", color: MAG.grey600, whiteSpace: "nowrap" }}>
                      {t.finish}
                      <div style={{ fontSize: 11, color: t.daysToFinish < 0 ? MAG.red : MAG.grey400 }}>
                        {t.daysToFinish < 0 ? `${Math.abs(t.daysToFinish)}d late` : `${t.daysToFinish}d`}
                      </div>
                    </td>
                    <td style={{ padding: "8px 8px" }}>
                      <StatusBadge status={t.status} />
                    </td>
                    <td style={{ padding: "8px 8px", width: 60 }}>
                      <ProgressBar value={t.percentComplete} />
                      <div style={{ fontSize: 11, color: MAG.grey600, marginTop: 2, textAlign: "center" }}>
                        {t.percentComplete}%
                      </div>
                    </td>
                  </tr>
                ))}
                {topRisks.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: 20, textAlign: "center", color: MAG.grey400 }}>
                      No at-risk items. Nice.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: MAG.grey400 }}>
        Note: Today is pinned to {todayISO} for consistent screenshots.
      </div>
    </div>
  );
}

function WorkloadTab({ filtered }) {
  const byOwner = useMemo(() => {
    const map = {};
    filtered.forEach((t) => {
      const o = t.assignedTo;
      if (!map[o]) map[o] = { name: o, total: 0, complete: 0, overdue: 0, effortRemaining: 0, highPriority: 0 };
      map[o].total++;
      if (t.status === "Complete") map[o].complete++;
      if (t.status === "Overdue") map[o].overdue++;
      map[o].effortRemaining += t.effortRemaining || 0;
      if (t.priority === "High") map[o].highPriority++;
    });
    return Object.values(map).sort((a, b) => b.effortRemaining - a.effortRemaining);
  }, [filtered]);

  return (
    <div>
      <SectionHeader sub="Who's carrying what — effort remaining, overdue, high priority split">Workload by lead</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byOwner} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={MAG.grey100} />
                <XAxis type="number" tick={{ fontSize: 12, fill: MAG.grey600 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 13, fill: MAG.navy, fontWeight: 700 }}
                  width={80}
                />
                <RechartsTooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="effortRemaining" name="Effort remaining (days)" fill={MAG.ocean} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 20,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${MAG.grey100}` }}>
                {["Lead", "Tasks", "Done", "Overdue", "High priority", "Effort left"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "6px 8px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: MAG.grey400,
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {byOwner.map((o) => (
                <tr key={o.name} style={{ borderBottom: `1px solid ${MAG.grey100}` }}>
                  <td style={{ padding: "10px 8px", fontWeight: 800, color: MAG.navy }}>{o.name}</td>
                  <td style={{ padding: "10px 8px", color: MAG.grey600 }}>{o.total}</td>
                  <td style={{ padding: "10px 8px", color: MAG.green, fontWeight: 800 }}>{o.complete}</td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: o.overdue > 0 ? MAG.red : MAG.grey400,
                      fontWeight: o.overdue > 0 ? 900 : 600,
                    }}
                  >
                    {o.overdue}
                  </td>
                  <td style={{ padding: "10px 8px", color: MAG.grey600 }}>{o.highPriority}</td>
                  <td style={{ padding: "10px 8px", fontWeight: 800, color: MAG.navy }}>{o.effortRemaining.toFixed(1)}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ChaseListTab({ filtered }) {
  const chaseItems = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return filtered
      .filter((t) => {
        if (t.status === "Complete") return false;
        if (t.status === "Overdue") return true;
        if (t.percentComplete === 0 && daysBetween(today, t.start) <= 14) return true;
        if ((t.delayCausedBy || "").trim()) return true;
        if (t.status === "Due soon" && t.percentComplete < 50) return true;
        return false;
      })
      .sort((a, b) => b.risk - a.risk);
  }, [filtered]);

  return (
    <div>
      <SectionHeader sub="Tasks needing a nudge — overdue, delayed, low progress with approaching deadlines">PMO chase list</SectionHeader>
      <div
        style={{
          background: MAG.white,
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {chaseItems.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: MAG.grey400 }}>Nothing to chase right now.</div>
        ) : (
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${MAG.grey100}` }}>
                {["Task", "Lead", "Quarter", "Finish", "Status", "% done", "Delay reason", "Commentary"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "6px 8px",
                      fontSize: 11,
                      fontWeight: 700,
                      color: MAG.grey400,
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chaseItems.map((t) => (
                <tr key={t.id} style={{ borderBottom: `1px solid ${MAG.grey100}` }}>
                  <td style={{ padding: "10px 8px", fontWeight: 700, color: MAG.navy, maxWidth: 240 }}>{t.taskName}</td>
                  <td style={{ padding: "10px 8px", color: MAG.grey600 }}>{t.assignedTo}</td>
                  <td style={{ padding: "10px 8px", color: MAG.grey600 }}>{t.quarter}</td>
                  <td style={{ padding: "10px 8px", color: MAG.grey600, whiteSpace: "nowrap" }}>
                    {t.finish}
                    <div style={{ fontSize: 11, color: t.daysToFinish < 0 ? MAG.red : MAG.grey400 }}>
                      {t.daysToFinish < 0 ? `${Math.abs(t.daysToFinish)}d overdue` : `${t.daysToFinish}d left`}
                    </div>
                  </td>
                  <td style={{ padding: "10px 8px" }}>
                    <StatusBadge status={t.status} />
                  </td>
                  <td style={{ padding: "10px 8px", width: 80 }}>
                    <ProgressBar value={t.percentComplete} />
                    <div style={{ fontSize: 11, color: MAG.grey600, marginTop: 2, textAlign: "center" }}>{t.percentComplete}%</div>
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: t.delayCausedBy ? MAG.red : MAG.grey400,
                      fontWeight: t.delayCausedBy ? 700 : 500,
                      maxWidth: 170,
                    }}
                  >
                    {t.delayCausedBy || "—"}
                  </td>
                  <td
                    style={{
                      padding: "10px 8px",
                      color: MAG.grey600,
                      fontSize: 12,
                      maxWidth: 260,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.commentary || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function TaskDetailTab({ filtered }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = filtered.find((t) => t.id === selectedId);

  return (
    <div>
      <SectionHeader sub="Click any task to see the full picture">Task detail</SectionHeader>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 16,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            maxHeight: 450,
            overflowY: "auto",
          }}
        >
          {filtered.map((t) => (
            <div
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                marginBottom: 8,
                cursor: "pointer",
                background: selectedId === t.id ? MAG.skyMuted : "transparent",
                border: selectedId === t.id ? `1px solid ${MAG.sky}` : `1px solid transparent`,
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ fontWeight: 700, color: MAG.navy, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {t.taskName}
                </span>
                <StatusBadge status={t.status} />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 12, color: MAG.grey400 }}>
                <span>{t.assignedTo}</span>
                <span>{t.quarter}</span>
                <PriorityDot priority={t.priority} />
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: MAG.white,
            borderRadius: 12,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            minHeight: 450,
          }}
        >
          {!selected ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: MAG.grey400,
                gap: 10,
              }}
            >
              <Eye size={32} />
              <span style={{ fontSize: 14, fontWeight: 600 }}>Select a task to view details</span>
            </div>
          ) : (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 900, color: MAG.navy, marginBottom: 16 }}>{selected.taskName}</h3>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                {[
                  ["Owner", selected.assignedTo],
                  ["Bucket", selected.bucket],
                  ["Quarter", selected.quarter],
                  ["Priority", null, <PriorityDot priority={selected.priority} />],
                  ["Start", selected.start],
                  ["Finish", selected.finish],
                  ["Status", null, <StatusBadge status={selected.status} />],
                  ["Labels", (selected.labels || []).join(", ")],
                  ["Goal", selected.goal],
                  [
                    "Days to finish",
                    selected.daysToFinish < 0
                      ? `${Math.abs(selected.daysToFinish)} days overdue`
                      : `${selected.daysToFinish} days`,
                  ],
                ].map(([label, val, comp]) => (
                  <div key={label}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: MAG.grey400,
                        textTransform: "uppercase",
                        marginBottom: 3,
                      }}
                    >
                      {label}
                    </div>
                    {comp || <div style={{ fontSize: 14, color: MAG.navy, fontWeight: 600 }}>{val}</div>}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: MAG.grey400,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Progress
                </div>
                <ProgressBar value={selected.percentComplete} />
                <div style={{ fontSize: 13, color: MAG.grey600, marginTop: 6, fontWeight: 600 }}>
                  {selected.percentComplete}% — Effort: {selected.effortCompleted || 0}/{selected.effort || 0} days ({selected.effortRemaining || 0}d remaining)
                </div>
              </div>

              {selected.delayCausedBy && (
                <div style={{ background: MAG.redSoft, borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      color: MAG.red,
                      textTransform: "uppercase",
                      marginBottom: 2,
                    }}
                  >
                    Delay caused by
                  </div>
                  <div style={{ fontSize: 13, color: MAG.red, fontWeight: 700 }}>{selected.delayCausedBy}</div>
                </div>
              )}

              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: MAG.grey400,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Commentary
                </div>
                <div style={{ fontSize: 13, color: MAG.grey600, lineHeight: 1.5 }}>{selected.commentary || "No commentary recorded."}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   Main Dashboard
   ─────────────────────────────────────────────────────────── */
const TABS = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "workload", label: "Workload", icon: Users },
  { key: "chase", label: "Chase list", icon: AlertTriangle },
  { key: "detail", label: "Task detail", icon: Eye },
];

export default function FY27AuditPlanner() {
  const [todayISO] = useState("2026-05-06");
  const [tab, setTab] = useState("overview");

  // Filter state
  const [q, setQ] = useState("All");
  const [bucket, setBucket] = useState("All");
  const [owner, setOwner] = useState("All");
  const [priority, setPriority] = useState("All");
  const [goal, setGoal] = useState("All");
  const [search, setSearch] = useState("");

  const quarters = useMemo(() => unique(MOCK_TASKS.map((t) => t.quarter)), []);
  const buckets = useMemo(() => unique(MOCK_TASKS.map((t) => t.bucket)), []);
  const owners = useMemo(() => unique(MOCK_TASKS.map((t) => t.assignedTo)), []);
  const priorities = useMemo(() => unique(MOCK_TASKS.map((t) => t.priority)), []);
  const goals = useMemo(() => unique(MOCK_TASKS.map((t) => t.goal)), []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return MOCK_TASKS.filter((t) => {
      if (q !== "All" && t.quarter !== q) return false;
      if (bucket !== "All" && t.bucket !== bucket) return false;
      if (owner !== "All" && t.assignedTo !== owner) return false;
      if (priority !== "All" && t.priority !== priority) return false;
      if (goal !== "All" && t.goal !== goal) return false;
      if (s && !`${t.taskName} ${t.assignedTo} ${t.bucket} ${t.delayCausedBy} ${t.goal}`.toLowerCase().includes(s))
        return false;
      return true;
    }).map((t) => ({
      ...t,
      status: statusFor(t, todayISO),
      risk: riskScore(t, todayISO),
      daysToFinish: daysBetween(todayISO, t.finish),
    }));
  }, [q, bucket, owner, priority, goal, search, todayISO]);

  const kpis = useMemo(() => {
    const total = filtered.length;
    return {
      total,
      complete: filtered.filter((t) => t.status === "Complete").length,
      overdue: filtered.filter((t) => t.status === "Overdue").length,
      dueSoon: filtered.filter((t) => t.status === "Due soon").length,
      inProgress: filtered.filter((t) => t.status === "In progress").length,
    };
  }, [filtered]);

  const hasFilters = q !== "All" || bucket !== "All" || owner !== "All" || priority !== "All" || goal !== "All" || !!search;

  return (
    <div style={{ minHeight: "100vh", background: MAG.offWhite, fontFamily: "'Segoe UI', -apple-system, sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: MAG.navy,
          padding: "20px 32px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: MAG.ocean,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LayoutDashboard size={20} color={MAG.white} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 900, color: MAG.white, letterSpacing: -0.3 }}>
                FY27 Assurance Programme Planner
              </h1>
              <p style={{ margin: 0, fontSize: 12, color: MAG.sky }}>Group Compliance & Assurance · Second Line</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 12, color: MAG.grey200 }}>Data as at: {todayISO}</span>
          <span
            style={{
              fontSize: 11,
              color: MAG.sky,
              background: `${MAG.sky}20`,
              padding: "4px 10px",
              borderRadius: 6,
              fontWeight: 800,
            }}
          >
            PROTOTYPE
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: MAG.white, borderBottom: `1px solid ${MAG.grey100}`, padding: "0 32px", display: "flex" }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "14px 20px",
              fontSize: 13,
              fontWeight: tab === key ? 900 : 600,
              color: tab === key ? MAG.ocean : MAG.grey400,
              background: "none",
              border: "none",
              borderBottom: tab === key ? `3px solid ${MAG.ocean}` : "3px solid transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
            }}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ padding: "16px 32px", background: MAG.white, borderBottom: `1px solid ${MAG.grey100}` }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
          <FilterDropdown label="Quarter" value={q} onChange={setQ} options={quarters} />
          <FilterDropdown label="Bucket" value={bucket} onChange={setBucket} options={buckets} />
          <FilterDropdown label="Assigned to" value={owner} onChange={setOwner} options={owners} />
          <FilterDropdown label="Priority" value={priority} onChange={setPriority} options={priorities} />
          <FilterDropdown label="Goal" value={goal} onChange={setGoal} options={goals} />

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: MAG.grey400,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Search
            </label>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: 9, color: MAG.grey400 }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Task, owner, delay..."
                style={{
                  padding: "7px 10px 7px 30px",
                  borderRadius: 8,
                  border: `1px solid ${MAG.grey200}`,
                  fontSize: 13,
                  color: MAG.navy,
                  width: 200,
                  outline: "none",
                }}
              />
            </div>
          </div>

          {hasFilters && (
            <button
              onClick={() => {
                setQ("All");
                setBucket("All");
                setOwner("All");
                setPriority("All");
                setGoal("All");
                setSearch("");
              }}
              style={{
                padding: "7px 14px",
                borderRadius: 8,
                border: `1px solid ${MAG.grey200}`,
                background: MAG.white,
                fontSize: 12,
                color: MAG.grey600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontWeight: 700,
              }}
            >
              <X size={13} /> Clear filters
            </button>
          )}

          <div style={{ marginLeft: "auto", fontSize: 12, color: MAG.grey400, alignSelf: "flex-end", paddingBottom: 8 }}>
            Showing {filtered.length} of {MOCK_TASKS.length} tasks
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 32px" }}>
        {tab === "overview" && <OverviewTab filtered={filtered} kpis={kpis} todayISO={todayISO} />}
        {tab === "workload" && <WorkloadTab filtered={filtered} />}
        {tab === "chase" && <ChaseListTab filtered={filtered} />}
        {tab === "detail" && <TaskDetailTab filtered={filtered} />}
      </div>

      {/* Footer */}
      <div style={{ padding: "16px 32px", borderTop: `1px solid ${MAG.grey100}`, fontSize: 11, color: MAG.grey400 }}>
        Prototype mockup — layout validation for Power BI build. Source: Microsoft Planner → Excel weekly export. Weekly snapshot append recommended from Week 1 for future trend pages.
      </div>
    </div>
  );
}
