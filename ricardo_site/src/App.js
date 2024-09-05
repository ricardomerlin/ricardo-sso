import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Robots from './Robots';
import Dogs from './Dogs';
import Food from './Food';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import './styling/App.css';
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import { startTTH } from '@open-web/react-sdk';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate()

  console.log(loggedIn);
  console.log(user);

  const handleLogin = (value, userInfo) => {
    setLoggedIn(value);
    setUser(userInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setLoggedIn(true);
      setUser(user);
    } else {
      setLoggedIn(false)
      setUser(null)
    }
  }, []);

  useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);



  return (
    <>
      <header className="home-header">
        <h1>Welcome to Ricardo's SSO Site</h1>
      </header>

      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/robots">Robots</Link>
        <Link to="/food">Food</Link>
        <Link to="/dogs">Dogs</Link>
        {!loggedIn ? <Link to="/login">Login</Link> : <Link onClick={handleLogout}>Logout</Link>}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/robots" element={<Robots />} />
          <Route path="/food" element={<Food />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
        <OpenWebProvider spotId='sp_5esW6NWZ'>
          <Conversation postId='food' articleTags={['tag1','tag2','tag3']} postUrl='http://localhost:3000/food' />
          {/* <Conversation postId='example2' articleTags={['tag1','tag2','tag3']} postUrl='http://localhost:3000/food' /> */}
        </OpenWebProvider>
      <footer>
        <p>© 2024 My Website. All rights reserved. Chicken McNuggets.</p>
      </footer>
    </>
  );
}

export default App;