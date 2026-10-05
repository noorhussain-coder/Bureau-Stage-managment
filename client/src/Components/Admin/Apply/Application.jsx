// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Search,
//   Eye,
//   CheckCircle,
//   XCircle,
//   Clock,
//   MapPin,
//   CalendarDays,
// } from "lucide-react";

// export default function Application() {
//   const [applications, setApplications] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Get all applications
//   const getApplications = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.get(
//         "http://localhost:3000/api/apply/applications",
//         {
//           withCredentials: true,
//         }
//       );

//       setApplications(res.data.applications || res.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getApplications();
//   }, []);

//   // Filter applications
//   const filteredApplications = applications.filter((application) => {
//     const value = search.toLowerCase();

//     return (
//       application.name?.toLowerCase().includes(value) ||
//       application.email?.toLowerCase().includes(value) ||
//       application.department?.toLowerCase().includes(value) ||
//       application.stageTitle?.toLowerCase().includes(value)
//     );
//   });

//   const getStatus = (status) => {
//     if (status === "approved") {
//       return (
//         <span className="flex w-fit items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
//           <CheckCircle size={15} />
//           Approved
//         </span>
//       );
//     }

//     if (status === "rejected") {
//       return (
//         <span className="flex w-fit items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
//           <XCircle size={15} />
//           Rejected
//         </span>
//       );
//     }

//     return (
//       <span className="flex w-fit items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
//         <Clock size={15} />
//         Pending
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-100 p-6">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Applications
//         </h1>

//         <p className="mt-1 text-gray-500">
//           View and manage all student stage applications.
//         </p>
//       </div>

//       {/* Top section */}
//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">
//               Student Applications
//             </h2>

//             <p className="text-sm text-gray-500">
//               Total Applications: {applications.length}
//             </p>
//           </div>

//           {/* Search */}
//           <div className="relative w-full md:w-80">
//             <Search
//               size={20}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//             />

//             <input
//               type="text"
//               placeholder="Search student, email, stage..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:border-blue-500"
//             />
//           </div>

//         </div>
//       </div>

//       {/* Loading */}
//       {loading ? (
//         <div className="rounded-2xl bg-white p-10 text-center">
//           <p className="text-gray-500">
//             Loading applications...
//           </p>
//         </div>
//       ) : filteredApplications.length === 0 ? (

//         <div className="rounded-2xl bg-white p-10 text-center">
//           <p className="text-gray-500">
//             No applications found.
//           </p>
//         </div>

//       ) : (

//         /* Table */
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//           <div className="overflow-x-auto">

//             <table className="w-full min-w-[900px]">

//               <thead className="border-b bg-gray-50">

//                 <tr>
//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Student
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Department
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Stage
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Date
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Location
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Status
//                   </th>

//                   <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
//                     Action
//                   </th>
//                 </tr>

//               </thead>

//               <tbody>

//                 {filteredApplications.map((application) => (

//                   <tr
//                     key={application._id}
//                     className="border-b last:border-0 hover:bg-gray-50"
//                   >

//                     {/* Student */}
//                     <td className="px-5 py-4">

//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           {application.name}
//                         </p>

//                         <p className="text-sm text-gray-500">
//                           {application.email}
//                         </p>

//                       </div>

//                     </td>

//                     {/* Department */}
//                     <td className="px-5 py-4">

//                       <p className="text-gray-700">
//                         {application.department}
//                       </p>

//                       <p className="text-sm text-gray-400">
//                         Semester {application.semester}
//                       </p>

//                     </td>

//                     {/* Stage */}
//                     <td className="px-5 py-4">

//                       <p className="font-medium text-gray-800">
//                         {application.stageTitle}
//                       </p>

//                     </td>

//                     {/* Date */}
//                     <td className="px-5 py-4">

//                       <div className="flex items-center gap-2 text-gray-600">
//                         <CalendarDays size={16} />

//                         {application.stageDate
//                           ? new Date(
//                               application.stageDate
//                             ).toLocaleDateString()
//                           : "N/A"}
//                       </div>

//                     </td>

//                     {/* Location */}
//                     <td className="px-5 py-4">

//                       <div className="flex items-center gap-2 text-gray-600">
//                         <MapPin size={16} />

//                         {application.location || "N/A"}
//                       </div>

//                     </td>

//                     {/* Status */}
//                     <td className="px-5 py-4">
//                       {getStatus(application.status)}
//                     </td>

//                     {/* Action */}
//                     <td className="px-5 py-4">

