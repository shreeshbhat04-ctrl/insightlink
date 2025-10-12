import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();

  // This function will run once when the component loads
  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/links', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token for authentication
          },
        });
        setLinks(response.data);
      } catch (error) {
        console.error('Failed to fetch links:', error);
        // Could also handle token expiration here and redirect
        navigate('/login');
      }
    };

    fetchLinks();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const response = await axios.post(
        'http://localhost:5000/api/links',
        { longUrl }, // The data to send
        {
          headers: {
            Authorization: `Bearer ${token}`, // The authentication header
          },
        }
      );
      // Add the new link to the top of our list and clear the input
      setLinks([response.data, ...links]);
      setLongUrl('');
    } catch (error) {
      console.error('Failed to create link:', error);
      alert('Could not create link. Please try again.');
    }
  };

  return (
    <div>
      <h2>Your Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <h3>Create a New Short Link</h3>
        <input
          type="url"
          placeholder="Enter your long URL here"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      <hr />

      <h3>Your Links</h3>
      {links.length > 0 ? (
        <ul>
          {links.map((link) => (
            <li key={link.id}>
              <p><strong>Short:</strong> http://localhost:5000/{link.short_code}</p>
              <p><strong>Original:</strong> {link.long_url}</p>
              <Link to={`/analytics/${link.id}`}>View Analytics</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't created any links yet.</p>
      )}
    </div>
  );
}

export default DashboardPage;