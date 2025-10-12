import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'; // Optional: for styling

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
      // Send the request to the backend
      await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );
      
      // On success, redirect to the login page
      navigate('/login');

    } catch (err) {
      const errorMessage = err.response?.data || 'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration Error:', err.response);
    }
  };

  return (
    <div className="home-container">
      <h2>Create Your InsightLink Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="cta-button">
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterPage;