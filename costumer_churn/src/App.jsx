import React, { useState } from "react";

// Change this to your deployed FastAPI URL when needed
const API_URL = "http://localhost:8000/costumer-churn-predict";

const initialForm = {
  gender: "Male",
  SeniorCitizen: 0,
  Partner: "No",
  Dependents: "No",
  tenure: 12,
  PhoneService: "Yes",
  MultipleLines: "No",
  InternetService: "Fiber optic",
  OnlineSecurity: "No",
  OnlineBackup: "No",
  DeviceProtection: "No",
  TechSupport: "No",
  StreamingTV: "No",
  StreamingMovies: "No",
  Contract: "Month-to-month",
  PaperlessBilling: "Yes",
  PaymentMethod: "Electronic check",
  MonthlyCharges: 70,
  TotalCharges: 840,
  model_choice: "random_forest",
};

const yesNo = ["Yes", "No"];
const yesNoPhone = ["Yes", "No", "No phone service"];
const yesNoInternet = ["Yes", "No", "No internet service"];

export default function ChurnPredictForm() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || "Prediction failed. Check API server.");
      }

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (label, name, type = "select", options = []) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-slate-900">
            Customer Churn Prediction
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter customer details to estimate churn risk.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {field("Gender", "gender", "select", ["Male", "Female"])}
            {field("Senior Citizen (0/1)", "SeniorCitizen", "number")}
            {field("Partner", "Partner", "select", yesNo)}
            {field("Dependents", "Dependents", "select", yesNo)}
            {field("Tenure (months)", "tenure", "number")}
            {field("Phone Service", "PhoneService", "select", yesNo)}
            {field("Multiple Lines", "MultipleLines", "select", yesNoPhone)}
            {field("Internet Service", "InternetService", "select", [
              "DSL",
              "Fiber optic",
              "No",
            ])}
            {field("Online Security", "OnlineSecurity", "select", yesNoInternet)}
            {field("Online Backup", "OnlineBackup", "select", yesNoInternet)}
            {field("Device Protection", "DeviceProtection", "select", yesNoInternet)}
            {field("Tech Support", "TechSupport", "select", yesNoInternet)}
            {field("Streaming TV", "StreamingTV", "select", yesNoInternet)}
            {field("Streaming Movies", "StreamingMovies", "select", yesNoInternet)}
            {field("Contract", "Contract", "select", [
              "Month-to-month",
              "One year",
              "Two year",
            ])}
            {field("Paperless Billing", "PaperlessBilling", "select", yesNo)}
            {field("Payment Method", "PaymentMethod", "select", [
              "Electronic check",
              "Mailed check",
              "Bank transfer (automatic)",
              "Credit card (automatic)",
            ])}
            {field("Monthly Charges", "MonthlyCharges", "number")}
            {field("Total Charges", "TotalCharges", "number")}
            {field("Model", "model_choice", "select", [
              "random_forest",
              "logistic_regression",
            ])}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Predicting..." : "Predict Churn"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Model used: {result.model_used}</p>
            <div className="mt-2 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  result.churn_prediction === "Yes"
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {result.churn_prediction === "Yes" ? "Likely to churn" : "Likely to stay"}
              </span>
              <span className="text-sm text-slate-600">
                Probability: {(result.churn_probability * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}