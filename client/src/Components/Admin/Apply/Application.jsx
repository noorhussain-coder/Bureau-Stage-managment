import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get all applications
  const getApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:3000/api/apply/applications",
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.applications || res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  // Filter applications
  const filteredApplications = applications.filter((application) => {
    const value = search.toLowerCase();

    return (
      application.name?.toLowerCase().includes(value) ||
      application.email?.toLowerCase().includes(value) ||
      application.department?.toLowerCase().includes(value) ||
      application.stageTitle?.toLowerCase().includes(value)
    );
  });

  const getStatus = (status) => {
    if (status === "approved") {
      return (
        <span className="flex w-fit items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          <CheckCircle size={15} />
          Approved
        </span>
      );
    }

    if (status === "rejected") {
      return (
        <span className="flex w-fit items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          <XCircle size={15} />
          Rejected
        </span>
      );
    }

    return (
      <span className="flex w-fit items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
        <Clock size={15} />
        Pending
      </span>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications
        </h1>

        <p className="mt-1 text-gray-500">
          View and manage all student stage applications.
        </p>
      </div>

      {/* Top section */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Student Applications
            </h2>

            <p className="text-sm text-gray-500">
              Total Applications: {applications.length}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search student, email, stage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
          </div>

        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center">
          <p className="text-gray-500">
            Loading applications...
          </p>
        </div>
      ) : filteredApplications.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center">
          <p className="text-gray-500">
            No applications found.
          </p>
        </div>

      ) : (

        /* Table */
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="border-b bg-gray-50">

                <tr>
                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Stage
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Location
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {filteredApplications.map((application) => (

                  <tr
                    key={application._id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >

                    {/* Student */}
                    <td className="px-5 py-4">

                      <div>
                        <p className="font-semibold text-gray-800">
                          {application.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {application.email}
                        </p>

                      </div>

                    </td>

                    {/* Department */}
                    <td className="px-5 py-4">

                      <p className="text-gray-700">
                        {application.department}
                      </p>

                      <p className="text-sm text-gray-400">
                        Semester {application.semester}
                      </p>

                    </td>

                    {/* Stage */}
                    <td className="px-5 py-4">

                      <p className="font-medium text-gray-800">
                        {application.stageTitle}
                      </p>

                    </td>

                    {/* Date */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarDays size={16} />

                        {application.stageDate
                          ? new Date(
                              application.stageDate
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>

                    </td>

                    {/* Location */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />

                        {application.location || "N/A"}
                      </div>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {getStatus(application.status)}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">

                      <button
                        onClick={() =>
                          setSelectedApplication(application)
                        }
                        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
                      >
                        <Eye size={17} />
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* Details Modal */}
      {selectedApplication && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">

            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="text-sm text-gray-500">
                  Student stage application
                </p>
              </div>

              <button
                onClick={() => setSelectedApplication(null)}
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>

            </div>

            {/* Student Details */}
            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Student Name
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.name}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.email}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.phone}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.department}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Semester
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.semester}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  Status
                </p>

                {getStatus(selectedApplication.status)}
              </div>

            </div>

            {/* Stage */}
            <div className="mt-5 rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Stage Title
              </p>

              <p className="text-lg font-semibold text-gray-800">
                {selectedApplication.stageTitle}
              </p>

            </div>

            {/* Description */}
            <div className="mt-5">

              <p className="mb-2 text-sm font-medium text-gray-500">
                Description
              </p>

              <p className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">
                {selectedApplication.description}
              </p>

            </div>

            {/* Date & Location */}
            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">

                <CalendarDays className="text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Stage Date
                  </p>

                  <p className="font-semibold">
                    {selectedApplication.stageDate
                      ? new Date(
                          selectedApplication.stageDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">

                <MapPin className="text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {selectedApplication.location}
                  </p>
                </div>

              </div>

            </div>

            {/* Close */}
            <button
              onClick={() => setSelectedApplication(null)}
              className="mt-6 w-full rounded-lg bg-gray-800 py-3 font-semibold text-white hover:bg-gray-900"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
}