import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const VillagerEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        // show only active events
        setEvents(res.data.filter((e) => e.isActive !== false));
      } catch {
        console.error("Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Temple Events & Festivals
      </h1>

      {loading && <p>Loading...</p>}

      {!loading && events.length === 0 && (
        <p>No upcoming events.</p>
      )}

      {events.map((e) => (
        <div key={e._id} className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold">{e.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {new Date(e.startDate).toLocaleDateString()}{" "}
            {e.endDate &&
              `– ${new Date(e.endDate).toLocaleDateString()}`}
          </p>
          <p className="mb-2">{e.description}</p>
          {e.schedule && (
            <p className="text-sm">
              <strong>Schedule:</strong> {e.schedule}
            </p>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default VillagerEvents;
