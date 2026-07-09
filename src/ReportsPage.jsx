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

function StatCard({ icon, accent, title, revenue, qty, orders }) {
  return (
    <div className="rp-card" style={{ background: "#fff", borderRadius: 14, padding: 22, boxShadow: "0 2px 10px rgba(20,30,60,0.08)", flex: 1, minWidth: 220, borderTop: `3px solid ${accent}`, transition: "transform 0.15s, box-shadow 0.15s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ color: "#697386", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.3 }}>{title}</span>
      </div>
      <div style={{ fontSize: 30, fontWeight: 800, color: NAV }}>{money(revenue)}</div>
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
      <style>{`
        .rp-back:hover { background: rgba(255,255,255,0.24) !important; }
        .rp-card:hover { transform: translateY(-3px); box-shadow: 0 10px 24px rgba(20,30,60,0.14) !important; }
        .rp-jump:hover { filter: brightness(1.08); box-shadow: 0 4px 12px rgba(58,126,245,0.4); }
        .rp-date:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px rgba(58,126,245,0.15); }
      `}</style>

      <div style={{ background: NAV, color: "#fff", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📊</span>
          <span style={{ fontWeight: 700, fontSize: 17 }}>Earnings Report</span>
        </div>
        <Link to="/" className="rp-back" style={{ color: "#fff", textDecoration: "none", background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, transition: "background 0.15s" }}>
          ← Back to POS
        </Link>
      </div>

      <div style={{ padding: 28, maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#495569" }}>Select date:</label>
          <input
            className="rp-date"
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            style={{ border: "1.5px solid #d8dee8", borderRadius: 8, padding: "7px 12px", fontSize: 13, outline: "none", background: "#fff", transition: "border-color 0.15s, box-shadow 0.15s" }}
          />
          {!isToday && (
            <button
              className="rp-jump"
              onClick={() => setDate(today)}
              style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "filter 0.15s, box-shadow 0.15s" }}>
              Jump to Today
            </button>
          )}
        </div>

        {loading && <div style={{ color: "#8a94a6", fontSize: 14 }}>Loading…</div>}
        {error && <div style={{ color: "#e55", fontSize: 14 }}>{error}</div>}

        {report && !loading && !error && (
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <StatCard icon="💰" accent={ACCENT} title={isToday ? "Today's Earnings" : `Earnings on ${date}`} {...report.day} />
            <StatCard icon="📅" accent="#8b5cf6" title="This Month" {...report.month} />
            <StatCard icon="📈" accent="#10b981" title="This Year" {...report.year} />
          </div>
        )}
      </div>
    </div>
  );
}
