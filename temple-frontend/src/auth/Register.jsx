import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/form.css";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
        role: "villager",
      });

      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* HEADER */}
        <div className="auth-header">
          <h1>Temple Transparency System</h1>
          <p>Villager Registration</p>
        </div>

        {/* FEEDBACK */}
        {error && <div className="error-box">{error}</div>}
        {success && <div className="success-box">{success}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="primary-btn w-full"
          >
            {loading ? "Registering..." : "Create Account"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="auth-footer">
          Already registered?{" "}
          <span onClick={() => navigate("/login")}>
            Login here
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;