//                       <button
//                         onClick={() =>
//                           setSelectedApplication(application)
//                         }
//                         className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
//                       >
//                         <Eye size={17} />
//                         View
//                       </button>

//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//         </div>

//       )}

//       {/* Details Modal */}
//       {selectedApplication && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">

//             {/* Modal Header */}
//             <div className="mb-6 flex items-center justify-between">

//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800">
//                   Application Details
//                 </h2>

//                 <p className="text-sm text-gray-500">
//                   Student stage application
//                 </p>
//               </div>

//               <button
//                 onClick={() => setSelectedApplication(null)}
//                 className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
//               >
//                 ✕
//               </button>

//             </div>

//             {/* Student Details */}
//             <div className="grid gap-4 md:grid-cols-2">

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Student Name
//                 </p>

//                 <p className="font-semibold text-gray-800">
//                   {selectedApplication.name}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Email
//                 </p>

//                 <p className="font-semibold text-gray-800">
//                   {selectedApplication.email}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Phone
//                 </p>

//                 <p className="font-semibold text-gray-800">
//                   {selectedApplication.phone}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Department
//                 </p>

//                 <p className="font-semibold text-gray-800">
//                   {selectedApplication.department}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Semester
//                 </p>

//                 <p className="font-semibold text-gray-800">
//                   {selectedApplication.semester}
//                 </p>
//               </div>

//               <div className="rounded-lg bg-gray-50 p-4">
//                 <p className="text-sm text-gray-500">
//                   Status
//                 </p>

//                 {getStatus(selectedApplication.status)}
//               </div>

//             </div>

//             {/* Stage */}
//             <div className="mt-5 rounded-lg bg-gray-50 p-4">

//               <p className="text-sm text-gray-500">
//                 Stage Title
//               </p>

//               <p className="text-lg font-semibold text-gray-800">
//                 {selectedApplication.stageTitle}
//               </p>

//             </div>

//             {/* Description */}
//             <div className="mt-5">

//               <p className="mb-2 text-sm font-medium text-gray-500">
//                 Description
//               </p>

//               <p className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">
//                 {selectedApplication.description}
//               </p>

//             </div>

//             {/* Date & Location */}
//             <div className="mt-5 grid gap-4 md:grid-cols-2">

//               <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">

//                 <CalendarDays className="text-blue-600" />

//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Stage Date
//                   </p>

//                   <p className="font-semibold">
//                     {selectedApplication.stageDate
//                       ? new Date(
//                           selectedApplication.stageDate
//                         ).toLocaleDateString()
//                       : "N/A"}
//                   </p>
//                 </div>

//               </div>

//               <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">

//                 <MapPin className="text-blue-600" />

//                 <div>
//                   <p className="text-sm text-gray-500">
//                     Location
//                   </p>

//                   <p className="font-semibold">
//                     {selectedApplication.location}
//                   </p>
//                 </div>

//               </div>

//             </div>

//             {/* Close */}
//             <button
//               onClick={() => setSelectedApplication(null)}
//               className="mt-6 w-full rounded-lg bg-gray-800 py-3 font-semibold text-white hover:bg-gray-900"
//             >
//               Close
//             </button>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  CalendarDays,
  RefreshCw,
  Filter,
  User,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

const STATUS_OPTIONS = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "in process",
    label: "In Process",
    icon: RefreshCw,
    className: "bg-blue-100 text-blue-700",
  },
  {
    value: "approved",
    label: "Approved",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700",
  },
  {
    value: "rejected",
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-100 text-red-700",
  },
];

