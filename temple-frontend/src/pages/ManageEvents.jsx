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
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event");
    }
  };

  const disableEvent = async (id) => {
    if (!window.confirm("Are you sure you want to disable this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Error disabling event:", error);
      alert("Failed to disable event");
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Manage Events & Festivals
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Create, update, and manage the temple's upcoming programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Create Event Form */}
          <div className="lg:col-span-4 max-w-2xl lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-8">
              <div className="px-6 py-4 bg-orange-50 border-b border-orange-100">
                <h2 className="text-lg font-bold text-orange-800 flex items-center gap-2">
                  <span>📅</span> Add New Event
                </h2>
              </div>
              <form onSubmit={addEvent} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Event Title
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-300 border bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition outline-none"
                    placeholder="e.g. Maha Shivaratri Check"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full rounded-lg border-gray-300 border bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition outline-none resize-none h-24"
                    placeholder="Describe the event details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border-gray-300 border bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition outline-none"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border-gray-300 border bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition outline-none"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Schedule <span className="font-normal text-gray-500">(Optional)</span>
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-300 border bg-gray-50 p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white transition outline-none"
                    placeholder="e.g. 6AM Poojan, 8PM Aarti"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                  />
                </div>

                <button className="w-full relative overflow-hidden group bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Submit Event 🚀
                  </span>
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-200" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Events List */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              Current Events 
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full font-medium">
                {events.length}
              </span>
            </h2>

            <div className="grid gap-5">
              {events.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <p className="text-gray-500">No events found. Create one to get started!</p>
                </div>
              )}

              {events.map((e) => (
                <div
                  key={e._id}
                  className={`bg-white p-5 rounded-2xl shadow-sm border transition-all duration-200 hover:shadow-md ${
                    e.isActive === false ? "border-gray-200 bg-gray-50/50" : "border-gray-100"
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-lg font-bold ${e.isActive === false ? 'text-gray-500' : 'text-gray-900'}`}>
                          {e.title}
                        </h3>
                        {e.isActive === false ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            Disabled
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                            Active
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span>🗓️</span>
                          <span className="font-medium">
                            {new Date(e.startDate).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          {e.endDate && (
                            <>
                              <span className="text-gray-400">→</span>
                              <span className="font-medium">
                                {new Date(e.endDate).toLocaleDateString(undefined, {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </>
                          )}
                        </div>
                        {e.schedule && (
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg">
                            <span>⏰</span>
                            {e.schedule}
                          </div>
                        )}
                      </div>

                      <p className="text-gray-600 leading-relaxed text-sm">
                        {e.description}
                      </p>
                    </div>

                    <div className="flex items-start">
                      {e.isActive !== false && (
                        <button
                          onClick={() => disableEvent(e._id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition-colors w-full md:w-auto justify-center"
                          title="Disable this event"
                        >
                          <span>🗑️</span>
                          Disable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageEvents;
