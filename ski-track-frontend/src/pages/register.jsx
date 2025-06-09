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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required!';
    if (!formData.lastName) newErrors.lastName = 'Last name is required!';
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
    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required!';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required!';
    } else if (!/^\d{8,15}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone must be 8-15 digits!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error. Please try again later.');
    }
  };

  return (
     <Layout>
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="register-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? 'register-input-error' : ''}
              placeholder="Name"
            />
            {errors.firstName && (
              <div className="register-error-message">{errors.firstName}</div>
            )}
          </div>

          {/* Last Name */}
          <div className="register-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? 'register-input-error' : ''}
              placeholder="LastName"
            />
            {errors.lastName && (
              <div className="register-error-message">{errors.lastName}</div>
            )}
          </div>

          {/* Email */}
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
            {errors.email && (
              <div className="register-error-message">{errors.email}</div>
            )}
          </div>

          {/* Password */}
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
            {errors.password && (
              <div className="register-error-message">{errors.password}</div>
            )}
          </div>

          {/* Confirm Password */}
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
              <div className="register-error-message">
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Birth Date */}
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
            {errors.birthDate && (
              <div className="register-error-message">{errors.birthDate}</div>
            )}
          </div>

          {/* Phone Number */}
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
              <div className="register-error-message">
                {errors.phoneNumber}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="register-btn">
            Register
          </button>

          {/* Link to Login */}
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
