import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedule, setSchedule] = useState("");

  const fetchEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    await api.post("/events/add", {
      title,
      description,
      startDate,
      endDate,
      schedule,
    });
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setSchedule("");
    fetchEvents();
  };

  const disableEvent = async (id) => {
    // adjust URL if your backend uses a different path
    await api.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Manage Events & Festivals
      </h1>

      {/* ADD EVENT */}
      <form
        onSubmit={addEvent}
        className="bg-white p-4 rounded shadow max-w-lg mb-6"
      >
        <input
          className="w-full border p-2 mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border p-2 mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className="flex gap-2 mb-2">
          <input
            type="date"
            className="w-full border p-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            className="w-full border p-2"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <input
          className="w-full border p-2 mb-2"
          placeholder="Schedule (optional)"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Event
        </button>
      </form>

      {/* LIST EVENTS */}
      {events.map((e) => (
        <div
          key={e._id}
          className="bg-white p-4 rounded shadow mb-3 flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{e.title}</h3>
            <p className="text-sm">{e.description}</p>
            <p className="text-xs text-gray-500">
              Status: {e.isActive === false ? "Disabled" : "Active"}
            </p>
          </div>
          {e.isActive !== false && (
            <button
              onClick={() => disableEvent(e._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Disable
            </button>
          )}
        </div>
      ))}
    </Layout>
  );
};

export default ManageEvents;
