import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FileText,
  UserPlus,
  Search,
  ClipboardCheck,
  ShieldCheck,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";


const iconMap = {
  UserPlus,
  Search,
  ClipboardCheck,
  ShieldCheck,
  FileText,
  CheckCircle,
};


export default function ApplicationProcess() {

  const [steps, setSteps] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    const fetchProcess = async () => {

      try {

        setLoading(true);

        const { data } =
          await axios.get(
            `${API_URL}/api/application-process`
          );

        setSteps(data.steps || []);

      } catch (error) {

        console.error(
          "Application process:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchProcess();

  }, []);


  return (
    <div className="min-h-screen bg-[#F4F8FC]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="bg-[#0B1B33] px-5 py-20 text-white">

        <div className="mx-auto max-w-5xl text-center">

          <span className="mb-4 inline-block rounded-full bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-300">
            How It Works
          </span>

          <h1 className="text-3xl font-bold md:text-5xl">
            Application Process
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Follow these simple steps to apply
            for an available stage through the
            Bureau Stage Management System.
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* PROCESS */}
      {/* ================================================= */}

      <section className="px-5 py-16">

        <div className="mx-auto max-w-4xl">

          {loading ? (

            <div className="flex justify-center py-20">

              <Loader2
                className="animate-spin text-blue-600"
                size={36}
              />

            </div>

          ) : steps.length === 0 ? (

            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

              <FileText
                className="mx-auto mb-4 text-slate-400"
                size={42}
              />

              <h2 className="text-xl font-semibold text-[#0E1F3D]">
                Application process is currently unavailable
              </h2>

              <p className="mt-2 text-slate-500">
                Please check again later.
              </p>

            </div>

          ) : (

            <div className="relative">

              {/* Vertical Line */}

              <div className="absolute left-6 top-7 hidden h-[calc(100%-50px)] w-px bg-blue-200 md:block" />


              <div className="space-y-8">

                {steps.map((step, index) => {

                  const Icon =
                    iconMap[step.icon] ||
                    FileText;

                  return (

                    <div
                      key={step._id}
                      className="relative flex gap-5"
                    >

                      {/* NUMBER */}

                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white shadow-lg">

                        {step.stepNumber}

                      </div>


                      {/* CARD */}

                      <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                        <div className="mb-3 flex items-start gap-4">

                          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">

                            <Icon size={22} />

                          </div>

                          <div>

                            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                              Step {step.stepNumber}
                            </span>

                            <h2 className="mt-1 text-xl font-bold text-[#0E1F3D]">
                              {step.title}
                            </h2>

                          </div>

                        </div>


                        <p className="leading-7 text-slate-600">
                          {step.description}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          )}

        </div>

      </section>


      {/* ================================================= */}
      {/* BOTTOM MESSAGE */}
      {/* ================================================= */}

      {!loading && steps.length > 0 && (

        <section className="px-5 pb-16">

          <div className="mx-auto max-w-4xl rounded-2xl bg-blue-600 p-8 text-center text-white">

            <CheckCircle
              className="mx-auto mb-3"
              size={36}
            />

            <h2 className="text-2xl font-bold">
              Ready to Apply?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-blue-100">
              Browse the available stages and
              submit your application when you
              find the right opportunity.
            </p>

          </div>

        </section>

      )}

    </div>
  );
}