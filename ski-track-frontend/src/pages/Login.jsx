import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/login.css';  
import Layout from '../components/Layout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Please enter an email!');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email!');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Please enter a password!');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters!');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('role', data.user.role);
      localStorage.setItem('email', data.user.email);

      // Navigate based on role
      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPasswordError('Server error. Please try again later.');
    }
  };

  return (
    <Layout>
    <div className="loginPage-container">
      <div className="loginPage-box">
        <h1 className="loginPage-title">Log In</h1>
        <form onSubmit={handleSubmit} className="loginPage-form">
          <div className="loginPage-formGroup">
            <label htmlFor="email" className="loginPage-label">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`loginPage-input ${emailError ? 'loginPage-inputError' : ''}`}
              placeholder="you@example.com"
            />
            {emailError && <div className="loginPage-errorMessage">{emailError}</div>}
          </div>

          <div className="loginPage-formGroup">
            <label htmlFor="password" className="loginPage-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`loginPage-input ${passwordError ? 'loginPage-inputError' : ''}`}
              placeholder="Your secure password"
            />
            {passwordError && <div className="loginPage-errorMessage">{passwordError}</div>}
          </div>

          <div className="loginPage-formGroup loginPage-rememberMe">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>

          <button type="submit" className="loginPage-button">Log In</button>

          <p className="loginPage-registerText">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
    </Layout>
  );
};

export default Login;
