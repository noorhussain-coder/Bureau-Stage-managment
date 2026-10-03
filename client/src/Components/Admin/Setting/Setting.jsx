
import React, { useState } from "react";
import {
  User,
  Bell,
  Shield
,
  Settings as SettingsIcon,
  Save,
  Mail,
  Lock,
} from "lucide-react";

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "",
  });

  const [notifications, setNotifications] = useState({
    newApplication: true,
    applicationStatus: true,
    emailNotification: true,
    blogNotification: false,
  });

  const [system, setSystem] = useState({
    websiteName: "Bureau Stage Management",
    email: "",
    maintenance: false,
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSystemChange = (e) => {
    setSystem({
      ...system,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = (e) => {
    e.preventDefault();
    console.log("Profile:", profile);
    alert("Profile settings saved");
  };

  const saveSystem = (e) => {
    e.preventDefault();
    console.log("System:", system);
    alert("System settings saved");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (password.newPassword !== password.confirm) {
      alert("New password and confirm password do not match");
      return;
    }

    console.log("Password changed");
    alert("Password updated successfully");

    setPassword({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: Shield,
    },
    {
      id: "system",
      label: "System",
      icon: SettingsIcon,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Settings
        </h1>

        <p className="mt-1 text-gray-500">
          Manage your admin account and system settings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">

        {/* Sidebar */}
        <div className="h-fit rounded-2xl bg-white p-3 shadow-sm">

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={19} />
                <span className="font-medium">
                  {tab.label}
                </span>
              </button>
            );
          })}

        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">

          {/* PROFILE */}
          {activeTab === "profile" && (
            <div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Admin Profile
                </h2>

                <p className="text-sm text-gray-500">
                  Update your administrator account information.
                </p>
              </div>

              <form
                onSubmit={saveProfile}
                className="max-w-2xl space-y-5"
              >

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={18} />
                  Save Changes
                </button>

              </form>

            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Notifications
                </h2>

                <p className="text-sm text-gray-500">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="max-w-2xl space-y-4">

                <NotificationOption
                  title="New Application"
                  description="Notify admin when a student submits a new application."
                  checked={notifications.newApplication}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newApplication:
                        !notifications.newApplication,
                    })
                  }
                />

                <NotificationOption
                  title="Application Status"
                  description="Receive notifications when an application status changes."
                  checked={notifications.applicationStatus}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      applicationStatus:
                        !notifications.applicationStatus,
                    })
                  }
                />

                <NotificationOption
                  title="Email Notifications"
                  description="Receive important system notifications through email."
                  checked={notifications.emailNotification}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      emailNotification:
                        !notifications.emailNotification,
                    })
                  }
                />

                <NotificationOption
                  title="Blog Notifications"
                  description="Receive notifications about blog updates."
                  checked={notifications.blogNotification}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      blogNotification:
                        !notifications.blogNotification,
                    })
                  }
                />

              </div>

            </div>
          )}

          {/* SECURITY */}
          {activeTab === "security" && (
            <div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Security
                </h2>

                <p className="text-sm text-gray-500">
                  Manage your admin account password.
                </p>
              </div>

              <form
                onSubmit={changePassword}
                className="max-w-2xl space-y-5"
              >

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="password"
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      required
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirm"
                    value={password.confirm}
                    onChange={handlePasswordChange}
                    required
                    minLength={6}
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  <Shield size={18} />
                  Update Password
                </button>

              </form>

            </div>
          )}

          {/* SYSTEM */}
          {activeTab === "system" && (
            <div>

              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  System Settings
                </h2>

                <p className="text-sm text-gray-500">
                  Configure your Bureau Stage Management System.
                </p>
              </div>

              <form
                onSubmit={saveSystem}
                className="max-w-2xl space-y-5"
              >

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Website Name
                  </label>

                  <input
                    type="text"
                    name="websiteName"
                    value={system.websiteName}
                    onChange={handleSystemChange}
                    className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Administrator Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={system.email}
                      onChange={handleSystemChange}
                      placeholder="admin@example.com"
                      className="w-full rounded-lg border border-gray-300 p-3 pl-10 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Maintenance */}
                <div className="flex items-center justify-between rounded-xl border p-4">

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Maintenance Mode
                    </h3>

                    <p className="text-sm text-gray-500">
                      Temporarily disable public access to the website.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSystem({
                        ...system,
                        maintenance: !system.maintenance,
                      })
                    }
                    className={`relative h-6 w-11 rounded-full transition ${
                      system.maintenance
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                        system.maintenance
                          ? "left-6"
                          : "left-1"
                      }`}
                    />
                  </button>

                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  <Save size={18} />
                  Save Settings
                </button>

              </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}


/* Notification Component */

function NotificationOption({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4">

      <div className="pr-5">
        <h3 className="font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}
