import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '16px', background: '#f0f4fa', textAlign: 'center' }}>
      <Link to="/" style={{ margin: '0 12px' }}>Home</Link>
      <Link to="/login" style={{ margin: '0 12px' }}>Login</Link>
      <Link to="/register" style={{ margin: '0 12px' }}>Register</Link>
      <Link to="/dashboard" style={{ margin: '0 12px' }}>Dashboard</Link>
    </nav>
  );
}

export default Navbar;