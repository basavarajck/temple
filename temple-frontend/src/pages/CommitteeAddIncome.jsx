import { useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";
import "../styles/income-form.css";

const CommitteeAddIncome = () => {
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
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
      formData.append("source", source);
      formData.append("date", date);
      formData.append("description", description);
      if (proof) formData.append("proof", proof);

      await api.post("/income/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Income added successfully");
      setAmount("");
      setSource("");
      setDate("");
      setDescription("");
      setProof(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add income (month may be locked)"
      );
    } finally {
      setLoading(false);
    }
  };

 return (
  <Layout>
  <div className="income-page">
    <div className="income-card">

      <div className="income-title">
        <h1>Add Income</h1>
        <p>Record new income with optional proof</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Source</label>
          <input type="text" value={source} onChange={e => setSource(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>

        <div className="file-box">
          Click to upload proof (optional)
          <input type="file" onChange={e => setProof(e.target.files[0])} />
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Add Income"}
        </button>
      </form>

    </div>
  </div>
</Layout>

);

};

export default CommitteeAddIncome;
