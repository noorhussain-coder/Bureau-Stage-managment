
import { Link } from "react-router-dom";
import {
  ClipboardList,
  CalendarDays,
  Bell,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: ClipboardList,
      title: "Stage Application",
      description:
        "Students can submit applications for university stage activities through an online form.",
    },
    {
      icon: CalendarDays,
      title: "Event Information",
      description:
        "Explore university events, stage schedules, locations, and activity details.",
    },
    {
      icon: Bell,
      title: "Application Updates",
      description:
        "Receive updates about application status, approval, rejection, and announcements.",
    },
    {
      icon: BookOpen,
      title: "Blogs and Activities",
      description:
        "Read informational articles and explore published university stage performances.",
    },
  ];

  return (
    <div>
      <section className="bg-indigo-50 px-5 py-20 text-center">
        <p className="font-semibold text-indigo-600">WHAT WE PROVIDE</p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-5xl">
          Our Services
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
          Discover the services available to students through the
          Bureau Stage Management System.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-indigo-50 p-4 text-indigo-600">
                  <Icon size={28} />
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-900">
                  {service.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-5 mb-20 rounded-3xl bg-slate-950 px-6 py-14 text-center text-white sm:mx-8">
        <h2 className="text-3xl font-bold">
          Interested in participating?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Submit your application to express your interest in
          university stage activities.
        </p>
        <Link
          to="/apply"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold transition hover:bg-indigo-500"
        >
          Apply for Stage <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}