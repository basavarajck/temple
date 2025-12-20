import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

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
      <h1 className="text-2xl font-semibold mb-6">
        Temple Announcements
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && announcements.length === 0 && (
        <p>No announcements available.</p>
      )}

      {announcements.map((a) => (
        <div
          key={a._id}
          className="bg-white p-4 rounded shadow mb-3"
        >
          <h3 className="font-semibold text-lg">{a.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {new Date(a.createdAt).toLocaleDateString()}
          </p>
          <p>{a.message}</p>
        </div>
      ))}
    </Layout>
  );
};

export default VillagerAnnouncements;
