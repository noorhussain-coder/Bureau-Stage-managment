import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Mail,
  Send,
  Search,
  Users,
  User,
  X,
  Check,
  Loader2,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function CreateEmail() {
  const [students, setStudents] = useState([]);

  const [recipientType, setRecipientType] = useState("selected");

  const [selectedStudents, setSelectedStudents] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    subject: "",
    text: "",
    cc: "",
    bcc: "",
  });

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [sending, setSending] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // --------------------------------------------------
  // Axios
  // --------------------------------------------------

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_URL,
        withCredentials: true,
      }),
    []
  );

  // --------------------------------------------------
  // Get Students
  // --------------------------------------------------

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);

      const { data } = await api.get("/api/users");

      setStudents(data.users || data);
    } catch (error) {
      console.error(error);

      // setMessage({
      //   type: "error",
      //   text:
      //     error.response?.data?.message ||
      //     "Unable to load students",
      // });
    } finally {
      setLoadingStudents(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // --------------------------------------------------
  // Form Change
  // --------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // Filter Students
  // --------------------------------------------------

  const filteredStudents = students.filter((student) => {
    const value = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(value) ||
      student.email?.toLowerCase().includes(value)
    );
  });

  // --------------------------------------------------
  // Select Student
  // --------------------------------------------------

  const toggleStudent = (student) => {
    setSelectedStudents((prev) => {
      const exists = prev.some(
        (item) => item._id === student._id
      );

      if (exists) {
        return prev.filter(
          (item) => item._id !== student._id
        );
      }

      return [...prev, student];
    });
  };

  // --------------------------------------------------
  // Select All
  // --------------------------------------------------

  const selectAll = () => {
    setSelectedStudents(filteredStudents);
  };

  // --------------------------------------------------
  // Remove Student
  // --------------------------------------------------

  const removeStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.filter((student) => student._id !== id)
    );
  };

  // --------------------------------------------------
  // Get Recipients
  // --------------------------------------------------

  const getRecipients = () => {
    if (recipientType === "all") {
      return students.map((student) => student.email);
    }

    if (recipientType === "selected") {
      return selectedStudents.map(
        (student) => student.email
      );
    }

    return [];
  };

  // --------------------------------------------------
  // Send Email
  // --------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({
      type: "",
      text: "",
    });

    const recipients = getRecipients();

    if (recipients.length === 0) {
      setMessage({
        type: "error",
        text: "Please select at least one recipient.",
      });

      return;
    }

    if (!form.subject.trim()) {
      setMessage({
        type: "error",
        text: "Please enter email subject.",
      });

      return;
    }

    if (!form.text.trim()) {
      setMessage({
        type: "error",
        text: "Please enter email message.",
      });

      return;
    }

    try {
      setSending(true);

      await api.post("/api/emails/send", {
        to: recipients,
        subject: form.subject,
        text: form.text,
        cc: form.cc,
        bcc: form.bcc,
      });

      setMessage({
        type: "success",
        text: `Email sent successfully to ${recipients.length} recipient(s).`,
      });

      setForm({
        subject: "",
        text: "",
        cc: "",
        bcc: "",
      });

      setSelectedStudents([]);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Unable to send email.",
      });
    } finally {
      setSending(false);
    }
  };

  // --------------------------------------------------
  // Styles
  // --------------------------------------------------

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-7">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-600 p-3 text-white">
            <Mail size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Send Email
            </h1>

            <p className="text-sm text-gray-500">
              Send announcements and notifications to students.
            </p>
          </div>
        </div>
      </div>

      {/* Message */}
      {message.text && (
        <div
          className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* LEFT - Recipients */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-1">

            <div className="border-b border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">
                    Recipients
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Select students who should receive this email.
                  </p>
                </div>

                <Users size={20} className="text-blue-600" />
              </div>
            </div>

            {/* Recipient Type */}
            <div className="space-y-2 p-5">

              <button
                type="button"
                onClick={() => setRecipientType("all")}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${
                  recipientType === "all"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <Users size={18} />

                <div>
                  <p className="text-sm font-semibold">
                    All Students
                  </p>

                  <p className="text-xs text-gray-500">
                    {students.length} students
                  </p>
                </div>

                {recipientType === "all" && (
                  <Check
                    size={18}
                    className="ml-auto text-blue-600"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => setRecipientType("selected")}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${
                  recipientType === "selected"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <User size={18} />

                <div>
                  <p className="text-sm font-semibold">
                    Selected Students
                  </p>

                  <p className="text-xs text-gray-500">
                    {selectedStudents.length} selected
                  </p>
                </div>

                {recipientType === "selected" && (
                  <Check
                    size={18}
                    className="ml-auto text-blue-600"
                  />
                )}
              </button>
            </div>

            {/* Search */}
            {recipientType === "selected" && (
              <>
                <div className="px-5">
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search students..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Select All */}
                <div className="flex items-center justify-between px-5 py-3">
                  <span className="text-xs text-gray-500">
                    {filteredStudents.length} students
                  </span>

                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Select All
                  </button>
                </div>

                {/* Students */}
                <div className="max-h-[430px] overflow-y-auto px-5 pb-5">

                  {loadingStudents ? (
                    <div className="flex justify-center py-10">
                      <Loader2
                        className="animate-spin text-blue-600"
                      />
                    </div>
                  ) : filteredStudents.length === 0 ? (
                    <p className="py-10 text-center text-sm text-gray-400">
                      No students found.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredStudents.map((student) => {

                        const selected =
                          selectedStudents.some(
                            (item) =>
                              item._id === student._id
                          );

                        return (
                          <button
                            type="button"
                            key={student._id}
                            onClick={() =>
                              toggleStudent(student)
                            }
                            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                              selected
                                ? "border-blue-300 bg-blue-50"
                                : "border-gray-100 hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                              {student.name
                                ?.charAt(0)
                                ?.toUpperCase() || "S"}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-gray-800">
                                {student.name}
                              </p>

                              <p className="truncate text-xs text-gray-400">
                                {student.email}
                              </p>
                            </div>

                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                                selected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-gray-300"
                              }`}
                            >
                              {selected && (
                                <Check size={13} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* RIGHT - Email */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">

            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-900">
                Compose Email
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Write your announcement or notification.
              </p>
            </div>

            <div className="space-y-5 p-5">

              {/* Selected recipients */}
              {recipientType === "selected" &&
                selectedStudents.length > 0 && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Selected Recipients
                    </label>

                    <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto rounded-xl border border-gray-200 p-3">
                      {selectedStudents.map((student) => (
                        <span
                          key={student._id}
                          className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                        >
                          {student.name}

                          <button
                            type="button"
                            onClick={() =>
                              removeStudent(student._id)
                            }
                            className="hover:text-red-600"
                          >
                            <X size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {recipientType === "all" && (
                <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
                  <strong>{students.length}</strong>{" "}
                  students will receive this email.
                </div>
              )}

              {/* Subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Enter email subject"
                  className={inputClass}
                  required
                />
              </div>

              {/* CC */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  CC
                </label>

                <input
                  type="text"
                  name="cc"
                  value={form.cc}
                  onChange={handleChange}
                  placeholder="example@gmail.com, admin@gmail.com"
                  className={inputClass}
                />
              </div>

              {/* BCC */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  BCC
                </label>

                <input
                  type="text"
                  name="bcc"
                  value={form.bcc}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Message *
                </label>

                <textarea
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  rows={12}
                  placeholder="Write your message here..."
                  className={`${inputClass} resize-y`}
                  required
                />
              </div>

              {/* Send */}
              <div className="flex justify-end border-t border-gray-100 pt-5">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Email
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
