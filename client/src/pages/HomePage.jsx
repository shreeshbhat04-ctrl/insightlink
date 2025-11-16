import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to InsightLink</h1>
        <p className="lead">The simplest way to shorten, manage, and track your URLs.</p>
        <p>
          Gain insights into your link performance with our real-time analytics dashboard.
          Perfect for marketers, creators, and businesses.
        </p>

        <div className="cta-row">
          <Link to="/register">
            <button className="button-magic">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span>Get Started for Free</span>
            </button>

          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;