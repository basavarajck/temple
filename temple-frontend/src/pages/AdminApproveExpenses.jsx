import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const AdminApproveExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingExpenses = async () => {
    try {
      const res = await api.get("/admin/pending-expenses");
      setExpenses(res.data);
    } catch (err) {
      setError("Failed to load pending expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingExpenses();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/approve/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert("Approval failed");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Approve Expenses
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && expenses.length === 0 && (
        <p>No pending expenses 🎉</p>
      )}

      {expenses.length > 0 && (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Added By</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td className="border p-2">
                  {new Date(e.date).toLocaleDateString()}
                </td>
                <td className="border p-2">{e.category}</td>
                <td className="border p-2">₹ {e.amount}</td>
                <td className="border p-2">
                  {e.addedBy?.name || "Committee"}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleApprove(e._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default AdminApproveExpenses;