export default function Application() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [nameFilter, setNameFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [semesterFilter, setSemesterFilter] = useState("all");

  // --------------------------------------------------
  // GET ALL APPLICATIONS
  // --------------------------------------------------

  const getApplications = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:3000/api/apply/applications",
        {
          withCredentials: true,
        }
      );

      setApplications(res.data.applications || res.data || []);
    } catch (error) {
      console.log("Get applications error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  // --------------------------------------------------
  // DATE HELPER
  // --------------------------------------------------

  const getApplicationDate = (application) => {
    return (
      application.createdAt ||
      application.appliedAt ||
      application.applicationDate ||
      application.stageDate ||
      null
    );
  };

  // --------------------------------------------------
  // DATE FILTER
  // --------------------------------------------------

  const isDateMatch = (application) => {
    if (dateFilter === "all") return true;

    const applicationDate = getApplicationDate(application);

    if (!applicationDate) return false;

    const date = new Date(applicationDate);
    const now = new Date();

    // Today
    if (dateFilter === "today") {
      return (
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    // This Week
    if (dateFilter === "week") {
      const currentDay = now.getDay();

      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - currentDay);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);
      endOfWeek.setHours(23, 59, 59, 999);

      return date >= startOfWeek && date <= endOfWeek;
    }

    // This Month
    if (dateFilter === "month") {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    return true;
  };

  // --------------------------------------------------
  // UNIQUE DEPARTMENTS
  // --------------------------------------------------

  const departments = useMemo(() => {
    return [
      ...new Set(
        applications
          .map((application) => application.department)
          .filter(Boolean)
      ),
    ].sort();
  }, [applications]);

  // --------------------------------------------------
  // UNIQUE SEMESTERS
  // --------------------------------------------------

  const semesters = useMemo(() => {
    return [
      ...new Set(
        applications
          .map((application) => application.semester)
          .filter((semester) => semester !== undefined && semester !== null)
      ),
    ].sort((a, b) => Number(a) - Number(b));
  }, [applications]);

  // --------------------------------------------------
  // FILTER + SORT
  // --------------------------------------------------

  const filteredApplications = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    let result = applications.filter((application) => {
      const matchesSearch =
        !searchValue ||
        application.name?.toLowerCase().includes(searchValue) ||
        application.email?.toLowerCase().includes(searchValue) ||
        application.department?.toLowerCase().includes(searchValue) ||
        application.stageTitle?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        application.status?.toLowerCase() === statusFilter;

      const matchesName =
        !nameFilter ||
        application.name
          ?.toLowerCase()
          .includes(nameFilter.toLowerCase());

      const matchesDepartment =
        departmentFilter === "all" ||
        application.department === departmentFilter;

      const matchesSemester =
        semesterFilter === "all" ||
        String(application.semester) === String(semesterFilter);

      const matchesDate = isDateMatch(application);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesName &&
        matchesDepartment &&
        matchesSemester &&
        matchesDate
      );
    });

    // Sort by application date
    result.sort((a, b) => {
      const dateA = new Date(getApplicationDate(a) || 0).getTime();
      const dateB = new Date(getApplicationDate(b) || 0).getTime();

      return sortOrder === "newest"
        ? dateB - dateA
        : dateA - dateB;
    });

    return result;
  }, [
    applications,
    search,
    statusFilter,
    dateFilter,
    sortOrder,
    nameFilter,
    departmentFilter,
    semesterFilter,
  ]);

  // --------------------------------------------------
  // STATUS COUNTS
  // --------------------------------------------------

  const statusCounts = useMemo(() => {
    return {
      all: applications.length,

      pending: applications.filter(
        (app) => app.status?.toLowerCase() === "pending"
      ).length,

      inProcess: applications.filter(
        (app) => app.status?.toLowerCase() === "in process"
      ).length,

      approved: applications.filter(
        (app) => app.status?.toLowerCase() === "approved"
      ).length,

      rejected: applications.filter(
        (app) => app.status?.toLowerCase() === "rejected"
      ).length,
    };
  }, [applications]);

  // --------------------------------------------------
  // STATUS UI
  // --------------------------------------------------

  const getStatus = (status) => {
    const normalizedStatus = status?.toLowerCase() || "pending";

    const statusData =
      STATUS_OPTIONS.find(
        (item) => item.value === normalizedStatus
      ) || STATUS_OPTIONS[0];

    const Icon = statusData.icon;

    return (
      <span
        className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${statusData.className}`}
      >
        <Icon size={15} />
        {statusData.label}
      </span>
    );
  };

  // --------------------------------------------------
  // UPDATE APPLICATION STATUS
  // --------------------------------------------------

  const updateStatus = async (applicationId, newStatus) => {
    try {
      setUpdatingStatus(true);

      /*
       * Backend endpoint expected:
       *
       * PATCH
       * /api/apply/applications/:id/status
       *
       * Body:
       * {
       *   status: "approved"
       * }
       */

      const res = await axios.patch(
        `http://localhost:3000/api/apply/applications/${applicationId}/status`,
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      const updatedApplication =
        res.data.application || res.data;

      // Update table
      setApplications((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                ...updatedApplication,
                status: newStatus,
              }
            : application
        )
      );

      // Update modal
      setSelectedApplication((previous) =>
        previous
          ? {
              ...previous,
              ...updatedApplication,
              status: newStatus,
            }
          : previous
      );
    } catch (error) {
      console.log("Status update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingStatus(false);
    }
  };

  // --------------------------------------------------
  // RESET FILTERS
  // --------------------------------------------------

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFilter("all");
    setSortOrder("newest");
    setNameFilter("");
    setDepartmentFilter("all");
    setSemesterFilter("all");
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 md:p-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Applications
        </h1>

        <p className="mt-1 text-gray-400">
          View, filter and manage all student stage applications.
        </p>
      </div>

      {/* ------------------------------------------------ */}
      {/* STATUS BAR */}
      {/* ------------------------------------------------ */}

      <div className="mb-6 overflow-x-auto">
        <div className="flex min-w-max gap-3">

          {/* ALL */}
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-xl border px-5 py-3 text-left transition ${
              statusFilter === "all"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-gray-500">
              All Applications
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-800">
              {statusCounts.all}
            </p>
          </button>

          {/* PENDING */}
          <button
            onClick={() => setStatusFilter("pending")}
            className={`rounded-xl border px-5 py-3 text-left transition ${
              statusFilter === "pending"
                ? "border-yellow-400 bg-yellow-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-yellow-700">
              Pending
            </p>

            <p className="mt-1 text-2xl font-bold text-yellow-700">
              {statusCounts.pending}
            </p>
          </button>

          {/* IN PROCESS */}
          <button
            onClick={() => setStatusFilter("in process")}
            className={`rounded-xl border px-5 py-3 text-left transition ${
              statusFilter === "in process"
                ? "border-blue-400 bg-blue-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-blue-700">
              In Process
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-700">
              {statusCounts.inProcess}
            </p>
          </button>

          {/* APPROVED */}
          <button
            onClick={() => setStatusFilter("approved")}
            className={`rounded-xl border px-5 py-3 text-left transition ${
              statusFilter === "approved"
                ? "border-green-400 bg-green-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-green-700">
              Approved
            </p>

            <p className="mt-1 text-2xl font-bold text-green-700">
              {statusCounts.approved}
            </p>
          </button>

          {/* REJECTED */}
          <button
            onClick={() => setStatusFilter("rejected")}
            className={`rounded-xl border px-5 py-3 text-left transition ${
              statusFilter === "rejected"
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-white hover:bg-gray-50"
            }`}
          >
            <p className="text-sm text-red-700">
              Rejected
            </p>

            <p className="mt-1 text-2xl font-bold text-red-700">
              {statusCounts.rejected}
            </p>
          </button>

        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* FILTER PANEL */}
      {/* ------------------------------------------------ */}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={19} className="text-blue-600" />

            <h2 className="font-semibold text-gray-800">
              Application Filters
            </h2>
          </div>

          <button
            onClick={resetFilters}
            className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
          >
            Reset Filters
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          {/* SEARCH */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search student, email, stage..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-gray-800 rounded-lg border border-gray-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* NAME */}
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Filter by student name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full   text-gray-800 rounded-lg border border-gray-200 py-3 pl-10 pr-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* DEPARTMENT */}
          <div className="relative">
            <GraduationCap
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={departmentFilter}
              onChange={(e) =>
                setDepartmentFilter(e.target.value)
              }
              className="w-full  text-gray-800 appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-10 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Departments
              </option>

              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="absolute  text-gray-800 right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* SEMESTER */}
          <div className="relative">
            <select
              value={semesterFilter}
              onChange={(e) =>
                setSemesterFilter(e.target.value)
              }
              className="w-full  text-gray-800 appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Semesters
              </option>

              {semesters.map((semester) => (
                <option
                  key={semester}
                  value={semester}
                >
                  Semester {semester}
                </option>
              ))}
            </select>

            <ChevronDown
              size={17}
              className="absolute  text-gray-800 right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* DATE */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Application Date
            </label>

            <select
              value={dateFilter}
              onChange={(e) =>
                setDateFilter(e.target.value)
              }
              className="w-full  text-gray-800 rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="all">
                All Dates
              </option>

              <option value="today">
                Today
              </option>

              <option value="week">
                This Week
              </option>

              <option value="month">
                This Month
              </option>
            </select>
          </div>

          {/* SORT */}
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">
              Sort By Date
            </label>

            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value)
              }
              className="w-full  text-gray-800 rounded-lg border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="newest">
                Newest First
              </option>

              <option value="oldest">
                Oldest First
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------ */}
      {/* RESULT INFO */}
      {/* ------------------------------------------------ */}

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-800">
            Student Applications
          </p>

          <p className="text-sm text-gray-500">
            Showing {filteredApplications.length} of{" "}
            {applications.length} applications
          </p>
        </div>

        <button
          onClick={getApplications}
          className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* ------------------------------------------------ */}
      {/* LOADING */}
      {/* ------------------------------------------------ */}

      {loading ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <RefreshCw
            className="mx-auto mb-3 animate-spin text-blue-600"
            size={25}
          />

          <p className="text-gray-500">
            Loading applications...
          </p>
        </div>
      ) : filteredApplications.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-gray-500">
            No applications found.
          </p>
        </div>

      ) : (

        /* ------------------------------------------------ */
        /* TABLE */
        /* ------------------------------------------------ */

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1100px]">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Department
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Semester
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Stage
                  </th>

                  <th className="px-5 py-4 text-left text-sm font-semibold text-gray-600">
                    Application Date
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

                    {/* STUDENT */}

                    <td className="px-5 py-4">

                      <p className="font-semibold text-gray-800">
                        {application.name || "N/A"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {application.email || "N/A"}
                      </p>

                    </td>

                    {/* DEPARTMENT */}

                    <td className="px-5 py-4">

                      <p className="text-gray-700">
                        {application.department || "N/A"}
                      </p>

                    </td>

                    {/* SEMESTER */}

                    <td className="px-5 py-4">

                      <span className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">
                        Semester {application.semester || "N/A"}
                      </span>

                    </td>

                    {/* STAGE */}

                    <td className="px-5 py-4">

                      <p className="font-medium text-gray-800">
                        {application.stageTitle || "N/A"}
                      </p>

                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-gray-600">

                        <CalendarDays size={16} />

                        {getApplicationDate(application)
                          ? new Date(
                              getApplicationDate(application)
                            ).toLocaleDateString()
                          : "N/A"}

                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      {getStatus(application.status)}
                    </td>

                    {/* ACTION */}

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

      {/* ================================================= */}
      {/* APPLICATION DETAILS MODAL */}
      {/* ================================================= */}

      {selectedApplication && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6">

            {/* MODAL HEADER */}

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Application Details
                </h2>

                <p className="text-sm text-gray-500">
                  Manage student stage application
                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedApplication(null)
                }
                className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"
              >
                ✕
              </button>

            </div>

            {/* STUDENT DETAILS */}

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
                  {selectedApplication.phone || "N/A"}
                </p>

              </div>

              <div className="rounded-lg bg-gray-50 p-4">

                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.department || "N/A"}
                </p>

              </div>

              <div className="rounded-lg bg-gray-50 p-4">

                <p className="text-sm text-gray-500">
                  Semester
                </p>

                <p className="font-semibold text-gray-800">
                  {selectedApplication.semester || "N/A"}
                </p>

              </div>

              {/* STATUS SELECTION */}

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">

                <label className="mb-2 block text-sm font-medium text-gray-600">
                  Application Status
                </label>

                <select
                  value={
                    selectedApplication.status || "pending"
                  }
                  disabled={updatingStatus}
                  onChange={(e) =>
                    updateStatus(
                      selectedApplication._id,
                      e.target.value
                    )
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 font-medium outline-none focus:border-blue-500"
                >

                  {STATUS_OPTIONS.map((status) => (
                    <option
                      key={status.value}
                      value={status.value}
                    >
                      {status.label}
                    </option>
                  ))}

                </select>

                {updatingStatus && (
                  <p className="mt-2 text-xs text-blue-600">
                    Updating status...
                  </p>
                )}

              </div>

            </div>

            {/* CURRENT STATUS */}

            <div className="mt-5 rounded-lg bg-gray-50 p-4">

              <p className="mb-2 text-sm text-gray-500">
                Current Status
              </p>

              {getStatus(selectedApplication.status)}

            </div>

            {/* STAGE */}

            <div className="mt-5 rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Stage Title
              </p>

              <p className="text-lg font-semibold text-gray-800">
                {selectedApplication.stageTitle || "N/A"}
              </p>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-5">

              <p className="mb-2 text-sm font-medium text-gray-500">
                Description
              </p>

              <p className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">
                {selectedApplication.description ||
                  "No description available."}
              </p>

            </div>

            {/* DATE + LOCATION */}

            <div className="mt-5 grid gap-4 md:grid-cols-2">

              <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">

                <CalendarDays className="text-blue-600" />

                <div>

                  <p className="text-sm text-gray-500">
                    Application / Stage Date
                  </p>

                  <p className="font-semibold">
                    {getApplicationDate(
                      selectedApplication
                    )
                      ? new Date(
                          getApplicationDate(
                            selectedApplication
                          )
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
                    {selectedApplication.location ||
                      "N/A"}
                  </p>

                </div>

              </div>

            </div>

            {/* CLOSE */}

            <button
              onClick={() =>
                setSelectedApplication(null)
              }
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
