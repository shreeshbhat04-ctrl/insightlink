import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();

  // Helper to determine the backend URL dynamically
  const backendUrl = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Dynamic API call
        const response = await axios.get(`${backendUrl}/api/links`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLinks(response.data);
      } catch (error) {
        console.error("Failed to fetch links:", error);
        navigate("/login");
      }
    };

    fetchLinks();
  }, [navigate, backendUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // Dynamic API call
      const response = await axios.post(
        `${backendUrl}/api/links`,
        { longUrl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLinks([response.data, ...links]);
      setLongUrl("");
    } catch (error) {
      console.error("Failed to create link:", error);
      alert("Could not create link. Please try again.");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <h2>Your Dashboard</h2>
          <p>
            Create new short links and track how they perform over time — all
            in one place.
          </p>
        </header>

        {/* Create link card */}
        <section className="dashboard-card dashboard-create-card">
          <div className="dashboard-card-header">
            <h3>Create a New Short Link</h3>
            <p>Paste a long URL and we’ll generate a trackable short link.</p>
          </div>

          <form className="dashboard-form" onSubmit={handleSubmit}>
            <input
              className="dashboard-input"
              type="url"
              placeholder="https://example.com/your/very/long/url"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />

            {/* Magic animated button */}
            <button type="submit" className="button-magic">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            <span>Short Link</span>
            </button>
          </form>
        </section>

        {/* Links list */}
        <section className="dashboard-card">
          <div className="dashboard-card-header">
            <h3>Your Links</h3>
            <p>
              View your previously created links and open detailed analytics.
            </p>
          </div>

          {links.length > 0 ? (
            <ul className="links-list">
              {links.map((link) => (
                <li className="link-item" key={link.id}>
                  <div className="link-main">
                    <div>
                      <div className="link-label">Short URL</div>
                      {/* Dynamic display link */}
                      <a
                        href={`${backendUrl}/${link.short_code}`}
                        target="_blank"
                        rel="noreferrer"
                        className="link-short"
                      >
                        {`${backendUrl}/${link.short_code}`}
                      </a>
                    </div>
                    <div>
                      <div className="link-label">Original URL</div>
                      <p className="link-long">{link.long_url}</p>
                    </div>
                  </div>

                  <div className="link-actions">
                    <Link
                      to={`/analytics/${link.id}`}
                      className="analytics-link"
                    >
                      View Analytics →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">
              You haven&apos;t created any links yet. Start by shortening one
              above.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;