import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  FileText,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const initialForm = {
  stepNumber: "",
  title: "",
  description: "",
  icon: "FileText",
  isActive: true,
};

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
  },
};

export default function ApplicationProcessAdmin() {
  const [theme, setTheme] = useState("dark");
  const t = THEMES[theme];

  const [steps, setSteps] = useState([]);

  const [form, setForm] =
    useState(initialForm);

  const [editingId, setEditingId] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);


  // =====================================================
  // API
  // =====================================================

  const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });


  // =====================================================
  // GET STEPS
  // =====================================================

  const fetchSteps = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        "/api/application-process/admin"
      );

      setSteps(data.steps || []);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to load application process"
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSteps();
  }, []);


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };


  // =====================================================
  // CREATE
  // =====================================================

  const openCreate = () => {

    setEditingId(null);

    setForm({
      ...initialForm,
      stepNumber: steps.length + 1,
    });

    setShowForm(true);
  };


  // =====================================================
  // EDIT
  // =====================================================

  const openEdit = (step) => {

    setEditingId(step._id);

    setForm({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      icon: step.icon || "FileText",
      isActive: step.isActive,
    });

    setShowForm(true);
  };


  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {

    setForm(initialForm);

    setEditingId(null);

    setShowForm(false);
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.stepNumber ||
      !form.title.trim() ||
      !form.description.trim()
    ) {
      alert(
        "Please fill all required fields"
      );

      return;
    }

    try {

      setSaving(true);

      const payload = {
        stepNumber: Number(
          form.stepNumber
        ),

        title: form.title.trim(),

        description:
          form.description.trim(),

        icon: form.icon,

        isActive: form.isActive,
      };


      if (editingId) {

        await api.put(
          `/api/application-process/${editingId}`,
          payload
        );

      } else {

        await api.post(
          "/api/application-process",
          payload
        );

      }


      resetForm();

      await fetchSteps();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
          "Unable to save process step"
      );

    } finally {

      setSaving(false);

    }
  };


  // =====================================================
  // TOGGLE
  // =====================================================

  const toggleStep = async (id) => {

    try {

      await api.patch(
        `/api/application-process/${id}/toggle`
      );

      await fetchSteps();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to update step"
      );

    }
  };


  // =====================================================
  // DELETE
  // =====================================================

  const deleteStep = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this step?"
      )
    ) {
      return;
    }

    try {

      await api.delete(
        `/api/application-process/${id}`
      );

      await fetchSteps();

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to delete step"
      );

    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <div
      className="min-h-screen p-4 md:p-6"
      style={{
        background: t.bg,
        color: t.text,
      }}
    >

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Application Process
          </h1>

          <p
            className="mt-1 text-sm"
            style={{ color: t.textMuted }}
          >
            Manage the steps users see when
            applying for a stage.
          </p>

        </div>


        <div className="flex gap-2">

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="rounded-xl px-4 py-2 text-sm"
            style={{
              background: t.surfaceStrong,
              border: `1px solid ${t.border}`,
            }}
          >
            {theme === "dark"
              ? "Light"
              : "Dark"}
          </button>


          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
            style={{
              background: t.accent,
              color: "#fff",
            }}
          >
            <Plus size={18} />

            Add Step
          </button>

        </div>

      </div>


      {/* ========================================= */}
      {/* PROCESS STEPS */}
      {/* ========================================= */}

      <div className="space-y-4">

        {loading ? (

          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
            }}
          >

            <RefreshCw
              className="mx-auto mb-3 animate-spin"
              size={24}
            />

            Loading application process...

          </div>

        ) : steps.length === 0 ? (

          <div
            className="rounded-2xl p-10 text-center"
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
            }}
          >

            <FileText
              className="mx-auto mb-3"
              size={36}
            />

            <h3 className="font-semibold">
              No process steps
            </h3>

            <p
              className="mt-1 text-sm"
              style={{
                color: t.textMuted,
              }}
            >
              Add your first application
              process step.
            </p>

          </div>

        ) : (

          steps.map((step) => (

            <div
              key={step._id}
              className="rounded-2xl p-5"
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
              }}
            >

              <div className="flex flex-col gap-4 md:flex-row md:items-center">

                {/* NUMBER */}

                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                  style={{
                    background:
                      t.accentSoft,
                    color: t.accent,
                  }}
                >
                  {step.stepNumber}
                </div>


                {/* CONTENT */}

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="text-lg font-semibold">
                      {step.title}
                    </h3>

                    {step.isActive ? (

                      <span className="flex items-center gap-1 rounded-full px-2 py-1 text-xs"
                        style={{
                          background:
                            "rgba(34,197,94,.12)",
                          color:
                            "#22c55e",
                        }}
                      >
                        <CheckCircle size={13} />
                        Active
                      </span>

                    ) : (

                      <span className="flex items-center gap-1 rounded-full px-2 py-1 text-xs"
                        style={{
                          background:
                            "rgba(239,68,68,.12)",
                          color:
                            "#ef4444",
                        }}
                      >
                        <XCircle size={13} />
                        Inactive
                      </span>

                    )}

                  </div>


                  <p
                    className="mt-1 text-sm"
                    style={{
                      color: t.textMuted,
                    }}
                  >
                    {step.description}
                  </p>

                </div>


                {/* ACTIONS */}

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      toggleStep(step._id)
                    }
                    className="rounded-lg p-2"
                    style={{
                      background:
                        t.surfaceStrong,
                    }}
                    title="Toggle"
                  >
                    {step.isActive ? (
                      <XCircle size={18} />
                    ) : (
                      <CheckCircle size={18} />
                    )}
                  </button>


                  <button
                    onClick={() =>
                      openEdit(step)
                    }
                    className="rounded-lg p-2"
                    style={{
                      background:
                        t.accentSoft,
                      color: t.accent,
                    }}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>


                  <button
                    onClick={() =>
                      deleteStep(step._id)
                    }
                    className="rounded-lg p-2 text-red-500"
                    style={{
                      background:
                        "rgba(239,68,68,.10)",
                    }}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>


      {/* ========================================= */}
      {/* MODAL */}
      {/* ========================================= */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

          <div
            className="w-full max-w-lg rounded-2xl p-6"
            style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
            }}
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold">

                  {editingId
                    ? "Edit Process Step"
                    : "Add Process Step"}

                </h2>

                <p
                  className="text-sm"
                  style={{
                    color: t.textMuted,
                  }}
                >
                  This information will be
                  visible to users.
                </p>

              </div>


              <button
                onClick={resetForm}
                className="rounded-lg p-2"
                style={{
                  background:
                    t.surfaceStrong,
                }}
              >
                <X size={18} />
              </button>

            </div>


            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* STEP NUMBER */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Step Number
                </label>

                <input
                  type="number"
                  name="stepNumber"
                  value={form.stepNumber}
                  onChange={handleChange}
                  min="1"
                  className="w-full rounded-xl px-4 py-3 outline-none"
                  style={{
                    background:
                      t.surfaceStrong,
                    color: t.text,
                    border:
                      `1px solid ${t.border}`,
                  }}
                />

              </div>


              {/* TITLE */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Create an account"
                  className="w-full rounded-xl px-4 py-3 outline-none"
                  style={{
                    background:
                      t.surfaceStrong,
                    color: t.text,
                    border:
                      `1px solid ${t.border}`,
                  }}
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Explain this application step..."
                  className="w-full resize-none rounded-xl px-4 py-3 outline-none"
                  style={{
                    background:
                      t.surfaceStrong,
                    color: t.text,
                    border:
                      `1px solid ${t.border}`,
                  }}
                />

              </div>


              {/* ICON */}

              <div>

                <label className="mb-1 block text-sm font-medium">
                  Icon Name
                </label>

                <input
                  type="text"
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="FileText"
                  className="w-full rounded-xl px-4 py-3 outline-none"
                  style={{
                    background:
                      t.surfaceStrong,
                    color: t.text,
                    border:
                      `1px solid ${t.border}`,
                  }}
                />

              </div>


              {/* ACTIVE */}

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm">
                  Show this step to users
                </span>

              </label>


              {/* BUTTONS */}

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl px-5 py-3"
                  style={{
                    background:
                      t.surfaceStrong,
                  }}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl px-5 py-3 font-semibold"
                  style={{
                    background:
                      t.accent,
                    color: "#fff",
                  }}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Step"
                    : "Create Step"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}