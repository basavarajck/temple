import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/announcements.css";

const VillagerAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get("/announcements");
        setAnnouncements(res.data);
      } catch {
        console.error("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <Layout>
      <PageWrapper>

        <div className="announcements-page">

          {/* HEADER */}
          <div className="announcements-header">
            <h1>Temple Announcements</h1>
            <p>
              Important notices and official updates for villagers
            </p>
          </div>

          {loading && <Loader />}

          {!loading && announcements.length === 0 && (
            <div className="empty-state">
              No announcements available at the moment
            </div>
          )}

          {/* NOTICE LIST */}
          <div className="notice-list">
            {announcements.map((a) => (
              <div key={a._id} className="notice-card">

                {/* DATE BADGE */}
                <div className="notice-date">
                  {new Date(a.createdAt).toLocaleDateString(undefined, {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>

                {/* CONTENT */}
                <div className="notice-content">
                  <h3>{a.title}</h3>
                  <p>{a.message}</p>
                </div>

              </div>
            ))}
          </div>

        </div>

      </PageWrapper>
    </Layout>
  );
};

export default VillagerAnnouncements;
