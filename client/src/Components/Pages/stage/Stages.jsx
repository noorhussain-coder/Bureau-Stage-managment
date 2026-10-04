import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Search,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const THEMES = {
  dark: {
    bg: "#0B1B33",
    bgAlt: "#101F3A",
    surface: "#122140",
    surfaceStrong: "#17284A",
    border: "rgba(255,255,255,0.10)",
    text: "#EDEFF4",
    textMuted: "#93A2BC",
    accent: "#63A4FF",
    accentStrong: "#2F6FE0",
    accentSoft: "rgba(99,164,255,0.16)",
    navBg: "#0B1B33",
    onAccent: "#0B1B33",
  },

  light: {
    bg: "#F4F8FC",
    bgAlt: "#EAF1FA",
    surface: "#FFFFFF",
    surfaceStrong: "#EEF3FB",
    border: "rgba(11,27,51,0.10)",
    text: "#0E1F3D",
    textMuted: "#54638A",
    accent: "#2560E0",
    accentStrong: "#173F99",
    accentSoft: "rgba(37,96,224,0.10)",
    navBg: "#F4F8FC",
    onAccent: "#FFFFFF",
  },
};

const Stages = () => {
  const [theme, setTheme] = useState("dark");
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const t = THEMES[theme];
  const isDark = theme === "dark";

  // =========================================================
  // GET ALL STAGES
  // =========================================================
  const fetchStages = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:3000/api/stage/get",
        {
          withCredentials: true,
        }
      );

      // Handles different possible backend response formats
      const data =
        response.data?.stages ||
        response.data?.data ||
        response.data ||
        [];

      setStages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch stages error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load stages. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  // =========================================================
  // FORMAT DATE
  // =========================================================
  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================
  const formatTime = (time) => {
    if (!time) return "Time not available";

    // If backend stores HH:mm
    if (/^\d{2}:\d{2}$/.test(time)) {
      const [hours, minutes] = time.split(":");

      const date = new Date();
      date.setHours(Number(hours));
      date.setMinutes(Number(minutes));

      return date.toLocaleTimeString("en-PK", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return time;
  };

  // =========================================================
  // STATUS STYLE
  // =========================================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "upcoming":
        return {
          background: "rgba(99,164,255,0.16)",
          color: t.accent,
        };

      case "ongoing":
        return {
          background: "rgba(34,197,94,0.15)",
          color: "#22C55E",
        };

      case "completed":
        return {
          background: "rgba(148,163,184,0.16)",
          color: "#94A3B8",
        };

      case "cancelled":
        return {
          background: "rgba(239,68,68,0.15)",
          color: "#EF4444",
        };

      default:
        return {
          background: t.accentSoft,
          color: t.accent,
        };
    }
  };

  // =========================================================
  // FILTER STAGES
  // =========================================================
  const filteredStages = stages.filter((stage) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      stage.title?.toLowerCase().includes(searchText) ||
      stage.description?.toLowerCase().includes(searchText) ||
      stage.location?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" ||
      stage.status?.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // =========================================================
  // OPEN MAP
  // =========================================================
  const openMap = (stage) => {
    if (!stage.latitude || !stage.longitude) return;

    window.open(
      `https://www.google.com/maps?q=${stage.latitude},${stage.longitude}`,
      "_blank"
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: t.bg,
        color: t.text,
        padding: "30px",
        transition: "all 0.3s ease",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                color: t.accent,
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              BUREAU STAGE MANAGEMENT
            </p>

            <h1
              style={{
                fontSize: "32px",
                fontWeight: "800",
                margin: 0,
              }}
            >
              Available Stages
            </h1>

            <p
              style={{
                color: t.textMuted,
                marginTop: "8px",
              }}
            >
              Explore upcoming and available stages.
            </p>
          </div>

          {/* Theme button */}
          <button
            onClick={() =>
              setTheme(isDark ? "light" : "dark")
            }
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.text,
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div
            style={{
              flex: 1,
              minWidth: "250px",
              position: "relative",
            }}
          >
            <Search
              size={19}
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                color: t.textMuted,
              }}
            />

            <input
              type="text"
              placeholder="Search stages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 15px 13px 45px",
                borderRadius: "12px",
                border: `1px solid ${t.border}`,
                background: t.surface,
                color: t.text,
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "13px 40px 13px 15px",
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.text,
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="all">All Stages</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Refresh */}
          <button
            onClick={fetchStages}
            style={{
              width: "48px",
              borderRadius: "12px",
              border: `1px solid ${t.border}`,
              background: t.surface,
              color: t.accent,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RefreshCw size={19} />
          </button>
        </div>

        {/* =====================================================
            LOADING
        ===================================================== */}
        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "80px 20px",
              color: t.textMuted,
            }}
          >
            <RefreshCw
              size={32}
              style={{
                animation: "spin 1s linear infinite",
                marginBottom: "12px",
              }}
            />

            <p>Loading stages...</p>
          </div>
        )}

        {/* =====================================================
            ERROR
        ===================================================== */}
        {!loading && error && (
          <div
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: "16px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <AlertCircle
              size={35}
              color="#EF4444"
              style={{ marginBottom: "10px" }}
            />

            <p style={{ color: "#EF4444" }}>{error}</p>

            <button
              onClick={fetchStages}
              style={{
                marginTop: "10px",
                padding: "10px 18px",
                border: "none",
                borderRadius: "9px",
                background: t.accent,
                color: t.onAccent,
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* =====================================================
            NO STAGES
        ===================================================== */}
        {!loading &&
          !error &&
          filteredStages.length === 0 && (
            <div
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: "16px",
                padding: "70px 20px",
                textAlign: "center",
              }}
            >
              <Calendar
                size={40}
                color={t.textMuted}
                style={{ marginBottom: "12px" }}
              />

              <h3>No stages found</h3>

              <p style={{ color: t.textMuted }}>
                There are currently no stages matching your search.
              </p>
            </div>
          )}

        {/* =====================================================
            STAGES GRID
        ===================================================== */}
        {!loading &&
          !error &&
          filteredStages.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <span style={{ color: t.textMuted }}>
                  {filteredStages.length} stage
                  {filteredStages.length !== 1 ? "s" : ""} found
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "20px",
                }}
              >
                {filteredStages.map((stage) => (
                  <div
                    key={stage._id}
                    style={{
                      background: t.surface,
                      border: `1px solid ${t.border}`,
                      borderRadius: "18px",
                      overflow: "hidden",
                      boxShadow: isDark
                        ? "0 10px 30px rgba(0,0,0,0.15)"
                        : "0 10px 30px rgba(11,27,51,0.06)",
                    }}
                  >
                    {/* Map */}
                    {stage.latitude && stage.longitude ? (
                      <div
                        style={{
                          height: "190px",
                          background: t.bgAlt,
                        }}
                      >
                        <iframe
                          title={`Map for ${stage.title}`}
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                            Number(stage.longitude) - 0.01
                          },${
                            Number(stage.latitude) - 0.01
                          },${
                            Number(stage.longitude) + 0.01
                          },${
                            Number(stage.latitude) + 0.01
                          }&layer=mapnik&marker=${
                            stage.latitude
                          },${stage.longitude}`}
                          width="100%"
                          height="100%"
                          style={{
                            border: 0,
                          }}
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          height: "190px",
                          background: t.bgAlt,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: t.textMuted,
                        }}
                      >
                        <MapPin size={30} />
                        <span style={{ marginLeft: "8px" }}>
                          Location unavailable
                        </span>
                      </div>
                    )}

                    {/* Content */}
                    <div style={{ padding: "20px" }}>
                      {/* Status */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            ...getStatusStyle(stage.status),
                            padding: "6px 10px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            fontWeight: "700",
                            textTransform: "capitalize",
                          }}
                        >
                          {stage.status || "unknown"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2
                        style={{
                          fontSize: "20px",
                          margin: "0 0 10px",
                          fontWeight: "750",
                        }}
                      >
                        {stage.title}
                      </h2>

                      {/* Description */}
                      <p
                        style={{
                          color: t.textMuted,
                          fontSize: "14px",
                          lineHeight: "1.6",
                          marginBottom: "18px",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {stage.description ||
                          "No description available."}
                      </p>

                      {/* Location */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "12px",
                          color: t.textMuted,
                          fontSize: "14px",
                        }}
                      >
                        <MapPin
                          size={18}
                          color={t.accent}
                          style={{ flexShrink: 0 }}
                        />

                        <span>
                          {stage.location ||
                            "Location not available"}
                        </span>
                      </div>

                      {/* Date */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "10px",
                          color: t.textMuted,
                          fontSize: "14px",
                        }}
                      >
                        <Calendar
                          size={18}
                          color={t.accent}
                        />

                        <span>
                          {formatDate(
                            stage.startTime || stage.date
                          )}
                        </span>
                      </div>

                      {/* Time */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginBottom: "20px",
                          color: t.textMuted,
                          fontSize: "14px",
                        }}
                      >
                        <Clock
                          size={18}
                          color={t.accent}
                        />

                        <span>
                          {formatTime(stage.startTime)}{" "}
                          {stage.endTime && (
                            <>
                              - {formatTime(stage.endTime)}
                            </>
                          )}
                        </span>
                      </div>

                      {/* Buttons */}
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                        }}
                      >
                        <button
                          onClick={() => openMap(stage)}
                          style={{
                            flex: 1,
                            padding: "11px",
                            borderRadius: "10px",
                            border: `1px solid ${t.border}`,
                            background: t.surfaceStrong,
                            color: t.text,
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          View Map
                        </button>

                        <button
                          onClick={() =>
                            (window.location.href = `/apply/${stage._id}`)
                          }
                          disabled={
                            stage.status === "completed" ||
                            stage.status === "cancelled"
                          }
                          style={{
                            flex: 1,
                            padding: "11px",
                            borderRadius: "10px",
                            border: "none",
                            background:
                              stage.status === "completed" ||
                              stage.status === "cancelled"
                                ? t.surfaceStrong
                                : t.accent,
                            color:
                              stage.status === "completed" ||
                              stage.status === "cancelled"
                                ? t.textMuted
                                : t.onAccent,
                            cursor:
                              stage.status === "completed" ||
                              stage.status === "cancelled"
                                ? "not-allowed"
                                : "pointer",
                            fontWeight: "700",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                          }}
                        >
                          Apply Now
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
      </div>

      {/* =====================================================
          SPIN ANIMATION
      ===================================================== */}
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Stages;