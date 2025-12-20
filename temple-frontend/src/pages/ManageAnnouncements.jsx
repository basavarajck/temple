import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/axios";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const res = await api.get("/announcements");
    setAnnouncements(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addAnnouncement = async (e) => {
    e.preventDefault();
    await api.post("/announcements/add", { title, message });
    setTitle("");
    setMessage("");
    fetchData();
  };

  const deleteAnnouncement = async (id) => {
    await api.delete(`/announcements/${id}`);
    fetchData();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold mb-6">
        Manage Announcements
      </h1>

      <form
        onSubmit={addAnnouncement}
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
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Announcement
        </button>
      </form>

      {announcements.map((a) => (
        <div
          key={a._id}
          className="bg-white p-4 rounded shadow mb-3 flex justify-between"
        >
          <div>
            <h3 className="font-semibold">{a.title}</h3>
            <p>{a.message}</p>
          </div>
          <button
            onClick={() => deleteAnnouncement(a._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </Layout>
  );
};

export default ManageAnnouncements;
