import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints");
      setComplaints(res.data);
    } catch {
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaint = async (id, status, reply) => {
    try {
      await api.put(`/complaints/${id}`, { status, reply });
      fetchComplaints();
    } catch {
      alert("Failed to update complaint");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Manage Complaints
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && complaints.length === 0 && (
        <p>No complaints available.</p>
      )}

      {complaints.map((c) => (
        <ComplaintCard
          key={c._id}
          complaint={c}
          onUpdate={updateComplaint}
        />
      ))}
    </Layout>
  );
};

const ComplaintCard = ({ complaint, onUpdate }) => {
  const [reply, setReply] = useState(complaint.reply || "");
  const [status, setStatus] = useState(complaint.status);

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="font-semibold">{complaint.title}</h3>

      <p className="text-sm text-gray-600 mb-1">
        By: {complaint.createdBy?.name || "Villager"}
      </p>

      <p className="mb-2">{complaint.message}</p>

      <div className="mb-2">
        <label className="block text-sm mb-1">Status</label>
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Reply</label>
        <textarea
          className="w-full border p-2 rounded"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write reply..."
        />
      </div>

      <button
        onClick={() =>
          onUpdate(complaint._id, status, reply)
        }
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Update
      </button>
    </div>
  );
};

export default ManageComplaints;
