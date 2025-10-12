import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// This is required to register the components for Chart.js
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
  const { linkId } = useParams(); // Gets the :linkId from the URL (e.g., '3')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect if not logged in
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
        console.error('Failed to fetch analytics:', error);
        alert('Could not load analytics data. You may not have permission to view this link.');
        navigate('/dashboard'); // Go back to the dashboard if the request fails
      }
    };

    if (linkId) {
      fetchAnalytics();
    }
  }, [linkId, navigate]);

  // Show a loading message while data is being fetched
  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  // Prepare the data for the chart component
  const chartData = {
    labels: analyticsData.clicksOverTime.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Clicks per Day (Last 30 Days)',
        data: analyticsData.clicksOverTime.map(d => d.count),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Link Analytics</h2>
      <h3>Total Clicks: {analyticsData.totalClicks}</h3>
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default AnalyticsPage;