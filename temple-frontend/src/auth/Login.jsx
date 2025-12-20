import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { setAuth } from "./authUtils";
import "../styles/form.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;
      setAuth(token, user);

      if (user.role === "admin") navigate("/admin");
      else if (user.role === "committee") navigate("/committee");
      else navigate("/villager");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
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
          <p>Secure Login Portal</p>
        </div>

        {/* ERROR */}
        {error && <div className="error-box">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
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
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="auth-footer">
          New villager?{" "}
          <span onClick={() => navigate("/register")}>
            Register here
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
