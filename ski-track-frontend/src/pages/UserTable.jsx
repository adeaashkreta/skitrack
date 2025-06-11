import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/table.css';

export default function UserTable() {
  const [users, setUsers] = useState([]);

  /* ───────────────────────────────────────── */
  /* Fetch all users once on component mount   */
  /* ───────────────────────────────────────── */
  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  /* ───────────────────────────────────────── */
  /* Delete handler                            */
  /* ───────────────────────────────────────── */
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
        .then(() => setUsers(prev => prev.filter(u => u._id !== id)))
        .catch(err => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="usertable-container">
      <div className="usertable-box-add">
        <Link to="/InsertUser">
          <button className="usertable-button-add">ADD USER</button>
        </Link>
      </div>

      <table className="usertable-table">
        <thead>
          <tr className="usertable-tr">
            <th className="usertable-th">ID</th>
            <th className="usertable-th">First Name</th>
            <th className="usertable-th">Last Name</th>
            <th className="usertable-th">Email</th>
            <th className="usertable-th">Password</th>
            <th className="usertable-th">Phone Number</th>
            <th className="usertable-th">Birth Date</th>
            <th className="usertable-th">Role</th>
            <th className="usertable-th">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user._id} className="usertable-tr">
              <td className="usertable-td">{user._id}</td>
              <td className="usertable-td">{user.firstName}</td>
              <td className="usertable-td">{user.lastName}</td>
              <td className="usertable-td">{user.email}</td>
              <td className="usertable-td">{user.password}</td>
              <td className="usertable-td">{user.phoneNumber}</td>
              <td className="usertable-td">{user.birthDate}</td>
              <td className="usertable-td">{user.role}</td>

              <td className="usertable-td">
                <div className="usertable-button-container">
                  <Link
                    to={`/UpdateUser/${user._id}`}
                    className="usertable-button-update">
                    Update
                  </Link>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="usertable-button-delete">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
