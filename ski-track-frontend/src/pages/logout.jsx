import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🗑️ Clear all user data
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('user'); // If applicable
    sessionStorage.clear();

    // 🔄 Redirect to home
    navigate('/');
  }, [navigate]);

  return null; // Since it's a redirect-only component
};

export default Logout;
