import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const AdminMonthlyReports = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async (e) => {
    e.preventDefault();
    setError("");
    setReport(null);
    setLoading(true);

    try {
      const res = await api.get(
        `/reports/monthly?year=${year}&month=${month}`
      );
      setReport(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch report"
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const res = await api.get(
        `/reports/monthly/pdf?year=${year}&month=${month}`,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `temple-report-${month}-${year}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    } catch {
      alert("Failed to download PDF");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Monthly Financial Report
      </h1>

      <form
        onSubmit={fetchReport}
        className="bg-white p-4 rounded shadow max-w-md mb-6"
      >
        <div className="mb-3">
          <label className="block mb-1">Year</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Month</label>
          <input
            type="number"
            min="1"
            max="12"
            className="w-full border p-2 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Loading..." : "View Report"}
        </button>
      </form>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {report && (
        <div className="bg-white p-6 rounded shadow max-w-xl">
          <h2 className="text-xl font-semibold mb-4">
            Report Summary
          </h2>

          <p className="mb-2">
            <strong>Total Income:</strong> ₹{" "}
            {report.income.total}
          </p>
          <p className="mb-2">
            <strong>Total Expense:</strong> ₹{" "}
            {report.expense.total}
          </p>
          <p className="mb-4">
            <strong>Surplus / Deficit:</strong> ₹{" "}
            {report.surplus}
          </p>

          <button
            onClick={downloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
      )}
    </Layout>
  );
};

export default AdminMonthlyReports;
