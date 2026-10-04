
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  FileText,
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const Apply2 = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const [formData, setFormData] = useState({
    announcement: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Get available announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/announcement"
        );

        setAnnouncements(data.announcements || data);
      } catch (error) {
        console.error(error);

        setMessage({
          type: "error",
          text: "Could not load available stages.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementChange = (e) => {
    const id = e.target.value;

    const announcement = announcements.find(
      (item) => item._id === id
    );

    setSelectedAnnouncement(announcement);

    setFormData({
      ...formData,
      announcement: id,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.announcement) {
      setMessage({
        type: "error",
        text: "Please select a stage.",
      });
      return;
    }

    try {
      setSubmitting(true);
      setMessage({ type: "", text: "" });

      const { data } = await axios.post(
        "http://localhost:5000/api/stage-application/create",
        {
          announcement: formData.announcement,
          location: formData.location,
          message: formData.message,
        },
        {
          withCredentials: true,
        }
      );

      setMessage({
        type: "success",
        text:
          data.message ||
          "Your application has been submitted successfully.",
      });

      setFormData({
        announcement: "",
        location: "",
        message: "",
      });

      setSelectedAnnouncement(null);
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong while submitting your application.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Apply for Stage
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Select an available stage and submit your application.
          </p>
        </div>

        {/* Alert */}
        {message.text && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-xl border p-4 ${
              message.type === "success"
                ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}

            <span>{message.text}</span>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left - Application Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <FileText size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Application Form
                </h2>

                <p className="text-sm text-slate-500">
                  Fill in the required information
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Stage */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Select Stage
                </label>

                {loading ? (
                  <div className="flex items-center gap-2 rounded-xl border p-3 text-slate-500">
                    <Loader2 className="animate-spin" size={18} />
                    Loading stages...
                  </div>
                ) : (
                  <select
                    value={formData.announcement}
                    onChange={handleAnnouncementChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  >
                    <option value="">
                      Choose a stage
                    </option>

                    {announcements.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-3.5 text-slate-400"
                  />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your location"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell the administrator why you want to participate..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting || loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={19} />
                    Submit Application
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right - Stage Details */}
          <div>
            {selectedAnnouncement ? (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">

                {/* Image */}
                {selectedAnnouncement.image?.imageUrl && (
                  <img
                    src={selectedAnnouncement.image.imageUrl}
                    alt={selectedAnnouncement.title}
                    className="h-64 w-full object-cover"
                  />
                )}

                <div className="p-6">

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedAnnouncement.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {selectedAnnouncement.description}
                  </p>

                  <div className="mt-6 space-y-4">

                    {selectedAnnouncement.date && (
                      <div className="flex items-center gap-3">
                        <Calendar
                          size={19}
                          className="text-blue-600"
                        />

                        <div>
                          <p className="text-xs text-slate-500">
                            Date
                          </p>

                          <p className="font-medium text-slate-800 dark:text-white">
                            {new Date(
                              selectedAnnouncement.date
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedAnnouncement.time && (
                      <div className="flex items-center gap-3">
                        <Clock
                          size={19}
                          className="text-blue-600"
                        />

                        <div>
                          <p className="text-xs text-slate-500">
                            Time
                          </p>

                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedAnnouncement.time}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedAnnouncement.location && (
                      <div className="flex items-center gap-3">
                        <MapPin
                          size={19}
                          className="text-blue-600"
                        />

                        <div>
                          <p className="text-xs text-slate-500">
                            Stage Location
                          </p>

                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedAnnouncement.location}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedAnnouncement.maxParticipants && (
                      <div className="flex items-center gap-3">
                        <Users
                          size={19}
                          className="text-blue-600"
                        />

                        <div>
                          <p className="text-xs text-slate-500">
                            Maximum Participants
                          </p>

                          <p className="font-medium text-slate-800 dark:text-white">
                            {selectedAnnouncement.maxParticipants}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">

                <div>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    <FileText size={24} />
                  </div>

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Select a Stage
                  </h3>

                  <p className="mt-2 max-w-sm text-sm text-slate-500">
                    Select a stage from the form to see its details here.
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Apply2;


