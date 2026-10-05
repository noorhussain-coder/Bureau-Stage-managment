import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText,
  RefreshCw,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// status values come from application.model.js: pending | inProcess | approved | reject
const STATUS = {
  pending: { label: "Pending", color: "#B7791F", bg: "rgba(236,170,40,0.16)", Icon: Clock },
  inProcess: { label: "In Process", color: "#2F6FE0", bg: "rgba(47,111,224,0.16)", Icon: Loader2 },
  approved: { label: "Approved", color: "#2F9E5B", bg: "rgba(47,158,91,0.16)", Icon: CheckCircle2 },
  reject: { label: "Rejected", color: "#D14343", bg: "rgba(209,67,67,0.16)", Icon: XCircle },
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "inProcess", label: "In Process" },
  { key: "approved", label: "Approved" },
  { key: "reject", label: "Rejected" },
];

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : "N/A";

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  const Icon = s.Icon;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      <Icon size={13} /> {s.label}
    </span>
  );
}

export default function MyApplications() {
  const { t } = useTheme();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API}/api/apply/applications/my`, {
        withCredentials: true,
      });
      setApplications(data.applications || []);
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Please log in to see your applications."
          : err.response?.data?.message || "Could not load your applications."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const count = (key) =>
    key === "all" ? applications.length : applications.filter((a) => a.status === key).length;

  const visible =
    filter === "all" ? applications : applications.filter((a) => a.status === filter);

  return (
    <div className="min-h-screen" style={{ background: t.bg }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: t.accent }}>
              Student Area
            </p>
            <h1 className="mt-1 text-3xl font-semibold" style={{ color: t.text }}>
              My Applications
            </h1>
            <p className="mt-1 text-sm" style={{ color: t.textMuted }}>
              Track the status of every stage application you have submitted.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm"
              style={{ borderColor: t.border, color: t.text, background: t.surface }}
            >
              <RefreshCw size={14} /> Refresh
            </button>
            <Link
              to="/stages"
              className="rounded-full px-4 py-2 text-sm font-semibold"
              style={{ background: t.accent, color: t.onAccent }}
            >
              Browse Stages
            </Link>
          </div>
        </div>

        {/* Summary cards */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["pending", "inProcess", "approved", "reject"].map((k) => (
            <div
              key={k}
              className="rounded-2xl border p-4"
              style={{ background: t.surface, borderColor: t.border }}
            >
              <p className="text-xs" style={{ color: t.textMuted }}>
                {STATUS[k].label}
              </p>
              <p className="mt-1 text-2xl font-semibold" style={{ color: STATUS[k].color }}>
                {count(k)}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="rounded-full border px-4 py-1.5 text-sm"
                style={{
                  borderColor: active ? t.accent : t.border,
                  background: active ? t.accentSoft : "transparent",
                  color: active ? t.accent : t.textMuted,
                }}
              >
                {f.label} ({count(f.key)})
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {loading && (
            <div
              className="flex items-center justify-center gap-2 rounded-2xl border p-10 text-sm"
              style={{ background: t.surface, borderColor: t.border, color: t.textMuted }}
            >
              <Loader2 size={16} className="animate-spin" /> Loading your applications...
            </div>
          )}

          {!loading && error && (
            <div
              className="rounded-2xl border p-6 text-sm"
              style={{ background: "rgba(209,67,67,0.10)", borderColor: "rgba(209,67,67,0.4)", color: "#D14343" }}
            >
              {error}{" "}
              {error.includes("log in") && (
                <Link to="/login" className="font-semibold underline">
                  Go to login
                </Link>
              )}
            </div>
          )}

          {!loading && !error && visible.length === 0 && (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ background: t.surface, borderColor: t.border }}
            >
              <FileText size={32} className="mx-auto" style={{ color: t.textMuted }} />
              <p className="mt-3 font-medium" style={{ color: t.text }}>
                {applications.length === 0 ? "No applications yet" : "No applications in this status"}
              </p>
              <p className="mt-1 text-sm" style={{ color: t.textMuted }}>
                {applications.length === 0
                  ? "Pick a stage and submit your first application."
                  : "Try a different filter."}
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            visible.map((app) => (
              <div
                key={app._id}
                className="rounded-2xl border p-5"
                style={{ background: t.surface, borderColor: t.border }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: t.text }}>
                      {app.stage?.title || "Stage unavailable"}
                    </h2>
                    <div
                      className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm"
                      style={{ color: t.textMuted }}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={14} /> {app.stage?.location || "N/A"}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} /> {fmt(app.stage?.startTime)} - {fmt(app.stage?.endTime)}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>

                {app.description && (
                  <p className="mt-4 text-sm" style={{ color: t.textMuted }}>
                    {app.description}
                  </p>
                )}

                <div
                  className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-1 border-t pt-3 text-xs"
                  style={{ borderColor: t.border, color: t.textMuted }}
                >
                  <span>Department: {app.department || "N/A"}</span>
                  <span>Semester: {app.semester || "N/A"}</span>
                  <span>Submitted: {fmt(app.createdAt)}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}