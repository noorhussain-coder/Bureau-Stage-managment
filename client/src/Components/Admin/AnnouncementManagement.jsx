
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  CalendarDays,
  Megaphone,
  LoaderCircle,
  RefreshCw,
  Eye,
  Lock,
  Unlock,
} from "lucide-react";

const API = "http://localhost:3000/api/announcements";

const initialForm = {
  title: "",
  description: "",
  type: "stage",
  applicationDeadline: "",
  requirements: [],
  isOpen: true,
};

export default function AnnouncementManagement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [requirementInput, setRequirementInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(API, {
        withCredentials: true,
      });

      setAnnouncements(
        Array.isArray(data)
          ? data
          : data.announcements || data.data || []
      );
    } catch (error) {
      console.error(error);
      // alert(
      //   error.response?.data?.message ||
      //     "Failed to load announcements"
      // );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const text =
        `${item.title} ${item.description}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      const matchesType =
        filterType === "all" || item.type === filterType;

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "open" && item.isOpen) ||
        (filterStatus === "closed" && !item.isOpen);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [announcements, search, filterType, filterStatus]);

  const openCreateModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);

    setForm({
      title: item.title || "",
      description: item.description || "",
      type: item.type || "stage",
      applicationDeadline: item.applicationDeadline
        ? new Date(item.applicationDeadline)
            .toISOString()
            .slice(0, 16)
        : "",
      requirements: item.requirements || [],
      isOpen: item.isOpen ?? true,
    });

    setModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addRequirement = () => {
    const value = requirementInput.trim();

    if (!value) return;

    setForm((prev) => ({
      ...prev,
      requirements: [...prev.requirements, value],
    }));

    setRequirementInput("");
  };

  const removeRequirement = (index) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        ...form,
        applicationDeadline: new Date(
          form.applicationDeadline
        ).toISOString(),
      };

      if (editingId) {
        await axios.put(`${API}/${editingId}`, payload, {
          withCredentials: true,
        });
      } else {
        alert(
          "For creating an announcement, select a stage in the create form."
        );
        return;
      }

      setModalOpen(false);
      await fetchAnnouncements();
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Unable to save announcement"
      );
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (item) => {
    try {
      await axios.put(
        `${API}/${item._id}`,
        { isOpen: !item.isOpen },
        { withCredentials: true }
      );

      await fetchAnnouncements();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update application status"
      );
    }
  };

  const deleteAnnouncement = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API}/${id}`, {
        withCredentials: true,
      });

      setAnnouncements((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete announcement"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-800 dark:bg-slate-950 dark:text-slate-100 sm:p-6">

      {/* Header */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-blue-600">
            <Megaphone size={17} />
            Admin / Announcements
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Announcement Management
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage stage announcements and application availability.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchAnnouncements}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
          >
            <RefreshCw size={16} />
            Refresh
          </button>

          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={17} />
            Create
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Total Announcements</p>
          <h2 className="mt-2 text-3xl font-bold">
            {announcements.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Open Applications</p>
          <h2 className="mt-2 text-3xl font-bold text-emerald-600">
            {announcements.filter((a) => a.isOpen).length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Closed Applications</p>
          <h2 className="mt-2 text-3xl font-bold text-rose-600">
            {announcements.filter((a) => !a.isOpen).length}
          </h2>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search announcements..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">All Types</option>
          <option value="drama">Drama</option>
          <option value="stage">Stage</option>
          <option value="event">Event</option>
          <option value="audition">Audition</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Announcement Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <LoaderCircle className="animate-spin text-blue-600" size={32} />
        </div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center dark:border-slate-700">
          <Megaphone className="mx-auto mb-3 text-slate-400" size={35} />
          <h3 className="font-semibold">No announcements found</h3>
          <p className="mt-1 text-sm text-slate-500">
            Create an announcement or change your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredAnnouncements.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {item.type}
                  </span>

                  <h3 className="mt-3 text-lg font-bold">
                    {item.title}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    item.isOpen
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  }`}
                >
                  {item.isOpen ? "Open" : "Closed"}
                </span>
              </div>

              <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>

              <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} />
                Deadline: {formatDate(item.applicationDeadline)}
              </div>

              {item.stage && (
                <div className="mb-4 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800">
                  <span className="text-slate-500">Linked Stage: </span>
                  <span className="font-medium">
                    {item.stage.title || "Stage"}
                  </span>
                </div>
              )}

              {item.requirements?.length > 0 && (
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Requirements
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.requirements.map((requirement, index) => (
                      <span
                        key={index}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs dark:bg-slate-800"
                      >
                        {requirement}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  <Edit size={15} />
                  Edit
                </button>

                <button
                  onClick={() => toggleStatus(item)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                    item.isOpen
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {item.isOpen ? <Lock size={15} /> : <Unlock size={15} />}
                  {item.isOpen ? "Close Applications" : "Open Applications"}
                </button>

                <button
                  onClick={() => deleteAnnouncement(item._id)}
                  className="ml-auto flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600 hover:bg-rose-100"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-8 w-full max-w-2xl rounded-2xl bg-white p-5 shadow-xl dark:bg-slate-900 sm:p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Edit Announcement
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update announcement information.
                </p>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Announcement Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Type
                  </label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                  >
                    <option value="drama">Drama</option>
                    <option value="stage">Stage</option>
                    <option value="event">Event</option>
                    <option value="audition">Audition</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Application Deadline
                  </label>
                  <input
                    type="datetime-local"
                    name="applicationDeadline"
                    value={form.applicationDeadline}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Requirements
                </label>

                <div className="flex gap-2">
                  <input
                    value={requirementInput}
                    onChange={(e) =>
                      setRequirementInput(e.target.value)
                    }
                    placeholder="Add requirement"
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
                  />

                  <button
                    type="button"
                    onClick={addRequirement}
                    className="rounded-xl bg-blue-600 px-4 text-white"
                  >
                    Add
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {form.requirements.map((requirement, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {requirement}
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
                <input
                  type="checkbox"
                  name="isOpen"
                  checked={form.isOpen}
                  onChange={handleChange}
                  className="h-4 w-4 accent-blue-600"
                />
                Allow students to apply
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle size={16} className="animate-spin" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
