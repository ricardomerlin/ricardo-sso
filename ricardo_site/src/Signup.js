import React, { useState } from 'react';
import './styling/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('handling submission')
    
    const newUser = {
      name: name,
      email: email,
      username: username,
      password: password,
      name: name,
      display_name: username,
      email_verified: false,
      image_url: imageURL,
      private_profile: false
    };

    console.log(newUser)

    try {
        console.log('trying! damn')
      const response = await fetch('https://ricardo-sso.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        console.log('response was ok')
        const createdUser = await response.json();
        console.log('User created:', createdUser);
        navigate('/login')
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageURL">Image URL</label>
            <input
              type="imageURL"
              id="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
      <div className="login-footer">
        <p>Already have an account? <a href="#">Log in</a></p>
      </div>
    </div>
  );
}

export default Signup;