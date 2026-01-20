import { Routes, Route, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';

// Catch-all component for short links
function ShortLinkRedirect() {
  const { shortCode } = useParams();

  useEffect(() => {
    // Redirect to backend to handle the short link
    window.location.href = `http://localhost:5000/${shortCode}`;
  }, [shortCode]);

  return <div>Redirecting...</div>;
}

function App() {
  return (
    <div>
      <Navbar />
      <hr />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analytics/:linkId" element={<AnalyticsPage />} />
        <Route path="/:shortCode" element={<ShortLinkRedirect />} />
      </Routes>
    </div>
  );
}

export default App;