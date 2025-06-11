import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/css/form.css';

export default function UpdateUser() {
  const { id } = useParams();               // MongoDB ObjectId
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    role: ''
  });

  const [message, setMessage] = useState({ type: '', text: '' });

  /* ───────────────────────────────────────── */
  /* Fetch the selected user                   */
  /* ───────────────────────────────────────── */
  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('User not found');
        return res.json();
      })
      .then(data => setForm(data))
      .catch(() => setMessage({ type: 'error', text: 'Failed to fetch user' }));
  }, [id]);

  /* ───────────────────────────────────────── */
  /* Controlled input handler                 */
  /* ───────────────────────────────────────── */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  /* ───────────────────────────────────────── */
  /* Submit updated user                       */
  /* ───────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Update failed');
      }

      setMessage({ type: 'success', text: 'User updated successfully' });
      setTimeout(() => navigate('/UserTable'), 1200);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  /* ───────────────────────────────────────── */
  /* JSX                                       */
  /* ───────────────────────────────────────── */
  return (
    <div className="insertuser-container">
      <div className="insertuser-form-box">
        <form onSubmit={handleSubmit}>
          <h1>Update User</h1>

          {message.text && (
            <div
              className={
                message.type === 'success'
                  ? 'insertuser-success-message'
                  : 'insertuser-error-message'
              }>
              {message.text}
            </div>
          )}

          <div className="insertuser-input-group">
            {/* LEFT SIDE */}
            <div className="insertuser-input-group-left">
              {['firstName', 'lastName', 'email', 'password'].map((field) => (
                <div key={field} className="insertuser-input-field left">
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={form[field] || ''}
                    onChange={handleChange}
                    required={field !== 'password'}
                  />
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="insertuser-input-group-right">
              {['phoneNumber', 'birthDate', 'role'].map((field) => (
                <div key={field} className="insertuser-input-field right">
                  <input
                    type={field === 'birthDate' ? 'date' : 'text'}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={form[field] || ''}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="insertuser-btn-group">
            <button type="submit" className="insertuser-btn">
              Update
            </button>

            <button
              type="button"
              className="insertuser-btn"
              onClick={() => navigate('/UserTable')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
