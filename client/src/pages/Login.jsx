import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Create and use this for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5002/login', { email, password });
      localStorage.setItem('authToken', res.data.token);
      localStorage.setItem('username', res.data.username);
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-popup-overlay">
      <div className="login-popup-box">
        <h4 className="text-center mb-3">🔐 Sign In</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password:</label>
            <div className="input-group">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="text-end mb-2">
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => toast.info('Forgot password flow coming soon!')}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-2">
            <button className="btn btn-sm btn-outline-dark" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
