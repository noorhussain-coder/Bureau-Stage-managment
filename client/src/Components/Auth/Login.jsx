import React, { useState } from "react";
import {
  GraduationCap,
  Sun,
  Moon,
  Eye,
  EyeOff,
  User,
  Mail,
  Hash,
  BookOpen,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";




const THEMES = {
  light: {
    bg: "#FFFFFF",
    panel: "#F6F9FD",
    surface: "#FFFFFF",
    surfaceAlt: "#F1F5FB",
    border: "#E4E9F2",
    text: "#111C34",
    textMuted: "#5A6786",
    accent: "#2560E0",
    accentSoft: "#E9F0FE",
    accentGrad: "linear-gradient(135deg,#5B93F5,#2560E0)",
    onAccent: "#FFFFFF",
    danger: "#C6362E",
    dangerSoft: "#FBEAEA",
    success: "#1E9E71",
    shadow: "0 8px 24px -12px rgba(17,28,52,0.12)",
  },
  dark: {
    bg: "#0E1626",
    panel: "#121B2E",
    surface: "#151F33",
    surfaceAlt: "#1A2439",
    border: "rgba(255,255,255,0.09)",
    text: "#EDF1F9",
    textMuted: "#8FA0C2",
    accent: "#6CA5FF",
    accentSoft: "rgba(108,165,255,0.14)",
    accentGrad: "linear-gradient(135deg,#8EC1FF,#3D7BEF)",
    onAccent: "#0E1626",
    danger: "#F3685E",
    dangerSoft: "rgba(243,104,94,0.12)",
    success: "#3DD9A4",
    shadow: "0 8px 24px -12px rgba(0,0,0,0.4)",
  },
};

const DEPARTMENTS = [
  "Fine Arts",
  "Performing Arts",
  "Media & Communication",
  "Computer Science",
  "Business Administration",
  "Other",
];

function scorePassword(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function LoginPage() {
  const [theme, setTheme] = useState("light");
  const t = THEMES[theme];
  const isDark = theme === "dark";

  const [form, setForm] = useState({

    email: "",
  
    password: "",

  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate=useNavigate()

  const update = (field) => (e) => {
    const value = field === "agree" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.password.length < 8) er.password = "Password must be at least 8 characters.";

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log(form)
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1100);
  };

  const pwScore = scorePassword(form.password);
  const pwLabel = ["Too weak", "Weak", "Okay", "Good", "Strong"][pwScore];
  const pwColor = [t.danger, t.danger, "#E0A62F", t.success, t.success][pwScore];

  const HandleRegister=async (e)=>{
e.preventDefault()

const result=await axios.post('http://localhost3000/api/login',form,{
  withCredentials:true
})
if(result){
navigate('/')
}


}

  return (
    <div className="min-h-screen w-full transition-colors duration-500" style={{ background: t.bg, color: t.text, fontFamily: "'Inter', ui-sans-serif, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* BRAND PANEL */}
        <div className="relative hidden flex-col justify-between p-12 lg:flex" style={{ background: t.accentGrad }}>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "rgba(255,255,255,0.2)" }}>
              <GraduationCap size={19} color="#fff" />
            </div>
            <span className="font-display text-xl text-white">Stage Bureau</span>
          </div>

          <div>
            <h1 className="font-display max-w-sm text-4xl leading-tight text-white">
              Create your account, apply, and track it end to end.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-white/85">
              One account gets you access to applications, status updates, and every announcement that affects your submission.
            </p>
            <div className="mt-8 space-y-3">
              {["Track your application status live", "Get review decisions by email", "Reapply anytime, no limits"].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-white/90">
                  <CheckCircle2 size={16} /> {f}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/70">© 2026 Sindh University Art Programs Bureau.</p>
        </div>

        {/* FORM PANEL */}
        <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: t.accentGrad }}>
                <GraduationCap size={17} style={{ color: t.onAccent }} />
              </div>
              <span className="font-display text-lg">Stage Bureau</span>
            </div>
            <div className="ml-auto" />
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex h-9 w-9 items-center justify-center rounded-full border"
              style={{ borderColor: t.border }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full" style={{ background: t.accentSoft }}>
                  <ShieldCheck size={26} style={{ color: t.accent }} />
                </div>
                <h2 className="font-display mt-5 text-2xl">Account created</h2>
                <p className="mt-2 text-sm" style={{ color: t.textMuted }}>
                  We've sent a confirmation link to <span style={{ color: t.text, fontWeight: 600 }}>{form.email}</span>. Verify your email to start your first application.
                </p>
                <a href="/" className="mt-6 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold" style={{ background: t.accentGrad, color: t.onAccent }}>
                  Go to Dashboard <ArrowRight size={15} />
                </a>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl">Login </h2>
                <p className="mt-2 text-sm" style={{ color: t.textMuted }}>
                  Already registered? <a href="/register" style={{ color: t.accent, fontWeight: 600 }}>Register Your Account</a>
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>


                  <Field label="Email Address" error={errors.email} t={t}>
                    <InputIcon icon={Mail} t={t} error={errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        placeholder="please Enter Your Email"
                        className="w-full bg-transparent text-sm outline-none"
                        style={{ color: t.text }}
                      />
                    </InputIcon>
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    {/* <Field label="Student ID" error={errors.studentId} t={t}>
                      <InputIcon icon={Hash} t={t} error={errors.studentId}>
                        <input
                          value={form.studentId}
                          onChange={update("studentId")}
                          placeholder="2023-ART-014"
                          className="w-full bg-transparent text-sm outline-none"
                          style={{ color: t.text }}
                        />
                      </InputIcon>
                    </Field> */}

                    {/* <Field label="Department" error={errors.department} t={t}>
                      <InputIcon icon={BookOpen} t={t} error={errors.department}>
                        <select
                          value={form.department}
                          onChange={update("department")}
                          className="w-full bg-transparent text-sm outline-none"
                          style={{ color: form.department ? t.text : t.textMuted }}
                        >
                          <option value="" style={{ color: t.textMuted }}>Select</option>
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d} style={{ color: "#111" }}>{d}</option>
                          ))}
                        </select>
                      </InputIcon>
                    </Field> */}
                  </div>

                  <Field label="Password" error={errors.password} t={t}>
                    <InputIcon icon={Lock} t={t} error={errors.password} trailing={
                      <button type="button" onClick={() => setShowPw((v) => !v)} aria-label="Toggle password visibility">
                        {showPw ? <EyeOff size={16} style={{ color: t.textMuted }} /> : <Eye size={16} style={{ color: t.textMuted }} />}
                      </button>
                    }>
                      <input
                        type={showPw ? "text" : "password"}
                        value={form.password}
                        onChange={update("password")}
                        placeholder="At least 8 characters"
                        className="w-full bg-transparent text-sm outline-none"
                        style={{ color: t.text }}
                      />
                    </InputIcon>
                    {form.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: t.surfaceAlt }}>
                          <div className="h-full rounded-full transition-all" style={{ width: `${(pwScore / 4) * 100}%`, background: pwColor }} />
                        </div>
                        <span className="text-xs" style={{ color: pwColor }}>{pwLabel}</span>
                      </div>
                    )}
                  </Field>



      
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold disabled:opacity-70"
                    style={{ background: t.accentGrad, color: t.onAccent, boxShadow: t.shadow }}
                  >
                    {submitting ? "Logining..." : "Login"}
                    {!submitting && <ArrowRight size={15} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, t, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs" style={{ color: t.danger }}>
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function InputIcon({ icon: Icon, t, error, trailing, children }) {
  return (
    <div
      className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5"
      style={{
        borderColor: error ? t.danger : t.border,
        background: error ? t.dangerSoft : t.surfaceAlt,
      }}
    >
      <Icon size={16} style={{ color: error ? t.danger : t.textMuted }} />
      {children}
      {trailing}
    </div>
  );
}