import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const AdminLockMonth = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await api.post("/admin/lock-month", {
        year: Number(year),
        month: Number(month),
      });

      setMessage("Month locked successfully");
      setYear("");
      setMonth("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to lock month"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Lock Financial Month
      </h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-md"
      >
        <div className="mb-3">
          <label className="block mb-1">Year</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2025"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Month (1–12)</label>
          <input
            type="number"
            min="1"
            max="12"
            className="w-full border p-2 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="1"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-60"
        >
          {loading ? "Locking..." : "Lock Month"}
        </button>
      </form>
    </Layout>
  );
};

export default AdminLockMonth;
