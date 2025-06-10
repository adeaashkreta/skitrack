import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../assets/css/table.css"; // Mbaje siç është

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`/api/users/${id}`, { method: 'DELETE' })
        .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
    }
  };

  return (
    <>
      <div className="usertable-container">
        <div className="usertable-box-add">
          <Link to="/InsertUser">
            <br />
            <button className="usertable-button-add">ADD USER</button>
          </Link>
        </div>
        <div>
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
                <tr key={user.id} className="usertable-tr">
                  <td className="usertable-td">{user.id}</td>
                  <td className="usertable-td">{user.firstName}</td>
                  <td className="usertable-td">{user.lastName}</td>
                  <td className="usertable-td">{user.email}</td>
                  <td className="usertable-td">{user.password}</td>
                  <td className="usertable-td">{user.phoneNumber}</td>
                  <td className="usertable-td">{user.birthDate}</td>
                  <td className="usertable-td">{user.role}</td>
                  <td className="usertable-td">
                    <div className="usertable-button-container">
                      <Link to={`/UpdateUser/${user.id}`} className="usertable-button-update">Update</Link>
                      <button onClick={() => handleDelete(user.id)} className="usertable-button-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
