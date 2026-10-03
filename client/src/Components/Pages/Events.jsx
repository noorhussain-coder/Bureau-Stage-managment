
import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/events"
        );

        setEvents(Array.isArray(data) ? data : data.events || []);
      } catch (err) {
        setError("Unable to load events at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <section className="bg-slate-950 px-5 py-20 text-center text-white">
        <p className="font-semibold text-indigo-400">UNIVERSITY ACTIVITIES</p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Events & Stage Programs
        </h1>
        <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-300">
          Discover stage activities, university programs, and
          performance updates.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="mb-9">
          <h2 className="text-2xl font-bold text-slate-900">
            University Events
          </h2>
          <p className="mt-2 text-slate-500">
            Browse published event information.
          </p>
        </div>

        {loading ? (
          <p className="py-16 text-center text-slate-500">
            Loading events...
          </p>
        ) : error ? (
          <p className="py-16 text-center text-rose-600">{error}</p>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 py-20 text-center">
            <CalendarDays className="mx-auto text-slate-400" size={42} />
            <h3 className="mt-4 font-semibold text-slate-800">
              No published events yet
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please check again later for upcoming activities.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id || event.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />
                ) : (
                  <div className="flex h-52 items-center justify-center bg-indigo-50 text-indigo-500">
                    <CalendarDays size={48} />
                  </div>
                )}

                <div className="p-5">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-600">
                    {event.type || "University Event"}
                  </span>

                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-slate-500">
                    {event.date && (
                      <p className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    )}

                    {event.location && (
                      <p className="flex items-center gap-2">
                        <MapPin size={15} />
                        {event.location}
                      </p>
                    )}
                  </div>

                  {event._id && (
                    <Link
                      to={`/events/${event._id}`}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                      View Details <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}