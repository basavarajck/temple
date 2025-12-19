import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const CommitteeAddExpense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [proof, setProof] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("category", category);
      formData.append("date", date);
      formData.append("description", description);
      if (proof) formData.append("proof", proof);

      await api.post("/expense/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Expense submitted successfully (pending approval)");
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setProof(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add expense (month may be locked)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">Add Expense</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-lg"
      >
        <div className="mb-3">
          <label className="block mb-1">Amount</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Category</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Bill / Proof</label>
          <input
            type="file"
            onChange={(e) => setProof(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Add Expense"}
        </button>
      </form>
    </Layout>
  );
};

export default CommitteeAddExpense;
