import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Apply() {
    const {id}=useParams()
    // console.log(id)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    // stageTitle: "",
    description: "",
    stage:id
    // stageDate: "",
    // location: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/apply/applications",
        form,
        { withCredentials: true }
      );

      setMessage(res.data.message || "Application submitted successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        semester: "",
        stageTitle: "",
        description: "",
        // stageDate: "",
        // location: "",
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Application submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-lg md:p-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Apply for Stage
          </h1>

          <p className="mt-2 text-gray-500">
            Fill out the form below to submit your stage application.
          </p>
        </div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Student Information */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Student Information
            </h2>

            <div className="grid gap-4 md:grid-cols-2">

              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={form.department}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              <select
                name="semester"
                value={form.semester}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none"
              >
                <option value="">Select Semester</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>

            </div>
          </div>

          {/* Stage Information */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Stage Information
            </h2>

            <div className="space-y-4">

              <input
                type="text"
                name="stageTitle"
                placeholder="Stage Title"
                value={form.stageTitle}
                onChange={handleChange}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              <textarea
                name="description"
                placeholder="Describe your stage / performance"
                value={form.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />

              {/* <div className="grid gap-4 md:grid-cols-2">



           

              </div> */}

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>

        </form>
      </div>
    </div>
  );
}