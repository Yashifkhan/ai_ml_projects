import React, { useState } from "react";
import {
  GraduationCap,
  Users,
  BookOpen,
  HeartHandshake,
  Moon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
  School,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Config: steps, fields, and field metadata (matches FastAPI StudentData schema)
// ---------------------------------------------------------------------------

const STEPS = [
  {
    key: "basic",
    title: "Basic details",
    sub: "A little about you",
    icon: GraduationCap,
    fields: [
     { 
  name: "school", 
  label: "School", 
  type: "select", 
  options: [
    ["MS", "Private School"], 
    ["GP", "Government School"]
  ] 
},
      { name: "sex", label: "Gender", type: "select", options: [["F", "Female"], ["M", "Male"]] },
      { name: "age", label: "Age", type: "number", min: 14, max: 22 },
      { name: "address", label: "Address type", type: "select", options: [["U", "Urban"], ["R", "Rural"]] },
      { name: "famsize", label: "Family size", type: "select", options: [["LE3", "3 or fewer"], ["GT3", "More than 3"]] },
      { name: "Pstatus", label: "Parents' status", type: "select", options: [["T", "Living together"], ["A", "Living apart"]] },
    ],
  },
  {
    key: "family",
    title: "Family background",
    sub: "Helps us understand your support system",
    icon: Users,
    fields: [
      { name: "Medu", label: "Mother's education", type: "select", options: [[0, "None"], [1, "Primary"], [2, "5th–9th grade"], [3, "Secondary"], [4, "Higher education"]] },
      { name: "Fedu", label: "Father's education", type: "select", options: [[0, "None"], [1, "Primary"], [2, "5th–9th grade"], [3, "Secondary"], [4, "Higher education"]] },
      { name: "Mjob", label: "Mother's job", type: "select", options: [["teacher", "Teacher"], ["health", "Health"], ["services", "Services"], ["at_home", "At home"], ["other", "Other"]] },
      { name: "Fjob", label: "Father's job", type: "select", options: [["teacher", "Teacher"], ["health", "Health"], ["services", "Services"], ["at_home", "At home"], ["other", "Other"]] },
      { name: "guardian", label: "Guardian", type: "select", options: [["mother", "Mother"], ["father", "Father"], ["other", "Other"]] },
    ],
  },
  {
    key: "academic",
    title: "Academic habits",
    sub: "Your study routine and school history",
    icon: BookOpen,
    fields: [
      { name: "reason", label: "Reason for choosing school", type: "select", options: [["home", "Close to home"], ["reputation", "Reputation"], ["course", "Course preference"], ["other", "Other"]] },
      { name: "traveltime", label: "Travel time to school", type: "select", options: [[1, "< 15 min"], [2, "15–30 min"], [3, "30–60 min"], [4, "> 1 hour"]] },
      { name: "studytime", label: "Weekly study time", type: "select", options: [[1, "< 2 hours"], [2, "2–5 hours"], [3, "5–10 hours"], [4, "> 10 hours"]] },
      { name: "failures", label: "Past class failures", type: "select", options: [[0, "None"], [1, "1"], [2, "2"], [3, "3 or more"]] },
      { name: "absences", label: "School absences (this year)", type: "number", min: 0, max: 100 },
      { name: "higher", label: "Plans for higher education", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "schoolsup", label: "Extra school support", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "famsup", label: "Family educational support", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "paid", label: "Paid extra classes", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "nursery", label: "Attended nursery school", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "internet", label: "Internet access at home", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
    ],
  },
  {
    key: "lifestyle",
    title: "Lifestyle",
    sub: "Daily life outside the classroom",
    icon: HeartHandshake,
    fields: [
      { name: "activities", label: "Extra-curricular activities", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "romantic", label: "In a relationship", type: "select", options: [["yes", "Yes"], ["no", "No"]] },
      { name: "famrel", label: "Family relationship quality", type: "scale", min: 1, max: 5 },
      { name: "freetime", label: "Free time after school", type: "scale", min: 1, max: 5 },
      { name: "health", label: "Current health", type: "scale", min: 1, max: 5 },
    ],
  },
  {
    key: "wellbeing",
    title: "Daily rhythm",
    sub: "Sleep and screen time",
    icon: Moon,
    fields: [
      { name: "sleep_hours", label: "Average sleep (hours/night)", type: "number", step: 0.5, min: 3, max: 12 },
      { name: "mobile_social_hours", label: "Mobile & social media (hours/day)", type: "number", step: 0.5, min: 0, max: 12 },
    ],
  },
  {
    key: "confidence",
    title: "Self-confidence",
    sub: "Rate yourself in each subject",
    icon: Sparkles,
    fields: [
      { name: "Math_self_rating", label: "Mathematics", type: "scale", min: 1, max: 5 },
      { name: "Science_self_rating", label: "Science", type: "scale", min: 1, max: 5 },
      { name: "Social_Science_self_rating", label: "Social Science", type: "scale", min: 1, max: 5 },
      { name: "English_self_rating", label: "English", type: "scale", min: 1, max: 5 },
      { name: "Hindi_self_rating", label: "Hindi", type: "scale", min: 1, max: 5 },
    ],
  },
];

const DEFAULTS = {
  school: "GP", sex: "F", age: 16, address: "U", famsize: "GT3", Pstatus: "T",
  Medu: 3, Fedu: 2, Mjob: "teacher", Fjob: "other", reason: "course", guardian: "mother",
  traveltime: 1, studytime: 2, failures: 0, schoolsup: "no", famsup: "yes", paid: "no",
  activities: "yes", nursery: "yes", higher: "yes", internet: "yes", romantic: "no",
  famrel: 4, freetime: 3, health: 4, absences: 0, sleep_hours: 7, mobile_social_hours: 3,
  Math_self_rating: 3, Science_self_rating: 3, Social_Science_self_rating: 3,
  English_self_rating: 3, Hindi_self_rating: 3,
};

const API_URL = "http://localhost:8000/predict";

// ---------------------------------------------------------------------------

function ScaleInput({ value, onChange, min, max }) {
  const labels = { 1: "Low", 2: "Below avg", 3: "Average", 4: "Good", 5: "Excellent" };
  return (
    <div className="scale-row">
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <button
          key={n}
          type="button"
          className={`scale-pill ${value === n ? "active" : ""}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}
      <span className="scale-hint">{labels[value] || ""}</span>
    </div>
  );
}

function Field({ field, value, onChange }) {
  if (field.type === "select") {
    return (
      <select
        className="field-input"
        value={value}
        onChange={(e) => {
          const raw = e.target.value;
          const isNumeric = field.options.every(([v]) => typeof v === "number");
          onChange(isNumeric ? Number(raw) : raw);
        }}
      >
        {field.options.map(([val, label]) => (
          <option key={val} value={val}>{label}</option>
        ))}
      </select>
    );
  }
  if (field.type === "scale") {
    return <ScaleInput value={value} onChange={onChange} min={field.min} max={field.max} />;
  }
  return (
    <input
      className="field-input"
      type="number"
      step={field.step || 1}
      min={field.min}
      max={field.max}
      value={value}
      onChange={(e) => onChange(field.step ? parseFloat(e.target.value) : parseInt(e.target.value, 10))}
    />
  );
}

export default function StudentMarksForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState(DEFAULTS);
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const step = STEPS[stepIndex];
  const isLastStep = stepIndex === STEPS.length - 1;
  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  const update = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const goNext = () => {
    if (isLastStep) {
      submit();
    } else {
      setStepIndex((i) => i + 1);
    }
  };
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  async function submit() {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      setResult(data.prediction);
      setStatus("done");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Check that the API is running.");
      setStatus("error");
    }
  }

  function restart() {
    setForm(DEFAULTS);
    setStepIndex(0);
    setStatus("idle");
    setResult(null);
  }

  const MODEL_META = {
    linear_regression: "Linear Regression",
    decision_tree: "Decision Tree",
    random_forest: "Random Forest",
  };

  const modelRows = result
    ? Object.entries(result).map(([key, value]) => ({
        key,
        label: MODEL_META[key] || key,
        value: Number(value),
      }))
    : [];

  // Random Forest is the most reliable all-rounder here, so lead with it;
  // fall back to whatever the API returned first.
  const primaryScore =
    modelRows.find((m) => m.key === "random_forest")?.value ??
    modelRows[0]?.value ??
    0;

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        :root {
          --bg: #FAFAF8;
          --card: #FFFFFF;
          --ink: #1A1A2E;
          --muted: #8B8B9E;
          --line: #ECECE6;
          --accent: #5B5FEF;
          --accent-soft: #ECEDFD;
          --success: #1FA873;
        }

        .page {
          min-height: 100vh;
          background: var(--bg);
          background-image: radial-gradient(circle at 15% 0%, #F0F0FB 0%, transparent 45%),
                             radial-gradient(circle at 100% 100%, #F4FBF6 0%, transparent 40%);
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
        }

        .card {
          width: 100%;
          max-width: 540px;
          background: var(--card);
          border-radius: 24px;
          box-shadow: 0 1px 2px rgba(20,20,40,0.04), 0 20px 50px -20px rgba(20,20,50,0.15);
          border: 1px solid var(--line);
          overflow: hidden;
        }

        .progress-track {
          height: 4px;
          background: var(--line);
          position: relative;
        }
        .progress-fill {
          position: absolute;
          inset: 0 auto 0 0;
          width: ${progress}%;
          background: var(--accent);
          transition: width 0.4s cubic-bezier(.65,0,.35,1);
        }

        .card-inner { padding: 36px 36px 28px; }

        .step-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }
        .step-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--accent-soft);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .step-count {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          color: var(--muted);
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .step-title {
          font-family: 'Outfit', sans-serif;
          font-size: 21px;
          font-weight: 600;
          line-height: 1.2;
        }
        .step-sub {
          font-size: 13.5px;
          color: var(--muted);
          margin-top: 2px;
        }

        .fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px 16px;
        }
        .field-full { grid-column: 1 / -1; }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: 7px;
        }

        .field-input {
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          padding: 11px 13px;
          border-radius: 10px;
          border: 1.5px solid var(--line);
          background: #FCFCFB;
          color: var(--ink);
          outline: none;
          transition: border-color 0.15s, background 0.15s;
          appearance: none;
        }
        .field-input:focus {
          border-color: var(--accent);
          background: #fff;
        }
        select.field-input {
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6'><path d='M1 1l4 4 4-4' stroke='%238B8B9E' stroke-width='1.5' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position: right 13px center;
          padding-right: 30px;
        }

        .scale-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .scale-pill {
          width: 36px; height: 36px;
          border-radius: 9px;
          border: 1.5px solid var(--line);
          background: #FCFCFB;
          color: var(--ink);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }
        .scale-pill:hover { border-color: var(--accent); }
        .scale-pill.active {
          background: var(--accent);
          border-color: var(--accent);
          color: #fff;
        }
        .scale-hint {
          font-size: 12px;
          color: var(--muted);
          margin-left: 6px;
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 32px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
        }
        .btn {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border-radius: 10px;
          padding: 11px 20px;
          cursor: pointer;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: transform 0.1s, opacity 0.15s;
        }
        .btn:active { transform: scale(0.97); }
        .btn-ghost {
          background: transparent;
          color: var(--muted);
        }
        .btn-ghost:hover { color: var(--ink); }
        .btn-ghost:disabled { opacity: 0; pointer-events: none; }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          box-shadow: 0 8px 20px -8px rgba(91,95,239,0.55);
        }
        .btn-primary:hover { opacity: 0.92; }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

        .dots { display: flex; gap: 6px; }
        .dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--line);
        }
        .dot.active { background: var(--accent); width: 16px; border-radius: 3px; transition: all 0.3s; }
        .dot.done { background: var(--accent); opacity: 0.4; }

        /* Result state */
        .result-wrap { text-align: center; padding: 12px 0 4px; }
        .result-icon {
          width: 64px; height: 64px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: var(--accent-soft);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent);
        }
        .result-score {
          font-family: 'Outfit', sans-serif;
          font-size: 52px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
          margin: 4px 0 2px;
        }
        .result-label {
          font-size: 13px;
          color: var(--muted);
          font-weight: 500;
        }
        .result-band {
          display: inline-block;
          margin-top: 14px;
          padding: 6px 14px;
          border-radius: 20px;
          background: #EAFBF2;
          color: var(--success);
          font-size: 12.5px;
          font-weight: 600;
        }

        .model-list {
          margin-top: 28px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .model-row-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
        }
        .model-name {
          font-size: 13px;
          font-weight: 500;
          color: var(--muted);
        }
        .model-value {
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
        }
        .model-bar-track {
          height: 6px;
          border-radius: 4px;
          background: var(--line);
          overflow: hidden;
        }
        .model-bar-fill {
          height: 100%;
          border-radius: 4px;
          background: var(--accent);
        }

        .error-box {
          background: #FEF2F2;
          border: 1px solid #FEE2E2;
          color: #B42318;
          font-size: 13px;
          padding: 12px 14px;
          border-radius: 10px;
          margin-top: 16px;
        }

        @media (max-width: 480px) {
          .fields-grid { grid-template-columns: 1fr; }
          .card-inner { padding: 26px 22px 22px; }
        }
      `}</style>

      <div className="card">
        <div className="progress-track"><div className="progress-fill" /></div>

        <div className="card-inner">
          {status === "done" ? (
            <div className="result-wrap">
              <div className="result-icon"><Sparkles size={28} /></div>
              <div className="result-label">Predicted average marks</div>
              <div className="result-score">{primaryScore.toFixed(1)}</div>
              <div className="result-band">
                {primaryScore >= 75 ? "Strong performance band" : primaryScore >= 50 ? "Moderate performance band" : "Needs attention band"}
              </div>

              <div className="model-list">
                {modelRows.map((m) => (
                  <div key={m.key} className="model-row">
                    <div className="model-row-top">
                      <span className="model-name">{m.label}</span>
                      <span className="model-value">{m.value.toFixed(1)}</span>
                    </div>
                    <div className="model-bar-track">
                      <div className="model-bar-fill" style={{ width: `${Math.min(m.value, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="nav-row" style={{ justifyContent: "center", border: "none", marginTop: 24 }}>
                <button className="btn btn-ghost" onClick={restart}>Start over</button>
              </div>
            </div>
          ) : (
            <>
              <div className="step-meta">
                <div className="step-icon"><step.icon size={20} /></div>
                <div>
                  <div className="step-count">Step {stepIndex + 1} of {STEPS.length}</div>
                  <div className="step-title">{step.title}</div>
                </div>
              </div>
              <div className="step-sub" style={{ marginTop: -18, marginBottom: 22 }}>{step.sub}</div>

              <div className="fields-grid">
                {step.fields.map((f) => (
                  <div key={f.name} className={f.type === "scale" ? "field-full" : ""}>
                    <label className="field-label">{f.label}</label>
                    <Field field={f} value={form[f.name]} onChange={(v) => update(f.name, v)} />
                  </div>
                ))}
              </div>

              {status === "error" && <div className="error-box">{errorMsg}</div>}

              <div className="nav-row">
                <button className="btn btn-ghost" onClick={goBack} disabled={stepIndex === 0}>
                  <ChevronLeft size={16} /> Back
                </button>
                <div className="dots">
                  {STEPS.map((_, i) => (
                    <div key={i} className={`dot ${i === stepIndex ? "active" : i < stepIndex ? "done" : ""}`} />
                  ))}
                </div>
                <button className="btn btn-primary" onClick={goNext} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <><Loader2 size={16} className="spin" /> Predicting…</>
                  ) : isLastStep ? (
                    <>Get prediction <ChevronRight size={16} /></>
                  ) : (
                    <>Continue <ChevronRight size={16} /></>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`.spin { animation: spin 0.8s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}