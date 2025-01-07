import React, { useState, useEffect } from 'react';
import './styling/Login.css';
import { useNavigate, Link } from 'react-router-dom';

function Login({ handleLogin, checkLoading, loading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    checkLoading(true);
  };

  useEffect(() => {
    const loginAttempt = async () => {
      if (loading === true) {
        console.log('starting')
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
          const response = await fetch('https://ricardo-sso.onrender.com/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
          const data = await response.json();
          console.log('I AM ABOUT TO SET SOME TOKENS')
          if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            checkLoading(false);
            handleLogin(true, data.user);
            navigate('/');
          } else {
            alert('Login failed. Please check your credentials.');
            checkLoading(false);
          }
        } catch (error) {
          console.error('Error logging in:', error);
          alert('An error occurred during login. Please try again later.');
          checkLoading(false);
        }
      }
    };

    loginAttempt();
  }, [loading, username, password, navigate, handleLogin]);

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>

        {loading && <div className="spinner"></div>}

        <div className="signup-prompt">
          <p>Not a member? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;