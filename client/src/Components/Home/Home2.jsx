import React, { useState } from "react";
import {
  CalendarDays,
  MapPin,
  ShieldCheck,
  Zap,
  Lock,
  Users,
  Wrench,
  Headphones,
  Globe2,
  Timer,
  Wallet,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Menu,
  X,

  Phone,
  Mail,
  Building2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../Context/ThemeContext";





const FEATURES = [
  { icon: Zap, title: "Easy Online Booking", body: "Reserve a stage in a few steps, from your first search to a signed confirmation." },
  { icon: ShieldCheck, title: "Government Approved", body: "Every listed venue is vetted and cleared for official and public use." },
  { icon: Timer, title: "Real-Time Availability", body: "See open dates the moment they change — no back-and-forth calls." },
  // { icon: Lock, title: "Secure Digital Payments", body: "Pay and get receipts through an encrypted, auditable checkout." },
];

const CATEGORIES = [
  { title: "Conference Stage", body: "Podium, screens, and delegate seating for formal proceedings." },
  { title: "Wedding Stage", body: "Elevated platforms with drape and lighting for ceremonies." },
  { title: "Cultural Stage", body: "Open-format stages built for performance and acoustics." },
  { title: "Political Rally Stage", body: "Reinforced platforms rated for large public gatherings." },
  { title: "Exhibition Stage", body: "Modular layouts for booths, demos, and product reveals." },
  { title: "Indoor Stage", body: "Climate-controlled venues with fixed rigging points." },
];

const WHY_US = [
  { icon: Users, text: "Experienced Team" },
  { icon: Wrench, text: "Premium Equipment" },
  { icon: Headphones, text: "24/7 Support" },
  { icon: Globe2, text: "Nationwide Service" },
  { icon: Zap, text: "Fast Booking" },
  { icon: Wallet, text: "Transparent Pricing" },
];

const TIMELINE = ["Choose Stage", "Submit Application", "Admin Review", "Payment", "Booking Confirmation", "Event Ready"];

const EVENTS = [
  { title: "National Youth Convention", date: "Aug 14, 2026", loc: "Karachi Expo Grounds", org: "Youth Affairs Dept.", seats: "120 left" },
  { title: "Provincial Trade Exhibition", date: "Sep 02, 2026", loc: "Hyderabad Fairgrounds", org: "Sindh Commerce Bureau", seats: "64 left" },
  { title: "Cultural Heritage Festival", date: "Sep 21, 2026", loc: "Larkana Cultural Complex", org: "Culture & Antiquities Dept.", seats: "210 left" },
];

const BLOG = [
  { cat: "Guides", date: "Jul 12, 2026", title: "How to choose the right stage size for your event" },
  { cat: "Policy", date: "Jun 28, 2026", title: "What government approval actually checks for" },
  { cat: "Case Study", date: "Jun 05, 2026", title: "Staging a 3,000-seat rally in under two weeks" },
];

const STATS = [
  { value: "500+", label: "Events Hosted" },
  { value: "1,200+", label: "Bookings Completed" },
  { value: "150+", label: "Approved Stages" },
  { value: "98%", label: "Satisfaction Rate" },
];

const TESTIMONIALS = [
  { name: "A. Baloch", org: "Sindh Culture Department", stars: 5, text: "Booking went from a week of phone calls to a single afternoon. The approval trail alone made our audit painless." },
  { name: "F. Qureshi", org: "Karachi Trade Council", stars: 5, text: "The stage matched the listing exactly. Rigging crew was on-site early and the whole day ran on schedule." },
  { name: "S. Memon", org: "District Youth Affairs", stars: 4, text: "Straightforward platform. The admin review step took slightly longer than expected but communication was clear throughout." },
];

const PARTNERS = ["Sindh Culture Dept.", "Youth Affairs Bureau", "Commerce Council", "District Admin", "Heritage Trust", "Public Works Dept."];

export default function BureauStageHomepage() {
  
 const {t,FONT_IMPORT}=   useTheme()
   const [testimonialIdx, setTestimonialIdx] = useState(0);
 return (
    <div className="min-h-screen w-full" style={{ background: t.bg, color: t.text, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>



      {/* HERO */}
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: t.accent }}>Government-Approved Venues</p>
          <h1 className="font-display mt-4 text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Professional Bureau Stage Management
          </h1>
          <p className="mt-6 max-w-md text-base" style={{ color: t.textMuted }}>
            Book government-approved stages for conferences, ceremonies, cultural programs, exhibitions, and public events — with a full approval trail from application to event day.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#" className="rounded-full px-6 py-3 text-sm font-semibold" style={{ background: t.accent, color: t.onAccent }}>
              Book Now
            </a>
            <a href="#" className="flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold" style={{ borderColor: t.border }}>
              Explore Events <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm rounded-2xl border p-6" style={{ background: t.surface, borderColor: t.border }}>
            <p className="font-mono mb-4 text-xs uppercase tracking-widest" style={{ color: t.accent }}>Live Overview</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Upcoming Events", val: "18" },
                { label: "Available Stages", val: "42" },
                { label: "Total Bookings", val: "1,204" },
                { label: "Active Locations", val: "27" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-4" style={{ background: t.surfaceStrong }}>
                  <p className="font-display text-2xl" style={{ color: t.accent }}>{s.val}</p>
                  <p className="mt-1 text-xs" style={{ color: t.textMuted }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-center text-3xl sm:text-4xl">Built for how bureaus actually book</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="h-full rounded-2xl border p-6" style={{ background: t.surface, borderColor: t.border }}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: t.accentSoft }}>
                <f.icon size={20} style={{ color: t.accent }} />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm" style={{ color: t.textMuted }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: t.accent }}>Catalog</p>
        <h2 className="font-display mt-2 text-3xl sm:text-4xl">Available Stage Categories</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="overflow-hidden rounded-2xl border" style={{ background: t.surface, borderColor: t.border }}>
              <div className="flex h-36 items-end p-5" style={{ background: t.surfaceStrong }}>
                <span className="font-mono text-xs" style={{ color: t.accent }}>STAGE TYPE</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl">{cat.title}</h3>
                <p className="mt-2 text-sm" style={{ color: t.textMuted }}>{cat.body}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: t.accent }}>
                  Book Now <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex h-72 items-center justify-center rounded-2xl border sm:h-96" style={{ background: t.surface, borderColor: t.border }}>
            <div className="flex gap-3">
              {[70, 100, 70].map((h, i) => (
                <div key={i} className="w-10 rounded-t-md" style={{ height: h, background: t.surfaceStrong }} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: t.accent }}>Why Choose Us</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl">A bureau you can put your name on</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {WHY_US.map((w) => (
                <div key={w.text} className="flex items-center gap-3">
                  <w.icon size={18} style={{ color: t.accent }} />
                  <span className="text-sm">{w.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-center text-3xl sm:text-4xl">The Booking Process</h2>
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-5 hidden h-px lg:block" style={{ background: t.border }} />
          <div className="grid gap-10 lg:grid-cols-6">
            {TIMELINE.map((step, i) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="font-mono z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm" style={{ borderColor: t.accent, color: t.accent, background: t.bg }}>
                  {i + 1}
                </div>
                <p className="mt-4 text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">Upcoming Events</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {EVENTS.map((e) => (
            <div key={e.title} className="overflow-hidden rounded-2xl border" style={{ background: t.surface, borderColor: t.border }}>
              <div className="h-32" style={{ background: t.surfaceStrong }} />
              <div className="p-5">
                <h3 className="font-semibold">{e.title}</h3>
                <div className="mt-3 space-y-1.5 text-sm" style={{ color: t.textMuted }}>
                  <p className="flex items-center gap-2"><CalendarDays size={14} /> {e.date}</p>
                  <p className="flex items-center gap-2"><MapPin size={14} /> {e.loc}</p>
                  <p>{e.org} · {e.seats}</p>
                </div>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: t.accent }}>
                  View Details <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-display text-3xl sm:text-4xl">From the Blog</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {BLOG.map((b) => (
            <div key={b.title} className="overflow-hidden rounded-2xl border" style={{ background: t.surface, borderColor: t.border }}>
              <div className="h-32" style={{ background: t.surfaceStrong }} />
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-full px-2 py-1 font-mono" style={{ background: t.accentSoft, color: t.accent }}>{b.cat}</span>
                  <span style={{ color: t.textMuted }}>{b.date}</span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{b.title}</h3>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: t.accent }}>
                  Read More <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y" style={{ background: t.bgAlt, borderColor: t.border }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl" style={{ color: t.accent }}>{s.value}</p>
              <p className="mt-2 text-sm" style={{ color: t.textMuted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="font-display text-center text-3xl sm:text-4xl">What Organizers Say</h2>
        <div className="relative mt-10 rounded-2xl border p-8 text-center" style={{ background: t.surface, borderColor: t.border }}>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full font-display" style={{ background: t.accent, color: t.onAccent }}>
            {TESTIMONIALS[testimonialIdx].name[0]}
          </div>
          <div className="mb-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} style={{ color: i < TESTIMONIALS[testimonialIdx].stars ? t.accent : t.border }} fill={i < TESTIMONIALS[testimonialIdx].stars ? "currentColor" : "none"} />
            ))}
          </div>
          <p style={{ color: t.text }}>"{TESTIMONIALS[testimonialIdx].text}"</p>
          <p className="mt-4 text-sm font-semibold">{TESTIMONIALS[testimonialIdx].name}</p>
          <p className="text-xs" style={{ color: t.textMuted }}>{TESTIMONIALS[testimonialIdx].org}</p>

          <button
            onClick={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border p-2"
            style={{ borderColor: t.border }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border p-2"
            style={{ borderColor: t.border }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-center text-xs uppercase tracking-[0.25em]" style={{ color: t.textMuted }}>Trusted by departments and institutions</p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {PARTNERS.map((p) => (
            <div key={p} className="flex items-center justify-center rounded-xl border px-3 py-4 text-center text-xs" style={{ borderColor: t.border, color: t.textMuted }}>
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-2xl border px-8 py-16 text-center" style={{ background: t.surface, borderColor: t.border }}>
          <h2 className="font-display text-3xl sm:text-4xl">Ready to Organize Your Next Event?</h2>
          <a href="#" className="mt-8 inline-block rounded-full px-8 py-3 text-sm font-semibold" style={{ background: t.accent, color: t.onAccent }}>
            Book Your Stage Today
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t" style={{ borderColor: t.border }}>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-display text-lg">Company</h4>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li>About</li><li>Careers</li><li>Privacy Policy</li><li>Terms</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg">Services</h4>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li>Stage Booking</li><li>Event Management</li><li>Equipment Rental</li><li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: t.textMuted }}>
              <li className="flex items-center gap-2"><Phone size={14} /> +92 22 000 0000</li>
              <li className="flex items-center gap-2"><Mail size={14} /> info@bureaustage.gov</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Hyderabad, Sindh, Pakistan</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg">Social</h4>
            <div className="mt-4 flex gap-3">
              {/* <Facebook size={18} style={{ color: t.textMuted }} />
              <Instagram size={18} style={{ color: t.textMuted }} />
              <Linkedin size={18} style={{ color: t.textMuted }} />
              <Youtube size={18} style={{ color: t.textMuted }} /> */}
            </div>
          </div>
        </div>
        <div className="border-t py-6 text-center text-xs" style={{ borderColor: t.border, color: t.textMuted }}>
          © 2026 Bureau Stage Management. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}