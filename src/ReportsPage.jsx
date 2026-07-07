import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NAV = "#1c2b4b";
const ACCENT = "#3a7ef5";

const todayStr = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const money = (n) => `₹${Number(n).toFixed(2)}`;

function StatCard({ title, revenue, qty, orders }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1, minWidth: 220 }}>
      <div style={{ color: "#8a94a6", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: NAV }}>{money(revenue)}</div>
      <div style={{ color: "#8a94a6", fontSize: 13, marginTop: 8 }}>{qty} items sold · {orders} orders</div>
    </div>
  );
}

export default function ReportsPage() {
  const [date, setDate] = useState(todayStr());
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`/api/reports?date=${encodeURIComponent(date)}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load report");
        return r.json();
      })
      .then(setReport)
      .catch(() => setError("Could not load earnings report."))
      .finally(() => setLoading(false));
  }, [date]);

  const today = todayStr();
  const isToday = date === today;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fa", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: NAV, color: "#fff", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📊</span>
          <span style={{ fontWeight: 700, fontSize: 17 }}>Earnings Report</span>
        </div>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600 }}>
          ← Back to POS
        </Link>
      </div>

      <div style={{ padding: 28, maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#495569" }}>Select date:</label>
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            style={{ border: "1px solid #d8dee8", borderRadius: 8, padding: "6px 10px", fontSize: 13, outline: "none" }}
          />
          {!isToday && (
            <button
              onClick={() => setDate(today)}
              style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Jump to Today
            </button>
          )}
        </div>

        {loading && <div style={{ color: "#8a94a6" }}>Loading…</div>}
        {error && <div style={{ color: "#e55" }}>{error}</div>}

        {report && !loading && !error && (
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <StatCard title={isToday ? "Today's Earnings" : `Earnings on ${date}`} {...report.day} />
            <StatCard title="This Month" {...report.month} />
            <StatCard title="This Year" {...report.year} />
          </div>
        )}
      </div>
    </div>
  );
}
