import { useState } from 'react';
import "../assets/css/form.css";

export default function InsertUser() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phoneNumber: '', birthDate: '', role: ''
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/.test(form.firstName)) newErrors.firstName = 'Invalid first name';
    if (!/\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/.test(form.lastName)) newErrors.lastName = 'Invalid last name';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (form.password.length < 8 || form.password.length > 20) newErrors.password = 'Password must be between 8 and 20 characters';
    if (!/^\d{9}$/.test(form.phoneNumber)) newErrors.phoneNumber = 'Phone number must be exactly 9 digits';
    if (!form.birthDate) newErrors.birthDate = 'Birth date required';
    if (!form.role) newErrors.role = 'Role required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert('User inserted successfully');
        // Optionally clear form here if you want:
        // setForm({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', birthDate: '', role: '' });
      } else {
        const data = await res.json();
        setSubmitError(data.message || 'Failed to insert user');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('Network error, please try again later');
    }
  };

  return (
    <>
      <div className="insertuser-container">
        <div className="insertuser-form-box">
          <form onSubmit={handleSubmit}>
            <h1>Add a User</h1>

            {submitError && <div className="insertuser-error-message">{submitError}</div>}

            <div className="insertuser-input-group">
              <div className="insertuser-input-group-left">
                <div className="insertuser-input-field left">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={e => setForm({ ...form, firstName: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.firstName}</div>
                </div>

                <div className="insertuser-input-field left">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={e => setForm({ ...form, lastName: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.lastName}</div>
                </div>

                <div className="insertuser-input-field left">
                  <input
                    type="text"
                    placeholder="Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.email}</div>
                </div>

                <div className="insertuser-input-field left">
                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.password}</div>
                </div>
              </div>

              <div className="insertuser-input-group-right">
                <div className="insertuser-input-field right">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.phoneNumber}</div>
                </div>

                <div className="insertuser-input-field right">
                  <input
                    type="date"
                    placeholder="Birth Date"
                    value={form.birthDate}
                    onChange={e => setForm({ ...form, birthDate: e.target.value })}
                  />
                  <div className="insertuser-error-message">{errors.birthDate}</div>
                </div>

                <div className="insertuser-input-field right">
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="insertuser-error-message">{errors.role}</div>
                </div>
              </div>
            </div>

            <div className="insertuser-btn-group">
              <button type="submit" className="insertuser-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
