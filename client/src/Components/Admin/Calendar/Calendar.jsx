
import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Clock,
  MapPin,
  Trash2,
  CalendarCheck,
  CalendarRange,
  ListFilter,
  Sparkles,
} from "lucide-react";

const eventTypes = {
  stage: {
    label: "Stage",
    color: "bg-violet-100 text-violet-700",
    dot: "bg-violet-500",
  },
  meeting: {
    label: "Meeting",
    color: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  event: {
    label: "Event",
    color: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
  },
  deadline: {
    label: "Deadline",
    color: "bg-rose-100 text-rose-700",
    dot: "bg-rose-500",
  },
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

const today = new Date();

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDate = (date) =>
  date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(getDateKey(today));
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "stage",
    date: getDateKey(today),
    time: "10:00",
    location: "",
    description: "",
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < 42; i++) {
    const dayNumber = i - firstDay + 1;
    const date = new Date(year, month, dayNumber);

    calendarDays.push({
      date,
      key: getDateKey(date),
      day: date.getDate(),
      currentMonth: date.getMonth() === month,
    });
  }

  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .filter((event) => filter === "all" || event.type === filter)
    .sort((a, b) => a.time.localeCompare(b.time));

  const monthEvents = events.filter((event) => {
    const date = parseDate(event.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(getDateKey(today));
  };

  const openCreateModal = () => {
    setForm({
      title: "",
      type: "stage",
      date: selectedDate,
      time: "10:00",
      location: "",
      description: "",
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date) return;

    const newEvent = {
      ...form,
      id: crypto.randomUUID(),
    };

    setEvents((prev) => [...prev, newEvent]);
    setSelectedDate(form.date);
    setCurrentDate(
      new Date(
        parseDate(form.date).getFullYear(),
        parseDate(form.date).getMonth(),
        1
      )
    );

    setShowModal(false);
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  const openDay = (key) => {
    setSelectedDate(key);
    setFilter("all");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-600">
              <CalendarDays size={17} />
              Bureau Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Calendar
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage stages, meetings, events, and important deadlines.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.98]"
          >
            <Plus size={18} />
            Create Event
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Events
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {events.length}
                </h3>
              </div>
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <CalendarRange size={23} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              All scheduled events
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  This Month
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {monthEvents.length}
                </h3>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CalendarCheck size={23} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Events in {monthName}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Selected Day
                </p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {events.filter((e) => e.date === selectedDate).length}
                </h3>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock size={23} />
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Scheduled for selected date
            </p>
          </div>
        </div>

        {/* Main Calendar */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">

          {/* Calendar Panel */}
          <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Calendar Toolbar */}
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {monthName}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Select a date to view its schedule
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Today
                </button>

                <button
                  onClick={goToPreviousMonth}
                  aria-label="Previous month"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <ChevronLeft size={19} />
                </button>

                <button
                  onClick={goToNextMonth}
                  aria-label="Next month"
                  className="rounded-lg border border-slate-300 p-2 text-slate-600 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">

                <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/70">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-500"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7">
                  {calendarDays.map((day) => {
                    const dayEvents = events.filter(
                      (event) => event.date === day.key
                    );

                    const isToday = day.key === getDateKey(today);
                    const isSelected = day.key === selectedDate;

                    return (
                      <button
                        key={day.key}
                        onClick={() => openDay(day.key)}
                        className={`group relative flex min-h-[105px] flex-col border-b border-r border-slate-100 p-2 text-left transition sm:min-h-[125px] sm:p-3 ${
                          !day.currentMonth
                            ? "bg-slate-50/70"
                            : "bg-white hover:bg-indigo-50/40"
                        } ${
                          isSelected
                            ? "z-10 bg-indigo-50/70 ring-2 ring-inset ring-indigo-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                              isToday
                                ? "bg-indigo-600 text-white"
                                : isSelected
                                ? "bg-indigo-100 text-indigo-700"
                                : day.currentMonth
                                ? "text-slate-700"
                                : "text-slate-300"
                            }`}
                          >
                            {day.day}
                          </span>

                          {dayEvents.length > 0 && (
                            <span className="text-[10px] font-medium text-slate-400">
                              {dayEvents.length}
                            </span>
                          )}
                        </div>

                        <div className="mt-2 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`truncate rounded-md px-1.5 py-1 text-[10px] font-semibold sm:text-xs ${
                                eventTypes[event.type]?.color ||
                                "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}

                          {dayEvents.length > 2 && (
                            <p className="px-1 text-[10px] font-medium text-slate-500">
                              +{dayEvents.length - 2} more
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-100 px-5 py-4">
              {Object.entries(eventTypes).map(([key, item]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
                  <span className="text-xs font-medium text-slate-600">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Daily Agenda */}
          <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Daily Agenda
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-slate-900">
                    {parseDate(selectedDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </h2>
                </div>

                <button
                  onClick={openCreateModal}
                  className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 transition hover:bg-indigo-100"
                  aria-label="Add event"
                >
                  <Plus size={19} />
                </button>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {formatDate(parseDate(selectedDate))}
              </p>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                <ListFilter size={16} className="shrink-0 text-slate-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="all">All event types</option>
                  {Object.entries(eventTypes).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="max-h-[520px] space-y-3 overflow-y-auto p-5">
              {selectedEvents.length === 0 ? (
                <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                  <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                    <CalendarDays size={30} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No events scheduled
                  </h3>

                  <p className="mt-1 max-w-[220px] text-sm text-slate-500">
                    There are no events for this date. Create one to get started.
                  </p>

                  <button
                    onClick={openCreateModal}
                    className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    + Add an event
                  </button>
                </div>
              ) : (
                selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            eventTypes[event.type]?.color
                          }`}
                        >
                          {eventTypes[event.type]?.label}
                        </span>

                        <h3 className="mt-3 break-words font-semibold text-slate-900">
                          {event.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => deleteEvent(event.id)}
                        aria-label="Delete event"
                        className="rounded-lg p-2 text-slate-400 opacity-100 transition hover:bg-rose-50 hover:text-rose-600 sm:opacity-0 sm:group-hover:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={14} />
                        {event.time}
                      </div>

                      {event.location && (
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin size={14} />
                          <span className="break-words">
                            {event.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-500">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Create Event Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-2 text-indigo-600">
                  <Sparkles size={17} />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Calendar Management
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Create New Event
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a stage, meeting, event, or deadline.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-xl bg-slate-100 p-2.5 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                aria-label="Close modal"
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Event Title <span className="text-rose-500">*</span>
                </label>

                <input
                  type="text"
                  required
                  maxLength={100}
                  placeholder="e.g. University Stage Performance"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Event Type
                  </label>

                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({ ...form, type: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="stage">Stage</option>
                    <option value="meeting">Meeting</option>
                    <option value="event">Event</option>
                    <option value="deadline">Deadline</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Event Date <span className="text-rose-500">*</span>
                  </label>

                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Event Time
                  </label>

                  <input
                    type="time"
                    value={form.time}
                    onChange={(e) =>
                      setForm({ ...form, time: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Location
                  </label>

                  <input
                    type="text"
                    placeholder="Enter venue"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows={4}
                  maxLength={1000}
                  placeholder="Write event details..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
                >
                  <Plus size={17} />
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}