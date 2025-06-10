import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import Layout from '../components/Layout';
import api from '../api'; // update path to your api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await api.post('/auth/login', { email, password });

      // Save token and user info to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('email', res.data.user.email);

      // Navigate based on role
      if (res.data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <Layout>
      <div className="loginPage-container">
        <div className="loginPage-box">
          <h1 className="loginPage-title">Log In</h1>
          <form onSubmit={handleSubmit} className="loginPage-form">
            {error && <div className="loginPage-errorMessage">{error}</div>}
            <div className="loginPage-formGroup">
              <label htmlFor="email" className="loginPage-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="loginPage-input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="loginPage-formGroup">
              <label htmlFor="password" className="loginPage-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="loginPage-input"
                placeholder="Your secure password"
                required
              />
            </div>

            <div className="loginPage-formGroup loginPage-rememberMe">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>

            <button type="submit" className="loginPage-button">
              Log In
            </button>

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
