import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AuthStyle.css'; // << same CSS

function LoginPage() {
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
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage =
        err.response?.data || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      console.error('Login Error:', err.response);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--login">
        {/* Left: title/description */}
        <div className="auth-left">
          <h1>Login to Your InsightLink Account</h1>
          <p>
            Access your dashboard, manage your short links, and monitor click
            performance in real time.
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
              Don&apos;t have an account?{' '}
              <Link to="/register">Get Started for Free</Link>
            </div>

           <button type="submit" className="button-magic">
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span></span>
             <span>Login</span>
           </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
