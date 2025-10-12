import { Link } from 'react-router-dom';
import './HomePage.css'; // Optional: for styling

function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to InsightLink</h1>
      <p>The simplest way to shorten, manage, and track your URLs.</p>
      <p>
        Gain insights into your link performance with our real-time analytics dashboard.
        Perfect for marketers, creators, and businesses.
      </p>
      <Link to="/register">
        <button className="cta-button">
          Get Started for Free
        </button>
      </Link>
    </div>
  );
}

export default HomePage;