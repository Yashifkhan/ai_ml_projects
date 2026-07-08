import React, { useState } from 'react';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-indigo-400">
    <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21 1.5c-4.305 0-8.805 2.383-11.685 6.084a2.92 2.92 0 00-.726 1.214c-.21.669-.21 1.405-.21 2.202 0 .797 0 1.533.21 2.202a2.92 2.92 0 00.726 1.214c2.88 3.701 7.38 6.084 11.685 6.084-4.305 0-8.805-2.383-11.685-6.084a2.92 2.92 0 00-.726-1.214c-.21-.669-.21-1.405-.21-2.202 0-.797 0-1.533.21-2.202a2.92 2.92 0 00.726-1.214zM6.75 18a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H6.75zM4.5 15a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H4.5zM3 12a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H3zM4.5 9a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H4.5zM6.75 6a.75.75 0 000 1.5h.008a.75.75 0 000-1.5H6.75z" clipRule="evenodd" />
  </svg>
);

const ErrorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-500">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

const OPTIONS = {
  countries: [
    "United States of America", "India", "United Kingdom of Great Britain and Northern Ireland",
    "Germany", "Canada", "Brazil", "France", "Spain", "Australia", "Netherlands", "Other"
  ],
  devTypes: [
  "Developer, back-end",
  "Developer, front-end",
  "Developer, full-stack",
  "Developer, mobile",
  "Developer, desktop or enterprise applications",
  "Developer, embedded applications or devices",
  "Developer, game or graphics",
  "Developer, QA or test",
  "Developer Advocate",
  "Developer Experience",
  "Data scientist or machine learning specialist",
  "Data or business analyst",
  "Engineer, data",
  "Engineer, site reliability",
  "DevOps specialist",
  "Cloud infrastructure engineer",
  "Database administrator",
  "System administrator",
  "Security professional",
  "Hardware Engineer",
  "Blockchain",
  "Designer",
  "Scientist",
  "Academic researcher",
  "Research & Development role",
  "Educator",
  "Student",
  "Engineering manager",
  "Project manager",
  "Product manager",
  "Senior Executive (C-Suite, VP, etc.)",
  "Marketing or sales professional",
  "Other (please specify):",
],
  edLevels : [
  "Bachelor’s degree (B.A., B.S., B.Eng., etc.)",
  "Master’s degree (M.A., M.S., M.Eng., MBA, etc.)",
  "Some college/university study without earning a degree",
  "Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)",
  "Professional degree (JD, MD, Ph.D, Ed.D, etc.)",
  "Primary/elementary school",
  "Associate degree (A.A., A.S., etc.)",
  "Something else"
],
  remoteWork: [
    { label: "Work From Home", value: "Remote" },
    { label: "Office", value: "On-site" },
    { label: "Hybrid (Office + Home)", value: "Hybrid" },
    { label: "Freelancing", value: "Freelance" }
  ],
  orgSizes: [
    "20 to 99 employees", "100 to 499 employees", "1,000 to 4,999 employees", 
    "10,000 or more employees", "2 to 9 employees", "Just me - I am a freelancer, sole proprietor, etc."
  ],
  industries: [
    "Information Services, IT, Software Development, or other Technology",
    "Financial Services", "Healthcare", "Retail and Consumer Services", "Manufacturing, Transportation, or Supply Chain"
  ],
technologies : [
  // Frameworks / Libraries
  "Elm", "Laravel", "ASP.NET CORE", "jQuery", "Next.js", "NestJS", "Lit",
  "Angular", "Blazor", "AngularJS", "ASP.NET", "Qwik", "Symfony", "Phoenix",
  "Node.js", "Drupal", "Vue.js", "Fastify", "Solid.js", "React", "Express",
  "Nuxt.js", "Spring Boot", "Django", "Remix", "Gatsby", "Svelte", "Deno",
  "Play Framework", "CodeIgniter", "Flask", "WordPress", "Ruby on Rails", "FastAPI",

  // Programming Languages
  "Raku", "Lua", "Delphi", "TypeScript", "JavaScript", "C++", "Swift", "Nim",
  "SQL", "Fortran", "APL", "Ada", "Java", "Visual Basic (.Net)", "Julia",
  "Objective-C", "F#", "MATLAB", "Zig", "Clojure", "Solidity", "Crystal",
  "C#", "VBA", "Bash/Shell (all shells)", "Lisp", "Cobol", "SAS", "R",
  "Assembly", "Apex", "Kotlin", "HTML/CSS", "Flow", "PowerShell", "Scala",
  "GDScript", "OCaml", "Dart", "Ruby", "Groovy", "Rust", "C", "Python",
  "PHP", "Haskell", "Perl", "Erlang", "Go", "Prolog", "Elixir"
],
 dbSkills : [
  "PostgreSQL",
  "MySQL",
  "SQLite",
  "Microsoft SQL Server",
  "Redis",
  "MongoDB",
  "MariaDB",
  "Elasticsearch",
  "Dynamodb",
  "Oracle"
],
 cloudSkills : [
  "Amazon Web Services (AWS)",
  "Microsoft Azure",
  "Google Cloud",
  "Firebase",
  "Vercel",
  "Netlify",
  "Heroku",
  "Cloudflare",
  "Digital Ocean",
  "Render"
],
tools : [
  "Docker",
  "Kubernetes",
  "Terraform",
  "Ansible",
  "Webpack",
  "Vite",
  "npm",
  "Yarn",
  "pnpm",
  "Bun",
  "Pip",
  "Maven (build tool)",
  "Gradle",
  "CMake",
  "GNU GCC"
],
};

