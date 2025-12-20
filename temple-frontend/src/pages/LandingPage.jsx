import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* NAVBAR */}
      <nav className="landing-nav">
        <div className="nav-logo">
          🏰 TempleSystem
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#roles">Roles</a>
          <button className="nav-login" onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className="nav-register"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Temple Transparency <br />
            Management System
          </h1>
          <p>
            Bringing trust, accountability, and transparency to
            village temple management through technology.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate("/login")}>
              Get Started
            </button>
            <button
              className="outline"
              onClick={() => navigate("/register")}
            >
              Join as Villager
            </button>
          </div>
        </div>
      </section>

      {/* WHY TRANSPARENCY */}
      <section className="why">
        <h2>Why This System?</h2>

        <div className="why-grid">
          <div className="why-card">
            <span>💰</span>
            <h3>Financial Transparency</h3>
            <p>
              Every income and expense is visible to villagers
              with proper proof and approval.
            </p>
          </div>

          <div className="why-card">
            <span>🛡️</span>
            <h3>No Misuse of Funds</h3>
            <p>
              Admin approval and monthly locking prevent
              manipulation or misuse.
            </p>
          </div>

          <div className="why-card">
            <span>📢</span>
            <h3>Clear Communication</h3>
            <p>
              Announcements, festivals, and updates reach
              every villager instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="roles">
        <h2>User Roles</h2>

        <div className="roles-grid">
          <div className="role-card">
            <h3>👨‍👩‍👧 Villagers</h3>
            <ul>
              <li>View income & expenses</li>
              <li>See announcements & events</li>
              <li>Raise complaints & suggestions</li>
              <li>View gallery & reports</li>
            </ul>
          </div>

          <div className="role-card">
            <h3>🧑‍💼 Committee Members</h3>
            <ul>
              <li>Add income & expenses</li>
              <li>Upload bills & proofs</li>
              <li>Manage events & gallery</li>
              <li>Respond to complaints</li>
            </ul>
          </div>

          <div className="role-card">
            <h3>👑 Admin</h3>
            <ul>
              <li>Approve expenses</li>
              <li>Lock monthly reports</li>
              <li>Manage users</li>
              <li>Audit activity logs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="features" className="modules">
        <h2>Core Features</h2>

        <div className="modules-grid">
          <div className="module">📊 Income & Expense Tracking</div>
          <div className="module">🗓️ Events & Festivals</div>
          <div className="module">📢 Announcements</div>
          <div className="module">🧾 Monthly Reports (PDF)</div>
          <div className="module">📸 Photo & Video Gallery</div>
          <div className="module">🛡️ Role-Based Access</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Built for Villages. Trusted by People.</h2>
        <p>
          Transparency is not an option — it’s a responsibility.
        </p>

        <button onClick={() => navigate("/login")}>
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Temple Transparency Management System
        </p>
        <p className="sub">
          Designed for village temples • Built with integrity
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
