// AnalyticsPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const { linkId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/analytics/${linkId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
        alert(
          "Could not load analytics data. You may not have permission to view this link."
        );
        navigate("/dashboard");
      }
    };

    if (linkId) {
      fetchAnalytics();
    }
  }, [linkId, navigate]);

  if (!analyticsData) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-shell">
          <div className="dashboard-card">
            <p>Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  const chartData = {
    labels: analyticsData.clicksOverTime.map((d) =>
      new Date(d.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Clicks per Day (Last 30 Days)",
        data: analyticsData.clicksOverTime.map((d) => d.count),
        fill: false,
        backgroundColor: "rgb(37, 99, 235)",
        borderColor: "rgba(37, 99, 235, 0.4)",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <section className="dashboard-card">
          <div className="dashboard-card-header analytics-header">
            <div>
              <h2>Link Analytics</h2>
              <p>
                Visualize how your short link is performing over the last 30
                days.
              </p>
            </div>

            <button
              type="button"
              className="button-magic button-magic-secondary"
              onClick={() => navigate("/dashboard")}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="analytics-summary">
            <div className="analytics-pill">
              Total Clicks: <strong>{analyticsData.totalClicks}</strong>
            </div>
          </div>

          <div className="analytics-chart-wrapper">
            <Line data={chartData} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnalyticsPage;
