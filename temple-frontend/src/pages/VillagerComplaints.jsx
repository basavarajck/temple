import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const VillagerComplaints = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setComplaints(res.data);
    } catch {
      setError("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/complaints/add", { title, message });
      setSuccess("Complaint submitted successfully");
      setTitle("");
      setMessage("");
      fetchComplaints();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to submit complaint"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Complaints & Suggestions
      </h1>

      {/* SUBMIT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow max-w-lg mb-8"
      >
        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <div className="mb-3">
          <label className="block mb-1">Title</label>
          <input
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Message</label>
          <textarea
            className="w-full border p-2 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-medium mb-3">
        My Complaints
      </h2>

      {complaints.length === 0 && (
        <p>No complaints submitted yet.</p>
      )}

      {complaints.map((c) => (
        <div
          key={c._id}
          className="bg-white p-4 rounded shadow mb-3"
        >
          <h3 className="font-semibold">{c.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            Status: <strong>{c.status}</strong>
          </p>
          <p className="mb-2">{c.message}</p>

          {c.reply && (
            <div className="bg-gray-100 p-2 rounded">
              <strong>Reply:</strong>
              <p>{c.reply}</p>
            </div>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default VillagerComplaints;
