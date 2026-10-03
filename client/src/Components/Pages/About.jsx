
import { Theater, Users, Lightbulb, Target } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Users,
      title: "Student Participation",
      description:
        "Encouraging students to participate in university stage activities and creative programs.",
    },
    {
      icon: Lightbulb,
      title: "Creativity",
      description:
        "Providing opportunities for students to express ideas, skills, and artistic abilities.",
    },
    {
      icon: Target,
      title: "Organization",
      description:
        "Supporting organized applications, event information, and stage activity management.",
    },
  ];

  return (
    <div>
      <section className="bg-slate-950 px-5 py-24 text-center text-white">
        <p className="font-semibold text-indigo-400">ABOUT OUR BUREAU</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
          Supporting Creativity Through University Stage Activities
        </h1>
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-300">
          Bureau Stage Management System provides a platform for students
          to discover activities, apply for stage participation, and
          stay informed about university events.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 lg:px-8">
        <div className="flex min-h-80 items-center justify-center rounded-3xl bg-indigo-50">
          <div className="text-center text-indigo-600">
            <Theater size={85} strokeWidth={1.2} />
            <p className="mt-4 font-semibold">University Stage Activities</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-semibold text-indigo-600">WHO WE ARE</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            About Bureau Stage
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            The Bureau Stage Management System is designed to simplify
            communication between students and administrators for
            university stage activities.
          </p>
          <p className="mt-4 leading-8 text-slate-600">
            Students can explore available opportunities, submit their
            applications, and receive updates about application decisions
            and upcoming activities.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 px-5 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Our Purpose
            </h2>
            <p className="mt-4 text-slate-600">
              Creating an organized environment for student participation
              and university creative activities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <Icon size={25} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}