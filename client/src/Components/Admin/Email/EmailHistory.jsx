import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Search,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";


const demoEmail=[
  {
    "_id": "68f1a001a001",
    "sender": {
      "_id": "68f10001user01",
      "name": "Admin",
      "email": "admin@bureaustage.com"
    },
    "senderEmail": "admin@bureaustage.com",
    "recipients": [
      {
        "user": "68f20001user01",
        "name": "Ali Ahmed",
        "email": "ali.ahmed@gmail.com",
        "status": "sent",
        "error": null
      },
      {
        "user": "68f20001user02",
        "name": "Sara Khan",
        "email": "sara.khan@gmail.com",
        "status": "sent",
        "error": null
      }
    ],
    "subject": "Application Approved",
    "message": "<h2>Congratulations!</h2><p>Your stage application has been approved. Please check your dashboard for more details.</p>",
    "emailType": "approval",
    "totalRecipients": 2,
    "sentCount": 2,
    "failedCount": 0,
    "status": "sent",
    "createdAt": "2026-10-05T08:30:00.000Z",
    "updatedAt": "2026-10-05T08:30:00.000Z"
  },
  {
    "_id": "68f1a002a002",
    "sender": {
      "_id": "68f10001user01",
      "name": "Admin",
      "email": "admin@bureaustage.com"
    },
    "senderEmail": "admin@bureaustage.com",
    "recipients": [
      {
        "user": "68f20001user03",
        "name": "Ahmed Raza",
        "email": "ahmed.raza@gmail.com",
        "status": "sent",
        "error": null
      }
    ],
    "subject": "New Stage Announcement",
    "message": "<h2>New Stage Opportunity</h2><p>A new stage opportunity has been published. Visit the Bureau Stage portal to apply.</p>",
    "emailType": "announcement",
    "totalRecipients": 1,
    "sentCount": 1,
    "failedCount": 0,
    "status": "sent",
    "createdAt": "2026-10-04T12:15:00.000Z",
    "updatedAt": "2026-10-04T12:15:00.000Z"
  },
  {
    "_id": "68f1a003a003",
    "sender": {
      "_id": "68f10001user01",
      "name": "Admin",
      "email": "admin@bureaustage.com"
    },
    "senderEmail": "admin@bureaustage.com",
    "recipients": [
      {
        "user": "68f20001user04",
        "name": "Fatima Noor",
        "email": "fatima.noor@gmail.com",
        "status": "sent",
        "error": null
      },
      {
        "user": "68f20001user05",
        "name": "Usman Ali",
        "email": "usman.ali@gmail.com",
        "status": "failed",
        "error": "Mailbox unavailable"
      },
      {
        "user": "68f20001user06",
        "name": "Hina Shah",
        "email": "hina.shah@gmail.com",
        "status": "sent",
        "error": null
      }
    ],
    "subject": "Important Application Update",
    "message": "<h2>Application Update</h2><p>Your application status has been updated. Please log in to your account to view the latest information.</p>",
    "emailType": "application",
    "totalRecipients": 3,
    "sentCount": 2,
    "failedCount": 1,
    "status": "partial",
    "createdAt": "2026-10-03T09:45:00.000Z",
    "updatedAt": "2026-10-03T09:45:00.000Z"
  },
  {
    "_id": "68f1a004a004",
    "sender": {
      "_id": "68f10001user01",
      "name": "Admin",
      "email": "admin@bureaustage.com"
    },
    "senderEmail": "admin@bureaustage.com",
    "recipients": [
      {
        "user": "68f20001user07",
        "name": "Bilal Hussain",
        "email": "bilal.hussain@gmail.com",
        "status": "failed",
        "error": "Invalid email address"
      }
    ],
    "subject": "Stage Application Rejected",
    "message": "<h2>Application Update</h2><p>Unfortunately, your stage application was not approved at this time.</p>",
    "emailType": "rejection",
    "totalRecipients": 1,
    "sentCount": 0,
    "failedCount": 1,
    "status": "failed",
    "createdAt": "2026-10-02T15:20:00.000Z",
    "updatedAt": "2026-10-02T15:20:00.000Z"
  },
  {
    "_id": "68f1a005a005",
    "sender": {
      "_id": "68f10001user01",
      "name": "Admin",
      "email": "admin@bureaustage.com"
    },
    "senderEmail": "admin@bureaustage.com",
    "recipients": [
      {
        "user": "68f20001user08",
        "name": "Ayesha Malik",
        "email": "ayesha.malik@gmail.com",
        "status": "sent",
        "error": null
      },
      {
        "user": "68f20001user09",
        "name": "Hamza Sheikh",
        "email": "hamza.sheikh@gmail.com",
        "status": "sent",
        "error": null
      },
      {
        "user": "68f20001user10",
        "name": "Zainab Ali",
        "email": "zainab.ali@gmail.com",
        "status": "sent",
        "error": null
      }
    ],
    "subject": "Welcome to Bureau Stage",
    "message": "<h2>Welcome!</h2><p>Thank you for joining the Bureau Stage Management System.</p>",
    "emailType": "general",
    "totalRecipients": 3,
    "sentCount": 3,
    "failedCount": 0,
    "status": "sent",
    "createdAt": "2026-10-01T10:00:00.000Z",
    "updatedAt": "2026-10-01T10:00:00.000Z"
  }
]

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [emailType, setEmailType] = useState("");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
  });

  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmails = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/email-history",
        {
          params: {
            search,
            status,
            emailType,
            page,
            limit: 10,
          },
          withCredentials: true,
        }
      );

      // setEmails(response.data.emails || []);
      setEmails(demoEmail);

      setPagination(
        response.data.pagination || {
          total: 0,
          totalPages: 1,
        }
      );
      console.log('render')
    } catch (error) {
      console.error(
        "Failed to fetch email history:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, [page, status, emailType]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchEmails();
  };

  const deleteEmail = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this email history?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/api/email-history/${id}`,
        {
          withCredentials: true,
        }
      );

      fetchEmails();
    } catch (error) {
      console.error(error);
    }
  };






  const getStatus = (email) => {
    if (email.status === "sent") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          <CheckCircle size={14} />
          Sent
        </span>
      );
    }

    if (email.status === "partial") {
      return (
        <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
          <Clock size={14} />
          Partial
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
        <XCircle size={14} />
        Failed
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800">
            <Mail size={28} />
            Email History
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View all emails sent to users.
          </p>
        </div>

        <button
          onClick={fetchEmails}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <RefreshCw size={17} />
          Refresh
        </button>

      </div>

      {/* Filters */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">

        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="relative md:col-span-2"
          >
            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search subject, name or email..."
              className="w-full rounded-lg border text-gray-800 border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-500"
            />
          </form>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border text-gray-800 border-slate-300 bg-white px-3 py-2.5 text-sm outline-none"
          >
            <option value="">All Status</option>
            <option value="sent">Sent</option>
            <option value="partial">Partial</option>
            <option value="failed">Failed</option>
          </select>

          {/* Type */}
          <select
            value={emailType}
            onChange={(e) => {
              setEmailType(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border text-gray-800 border-slate-300 bg-white px-3 py-2.5 text-sm outline-none"
          >
            <option value="">All Types</option>
            <option value="general">General</option>
            <option value="application">
              Application
            </option>
            <option value="announcement">
              Announcement
            </option>
            <option value="approval">Approval</option>
            <option value="rejection">Rejection</option>
            <option value="stage">Stage</option>
            <option value="notification">
              Notification
            </option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        {loading ? (
          <div className="flex items-center justify-center p-16">
            <RefreshCw
              className="animate-spin text-blue-600"
              size={28}
            />
          </div>
        ) : emails.length === 0 ? (
          <div className="p-16 text-center">

            <Mail
              size={45}
              className="mx-auto mb-3 text-slate-300"
            />

            <h3 className="font-semibold text-slate-700">
              No email history found
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Emails sent from the admin panel will
              appear here.
            </p>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Email
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Recipients
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Type
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
              
                {emails.map((email) => (

                  <tr
                    key={email._id}
                    className="hover:bg-slate-50"
                  >

                    <td className="px-5 py-4">

                      <div className="font-medium text-slate-800">
                        {email.subject}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        From: {email.senderEmail}
                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <div className="font-medium text-slate-700">
                        {email.totalRecipients}
                      </div>

                      <div className="text-xs text-slate-400">
                        {email.sentCount} sent ·{" "}
                        {email.failedCount} failed
                      </div>

                    </td>

                    <td className="px-5 py-4">

                      <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium capitalize text-blue-600">
                        {email.emailType}
                      </span>

                    </td>

                    <td className="px-5 py-4">
                      {getStatus(email)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">

                      {new Date(
                        email.createdAt
                      ).toLocaleString()}

                    </td>

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setSelectedEmail(email)
                          }
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          title="View email"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() =>
                            deleteEmail(email._id)
                          }
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">

          <p className="text-sm text-slate-500">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex gap-2">

            <button
              disabled={page <= 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="rounded-lg border bg-white p-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              disabled={
                page >= pagination.totalPages
              }
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="rounded-lg border bg-white p-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>

          </div>

        </div>
      )}

      {/* View Email Modal */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b p-5">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Email Details
                </h2>

                <p className="text-sm text-slate-500">
                  {new Date(
                    selectedEmail.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() =>
                  setSelectedEmail(null)
                }
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Modal Body */}
            <div className="max-h-[75vh] overflow-y-auto p-6">

              <div className="grid gap-4 md:grid-cols-2">

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    From
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {selectedEmail.senderEmail}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">
                    Type
                  </p>

                  <p className="mt-1 text-sm capitalize text-slate-700">
                    {selectedEmail.emailType}
                  </p>
                </div>

              </div>

              <div className="mt-5">

                <p className="text-xs font-semibold uppercase text-slate-400">
                  Subject
                </p>

                <p className="mt-1 text-lg font-semibold text-slate-800">
                  {selectedEmail.subject}
                </p>

              </div>

              {/* Recipients */}
              <div className="mt-5">

                <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                  Recipients
                </p>

                <div className="space-y-2">

                  {selectedEmail.recipients?.map(
                    (recipient, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-slate-50 p-3"
                      >

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {recipient.name ||
                              "User"}
                          </p>

                          <p className="text-xs text-slate-500">
                            {recipient.email}
                          </p>
                        </div>

                        {recipient.status ===
                        "sent" ? (
                          <span className="text-xs font-medium text-green-600">
                            Sent
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-red-600">
                            Failed
                          </span>
                        )}

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* Message */}
              <div className="mt-5">

                <p className="mb-2 text-xs font-semibold uppercase text-slate-400">
                  Message
                </p>

                <div
                  className="rounded-xl border bg-white p-5 text-sm leading-7 text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html: selectedEmail.message,
                  }}
                />

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default EmailHistory;