const Label = ({ children }) => (
  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 shadow-sm"
  />
);

const Select = ({ options, ...props }) => {
  const isObjectArray = options?.[0] && typeof options[0] === 'object';
  
  return (
    <select
      {...props}
      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 shadow-sm appearance-none cursor-pointer"
      style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`, paddingRight: `2.5rem` }}
    >
      {isObjectArray ? (
        options?.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))
      ) : (
        options?.map((opt, i) => (
          <option key={i} value={opt}>
            {opt.replace("United Kingdom of Great Britain and Northern Ireland", "United Kingdom (UK)")}
          </option>
        ))
      )}
    </select>
  );
};

const MultiSelect = ({ options, value, onChange, name }) => {
  const selectedArray = typeof value === 'string' ? value.split(';').filter(v => v.trim()) : [];

  const handleChange = (e) => {
    const option = e.target.value;
    let newSelected = [...selectedArray];

    if (newSelected.includes(option)) {
      newSelected = newSelected.filter(item => item !== option);
    } else {
      newSelected.push(option);
    }

    // Update formData with semicolon-separated string
    onChange({
      target: {
        name: name,
        value: newSelected.join(';')
      }
    });
  };

  return (
    <div className="w-full">
      <div className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-200 shadow-sm max-h-48 overflow-y-auto">
        <div className="space-y-2">
          {options?.map((opt, i) => (
            <label key={i} className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded transition-colors">
              <input
                type="checkbox"
                value={opt}
                checked={selectedArray.includes(opt)}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
              />
              <span className="text-sm text-slate-700">{opt}</span>
            </label>
          ))}
        </div>
      </div>
      {selectedArray.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedArray.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {item}
              <button
                type="button"
                onClick={() => {
                  const newSelected = selectedArray.filter(s => s !== item);
                  onChange({
                    target: {
                      name: name,
                      value: newSelected.join(';')
                    }
                  });
                }}
                className="hover:text-indigo-900 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState({
    YearsCodePro: "5",
    Country: "United States of America",
    DevType: "Developer, back-end",
    EdLevel: "Bachelor’s degree (B.A., B.S., B.Eng., etc.)",
    RemoteWork: "Remote",
    OrgSize: "100 to 499 employees",
    Industry: "Information Services, IT, Software Development, or other Technology",
    LanguageHaveWorkedWith: "Python;JavaScript;SQL",
    PlatformHaveWorkedWith: "Amazon Web Services (AWS)",
    DatabaseHaveWorkedWith: "PostgreSQL;Redis",
    ToolsTechHaveWorkedWith: "Docker;npm"
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const USD_TO_INR_RATE = 90;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setResult(null);
    setErrorMsg("");

    try {
      const response = await fetch('http://127.0.0.1:8000/predict-emp-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log('data: ', data);

      if (response.ok) {
        setResult(data);
        setStatus("success");
      } else {
        throw new Error(data.detail || "Error connecting to prediction server");
      }
    } catch (error) {
      setErrorMsg(error.message === "Failed to fetch" ? "Cannot connect to API. Is the FastAPI server running on port 8000?" : error.message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] font-sans flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-slate-900 px-6 py-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <SparklesIcon />
              Employee Compensation Predictor
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              AI-powered salary estimates based on global market data.
            </p>
          </div>
          
         {/* Result Display Bubble (Visible on Success) */}
<div className="mt-6 sm:mt-0">
  {status === "success" && (
    <div className="animate-fade-in bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-6 py-3 flex flex-col items-center sm:items-end">
      <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wider">
        Estimated Base
      </span>
      <span className="text-3xl font-extrabold text-white tracking-tight">
        {result?.predicted_salary
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(result.predicted_salary)
          : "—"}
      </span>
      <span className="text-indigo-300/60 text-[11px] mt-1">per year</span>

      {/* Small INR conversion text */}
      {result?.predicted_salary && (
        <span className="text-indigo-300/50 text-[11px] mt-0.5">
          ≈{" "}
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          }).format(result.predicted_salary * USD_TO_INR_RATE)}{" "}
          / year
        </span>
      )}
    </div>
  )}
  {status === "error" && (
    <div className="animate-fade-in bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3 max-w-xs">
      <ErrorIcon />
      <span className="text-red-400 text-sm font-medium leading-tight">{errorMsg}</span>
    </div>
  )}
</div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          
          {/* Group 1: Profile & Role */}
          <h2 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Profile & Role</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div>
              <Label>Years Pro Experience</Label>
              <Input type="number" name="YearsCodePro" min="0" value={formData.YearsCodePro} onChange={handleChange} required />
            </div>
            <div>
              <Label>Country</Label>
              <Select name="Country" options={OPTIONS.countries} value={formData.Country} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <Label>Developer Role</Label>
              <Select name="DevType" options={OPTIONS.devTypes} value={formData.DevType} onChange={handleChange} />
            </div>
          </div>

          {/* Group 2: Company & Environment */}
          <h2 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Company & Environment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div>
              <Label>Organization Size</Label>
              <Select name="OrgSize" options={OPTIONS.orgSizes} value={formData.OrgSize} onChange={handleChange} />
            </div>
            <div>
              <Label>Industry</Label>
              <Select name="Industry" options={OPTIONS.industries} value={formData.Industry} onChange={handleChange} />
            </div>
            <div>
              <Label>Work Arrangement</Label>
              <Select name="RemoteWork" options={OPTIONS.remoteWork} value={formData.RemoteWork} onChange={handleChange} />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <Label>Highest Education</Label>
              <Select name="EdLevel" options={OPTIONS.edLevels} value={formData.EdLevel} onChange={handleChange} />
            </div>
          </div>

          {/* Group 3: Tech Stack (Multi-Select) */}
          <h2 className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Tech Stack 
            <span className="text-xs font-normal text-slate-400 normal-case tracking-normal ml-2">Select all that apply</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            <div>
              <Label>Languages & Frameworks / Libraries</Label>
              <MultiSelect 
                name="LanguageHaveWorkedWith" 
                options={OPTIONS.technologies} 
                value={formData.LanguageHaveWorkedWith} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label>Databases</Label>
              <MultiSelect 
                name="DatabaseHaveWorkedWith" 
                options={OPTIONS.dbSkills} 
                value={formData.DatabaseHaveWorkedWith} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label>Cloud Platforms</Label>
              <MultiSelect 
                name="PlatformHaveWorkedWith" 
                options={OPTIONS.cloudSkills} 
                value={formData.PlatformHaveWorkedWith} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <Label>Tools & Tech</Label>
              <MultiSelect 
                name="ToolsTechHaveWorkedWith" 
                options={OPTIONS.tools} 
                value={formData.ToolsTechHaveWorkedWith} 
                onChange={handleChange} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={status === "loading"}
              className={`relative overflow-hidden px-8 py-3 rounded-xl font-bold text-sm tracking-wide text-white transition-all duration-300 shadow-[0_4px_14px_0_rgb(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.23)] hover:bg-indigo-600 hover:-translate-y-0.5 ${
                status === "loading" ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500"
              }`}
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </span>
              ) : (
                "Predict Salary"
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}