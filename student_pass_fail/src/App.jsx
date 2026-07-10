import { useState } from 'react'

const API_BASE = 'http://127.0.0.1:8000'

const FIELDS = [
  { key: 'study_hours', label: 'Study Hours / Day', type: 'number', placeholder: '0', icon: '📚' },
  { key: 'internet', label: 'Internet Access', type: 'select', icon: '🌐', options: [{ value: '', label: 'Select' }, { value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }] },
  { key: 'freetime', label: 'Free Time (hrs)', type: 'number', placeholder: '0', icon: '⏱️' },
  { key: 'attendance', label: 'Attendance %', type: 'number', placeholder: '0', icon: '📋' },
  { key: 'previous_marks', label: 'Previous Marks /20', type: 'number', placeholder: '0', icon: '📝' },
  { key: 'parental_education', label: 'Parental Education', type: 'number', placeholder: '0', icon: '🎓' },
  { key: 'sleep_hours', label: 'Sleep Hours / Day', type: 'number', placeholder: '0', icon: '🌙' },
  { key: 'assignments_completed', label: 'Assignments Done', type: 'number', placeholder: '0', icon: '✅' },
]

const EMPTY = FIELDS.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {})

function App() {
  const [form, setForm] = useState(EMPTY)
  const [model, setModel] = useState('rf')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const filledCount = FIELDS.filter((f) => {
    if (f.key === 'internet') return form[f.key] !== ''
    return form[f.key] !== '' && !Number.isNaN(Number(form[f.key]))
  }).length

  const allFilled = filledCount === FIELDS.length

  function handleChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setResult(null)
    setError('')
  }

  async function handlePredict() {
    if (!allFilled) {
      setError('Please fill all fields with valid values.')
      return
    }
    setLoading(true)
    setError('')
    setResult(null)

    const studyHours = Number(form.study_hours)
    const freetime = Number(form.freetime)
    const attendance = Number(form.attendance)
    const previousMarks = Number(form.previous_marks)
    const parentalEducation = Number(form.parental_education)
    const sleepHours = Number(form.sleep_hours)
    const assignmentsCompleted = Number(form.assignments_completed)

    const payload = {
      study_hours: studyHours,
      internet: form.internet,
      freetime,
      attendance,
      previous_marks: previousMarks,
      parental_education: parentalEducation,
      sleep_hours: sleepHours,
      assignments_completed: assignmentsCompleted,
      study_per_freetime: studyHours / (freetime + 1),
      effort_score: studyHours + assignmentsCompleted + attendance / 20,
      marks_study_interaction: previousMarks * studyHours,
      attendance_category_medium: attendance > 75 && attendance <= 90 ? 1 : 0,
      attendance_category_high: attendance > 90 ? 1 : 0,
    }

    try {
      const endpoint = model === 'rf' ? '/predict/rf' : '/predict/logistic'
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || `Server error: ${res.status}`)
      }
      const data = await res.json()
      setResult(data.prediction)
    } catch (err) {
      setError(`Prediction failed. ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setForm(EMPTY)
    setResult(null)
    setError('')
  }

  const progressPct = Math.round((filledCount / FIELDS.length) * 100)

  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8"
      style={{ background: '#f5f0eb' }}
    >
      {/* Subtle background texture blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(210,180,140,0.25)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full blur-3xl"
          style={{ background: 'rgba(188,160,120,0.2)' }}
        />
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col gap-4">

        {/* ── Header ── */}
        <header
          className="flex flex-col gap-3 rounded-2xl px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{
            background: '#1c1a17',
            border: '1px solid #2e2b27',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-xl"
              style={{ background: '#2e2b27' }}
            >
              🎯
            </div>
            <div>
              <h1
                className="text-base font-bold tracking-tight"
                style={{ color: '#f0ebe3' }}
              >
                Student Outcome Predictor
              </h1>
              <p className="text-xs" style={{ color: '#7a7167' }}>
                AI-powered pass / fail analysis
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: '#2e2b27',
                color: '#c8b99a',
                border: '1px solid #3d3a34',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse"
                style={{ background: '#c8b99a' }}
              />
              Live Backend
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: '#2e2b27',
                color: '#9e9286',
                border: '1px solid #3d3a34',
              }}
            >
              ML Powered
            </span>
          </div>
        </header>

        {/* ── Main Grid ── */}
        <div className="grid gap-4 lg:grid-cols-[1fr_330px]">

          {/* ── Left ── */}
          <div className="flex flex-col gap-3">

            {/* Model Selector */}
            <div
              className="flex items-center gap-2 rounded-2xl p-1.5"
              style={{
                background: '#eae4dc',
                border: '1px solid #d6cfc5',
              }}
            >
              <span
                className="px-2 text-xs font-semibold uppercase tracking-widest"
                style={{ color: '#9e9286' }}
              >
                Model
              </span>
              <div className="flex flex-1 gap-1">
                {[
                  { id: 'rf', label: 'Random Forest', short: 'RF' },
                  { id: 'logistic', label: 'Logistic Regression', short: 'LR' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => { setModel(m.id); setResult(null) }}
                    className="flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200"
                    style={
                      model === m.id
                        ? {
                          background: '#1c1a17',
                          color: '#f0ebe3',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
                        }
                        : { color: '#7a7167', background: 'transparent' }
                    }
                  >
                    <span className="hidden sm:inline">{m.label}</span>
                    <span className="sm:hidden">{m.short}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div
              className="rounded-2xl px-4 py-3"
              style={{
                background: '#eae4dc',
                border: '1px solid #d6cfc5',
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: '#7a7167' }}>
                  Profile completion
                </span>
                <span className="text-xs font-bold" style={{ color: '#1c1a17' }}>
                  {filledCount} / {FIELDS.length}
                </span>
              </div>
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ background: '#d6cfc5' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPct}%`,
                    background: '#1c1a17',
                  }}
                />
              </div>
            </div>

            {/* Fields */}
            <div
              className="rounded-2xl p-4"
              style={{
                background: '#eae4dc',
                border: '1px solid #d6cfc5',
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-bold" style={{ color: '#1c1a17' }}>
                  Student Profile
                </h2>
                <span className="text-xs" style={{ color: '#9e9286' }}>
                  {FIELDS.length} fields
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {FIELDS.map((f) => {
                  const isFilled =
                    f.key === 'internet'
                      ? form[f.key] !== ''
                      : form[f.key] !== '' && !Number.isNaN(Number(form[f.key]))

                  return (
                    <label
                      key={f.key}
                      className="flex flex-col gap-1.5 rounded-xl p-3 transition-all duration-150 cursor-pointer"
                      style={
                        isFilled
                          ? {
                            background: '#1c1a17',
                            border: '1px solid #1c1a17',
                          }
                          : {
                            background: '#f5f0eb',
                            border: '1px solid #d6cfc5',
                          }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm leading-none">{f.icon}</span>
                          <span
                            className="text-xs font-medium"
                            style={{ color: isFilled ? '#c8b99a' : '#4a4640' }}
                          >
                            {f.label}
                          </span>
                        </div>
                        {isFilled && (
                          <span
                            className="text-[10px] font-bold"
                            style={{ color: '#c8b99a' }}
                          >
                            ✓
                          </span>
                        )}
                      </div>

                      {f.type === 'select' ? (
                        <select
                          value={form[f.key]}
                          onChange={(e) => handleChange(f.key, e.target.value)}
                          className="w-full rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
                          style={{
                            background: isFilled ? '#2e2b27' : '#ffffff',
                            border: `1px solid ${isFilled ? '#3d3a34' : '#d6cfc5'}`,
                            color: isFilled ? '#f0ebe3' : '#1c1a17',
                          }}
                        >
                          {f.options.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              style={{ background: '#2e2b27', color: '#f0ebe3' }}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          inputMode="decimal"
                          step="any"
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={(e) => handleChange(f.key, e.target.value)}
                          className="w-full rounded-lg px-2.5 py-1.5 text-sm outline-none transition"
                          style={{
                            background: isFilled ? '#2e2b27' : '#ffffff',
                            border: `1px solid ${isFilled ? '#3d3a34' : '#d6cfc5'}`,
                            color: isFilled ? '#f0ebe3' : '#1c1a17',
                          }}
                        />
                      )}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePredict}
                disabled={loading || !allFilled}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  background: '#1c1a17',
                  color: '#f0ebe3',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2"
                      style={{
                        borderColor: 'rgba(240,235,227,0.25)',
                        borderTopColor: '#f0ebe3',
                      }}
                    />
                    Analyzing…
                  </>
                ) : (
                  <>⚡ Run Prediction</>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  background: '#eae4dc',
                  border: '1px solid #d6cfc5',
                  color: '#4a4640',
                }}
              >
                Reset
              </button>
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-2 rounded-xl px-4 py-3"
                style={{
                  background: '#fdf0ed',
                  border: '1px solid #e8c4ba',
                }}
              >
                <span className="text-sm" style={{ color: '#a05a4a' }}>⚠</span>
                <p className="text-sm" style={{ color: '#a05a4a' }}>{error}</p>
              </div>
            )}
          </div>

          {/* ── Right: Result ── */}
          <div className="flex flex-col gap-3">

            {/* Result Card */}
            <div
              className="flex flex-1 flex-col rounded-2xl p-5"
              style={{
                background: '#eae4dc',
                border: '1px solid #2e2b27',
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-bold text-black" >
                  Prediction Result
                </h2>
                <span
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                  style={{
                    background: '#2e2b27',
                    border: '1px solid #3d3a34',
                    color: loading ? '#c8b99a' : '#9e9286',
                  }}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${loading ? 'animate-pulse' : ''}`}
                    style={{ background: loading ? '#c8b99a' : '#5a5650' }}
                  />
                  {loading ? 'Working' : 'Ready'}
                </span>
              </div>

              {/* Display area */}
              <div
                className="flex flex-1 flex-col items-center justify-center rounded-xl p-6 min-h-52"
                style={{
                  background: '#eae4dc',
                  border: '1px solid #2e2b27',
                }}
              >
                {result === null && !loading && (
                  <div className="text-center">
                    <div
                      className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
                      style={{
                        background: '#2e2b27',
                        border: '1px solid #3d3a34',
                      }}
                    >
                      🎯
                    </div>
                    <p className="text-sm font-medium" style={{ color: '#7a7167' }}>
                      Awaiting prediction
                    </p>
                    <p className="mt-1 text-xs" style={{ color: '#4a4640' }}>
                      Fill the form and run
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="text-center">
                    <div
                      className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl"
                      style={{
                        background: '#2e2b27',
                        border: '1px solid #3d3a34',
                      }}
                    >
                      <span
                        className="h-5 w-5 animate-spin rounded-full border-2"
                        style={{
                          borderColor: '#3d3a34',
                          borderTopColor: '#c8b99a',
                        }}
                      />
                    </div>
                    <p className="text-sm" style={{ color: '#7a7167' }}>
                      Analyzing…
                    </p>
                  </div>
                )}

                {result !== null && !loading && (
                  <div className="text-center">
                    <div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl"
                      style={{
                        background: '#2e2b27',
                        border: '1px solid #3d3a34',
                      }}
                    >
                      {result === 1 ? '🏆' : '📉'}
                    </div>

                    <div
                      className="inline-flex items-center rounded-xl px-6 py-2.5 text-2xl font-black tracking-widest"
                      style={
                        result === 1
                          ? {
                            background: '#f0ebe3',
                            color: '#1c1a17',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                          }
                          : {
                            background: '#2e2b27',
                            color: '#c8b99a',
                            border: '1px solid #3d3a34',
                          }
                      }
                    >
                      {result === 1 ? 'PASS' : 'FAIL'}
                    </div>

                    <p className="mt-3 text-xs" style={{ color: '#5a5650' }}>
                      via {model === 'rf' ? 'Random Forest' : 'Logistic Regression'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Model', value: model === 'rf' ? 'Random Forest' : 'Logistic Reg.', icon: '🤖' },
                { label: 'Fields', value: `${filledCount} / ${FIELDS.length}`, icon: '📊' },
                { label: 'Status', value: allFilled ? 'Ready' : 'Pending', icon: '🔍' },
                { label: 'Backend', value: 'Local API', icon: '⚙️' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl px-3 py-2.5"
                  style={{
                    background: '#eae4dc',
                    border: '1px solid #d6cfc5',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{item.icon}</span>
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold"
                      style={{ color: '#9e9286' }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-xs font-bold truncate"
                    style={{ color: '#1c1a17' }}
                  >
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div
              className="rounded-xl px-4 py-3"
              style={{
                background: '#eae4dc',
                border: '1px solid #d6cfc5',
              }}
            >
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: '#7a7167' }}
              >
                💡 Tip
              </p>
              <p className="text-xs leading-relaxed" style={{ color: '#4a4640' }}>
                Higher study hours, attendance above 90%, and completed assignments
                significantly improve prediction accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px]" style={{ color: '#9e9286' }}>
          Student Outcome Predictor · Local ML backend · {API_BASE}
        </p>
      </div>
    </div>
  )
}

export default App