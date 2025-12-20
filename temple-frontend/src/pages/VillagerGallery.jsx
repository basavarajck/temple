import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PageWrapper from "../components/PageWrapper";
import Loader from "../components/Loader";
import api from "../api/axios";
import "../styles/villagerGallery.css";

const VillagerGallery = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await api.get("/gallery");
        setMedia(res.data.filter((m) => m.isActive !== false));
      } catch {
        console.error("Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  return (
    <Layout>
      <PageWrapper>

        <div className="gallery-page">

          {/* HEADER */}
          <div className="gallery-header">
            <h1>Temple Gallery</h1>
            <p>
              Memories from festivals, rituals, and special occasions
            </p>
          </div>

          {loading && <Loader />}

          {!loading && media.length === 0 && (
            <div className="empty-state">
              No photos or videos available yet
            </div>
          )}

          {/* GALLERY GRID */}
          <div className="gallery-grid">
            {media.map((m) => (
              <div key={m._id} className="gallery-card">

                {m.mediaType === "image" ? (
                  <img
                    src={`http://localhost:5000/${m.fileUrl.replace(/\\/g, "/")}`}
                    alt={m.title}
                  />
                ) : (
                  <video
                    src={`http://localhost:5000/${m.fileUrl.replace(/\\/g, "/")}`}
                    controls
                  />
                )}

                {/* OVERLAY */}
                <div className="gallery-overlay">
                  <h3>{m.title}</h3>
                  {m.mediaType === "video" && (
                    <span className="video-badge">VIDEO</span>
                  )}
                </div>

              </div>
            ))}
          </div>

        </div>

      </PageWrapper>
    </Layout>
  );
};

export default VillagerGallery;
