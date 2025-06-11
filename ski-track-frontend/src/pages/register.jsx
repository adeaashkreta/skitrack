// src/pages/register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/register.css';
import Layout from '../components/Layout';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    phoneNumber: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors({});
    setServerError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required!';
    if (!formData.lastName.trim()) newErrors.lastName  = 'Last name is required!';
    if (!formData.email) {
      newErrors.email = 'Email is required!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email!';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required!';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters!';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password!';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match!';
    }
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required!';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required!';
    } else if (!/^\d{8,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone must be 8-15 digits!';
    }
    if (!formData.role) newErrors.role = 'Role is required!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ✔️ POST to the route that actually exists in your back-end:
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message) {
          setServerError(data.message);
          if (data.message.toLowerCase().includes('email')) {
            setErrors((prev) => ({ ...prev, email: data.message }));
          }
        } else {
          setServerError('Registration failed. Please try again.');
        }
        return;
      }

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setServerError('Server error. Please try again later.');
    }
  };

  return (
    <Layout>
      <div className="register-container">
        <div className="register-box">
          <h1>Register</h1>
          {serverError && <div className="register-error-message">{serverError}</div>}

          <form onSubmit={handleSubmit}>
            {/* FIRST NAME */}
            <div className="register-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'register-input-error' : ''}
                placeholder="First name"
              />
              {errors.firstName && <div className="register-error-message">{errors.firstName}</div>}
            </div>

            {/* LAST NAME */}
            <div className="register-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'register-input-error' : ''}
                placeholder="Last name"
              />
              {errors.lastName && <div className="register-error-message">{errors.lastName}</div>}
            </div>

            {/* EMAIL */}
            <div className="register-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'register-input-error' : ''}
                placeholder="you@example.com"
              />
              {errors.email && <div className="register-error-message">{errors.email}</div>}
            </div>

            {/* PASSWORD */}
            <div className="register-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'register-input-error' : ''}
                placeholder="Your secure password"
              />
              {errors.password && <div className="register-error-message">{errors.password}</div>}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="register-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'register-input-error' : ''}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <div className="register-error-message">{errors.confirmPassword}</div>
              )}
            </div>

            {/* BIRTH DATE */}
            <div className="register-form-group">
              <label htmlFor="birthDate">Birth Date</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={errors.birthDate ? 'register-input-error' : ''}
              />
              {errors.birthDate && <div className="register-error-message">{errors.birthDate}</div>}
            </div>

            {/* PHONE */}
            <div className="register-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={errors.phoneNumber ? 'register-input-error' : ''}
                placeholder="123456789"
              />
              {errors.phoneNumber && (
                <div className="register-error-message">{errors.phoneNumber}</div>
              )}
            </div>

            {/* ROLE */}
            <div className="register-form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'register-input-error' : ''}
              >
                <option value="">Select a role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <div className="register-error-message">{errors.role}</div>}
            </div>

            <button type="submit" className="register-btn">Register</button>

            <p className="register-login-text">
              Already have an account? <Link to="/login">Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
