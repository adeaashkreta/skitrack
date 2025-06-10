import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        alert('User deleted');
        navigate('/UserTable');
      })
      .catch(err => {
        console.error('Failed to delete user:', err);
        alert('Error deleting user');
        navigate('/UserTable');
      });
  }, [id, navigate]);

  return <p>Deleting user...</p>;
}
