import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './AuthStyle.css'; // << use this CSS

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await api.post(`/api/auth/register`, formData);
      navigate('/login');
    } catch (err) {
      const errorMessage =
        err.response?.data || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration Error:', err.response);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--register">
        {/* Left: title/description */}
        <div className="auth-left">
          <h1>Create Your InsightLink Account</h1>
          <p>
            Shorten, manage, and track your links with real–time analytics.
            Perfect for creators, marketers, and businesses.
          </p>
        </div>

        {/* Right: form */}
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="auth-inline-text">
              Already have an account? <Link to="/login">Login</Link>
            </div>

            <button className="button-magic">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span>Register</span>
</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
