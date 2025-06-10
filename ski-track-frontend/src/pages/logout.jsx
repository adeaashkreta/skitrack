import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all user-related storage
    localStorage.removeItem('token');  // Remove JWT token
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('user');   // If used anywhere else
    sessionStorage.clear();

    // Redirect to homepage or login page
    navigate('/');
  }, [navigate]);

  return null; // No UI
};

export default Logout;
