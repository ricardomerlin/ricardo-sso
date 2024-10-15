import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Robots from './Robots';
import Dogs from './Dogs';
import Food from './Food';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Page from './Page';
import Profile from './Profile';
import Debugging from './Debugging';
import './styling/App.css';
import { startTTH } from '@open-web/react-sdk';
import { logout } from '@open-web/react-sdk';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileOptions, setProfileOptions] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserToken = localStorage.getItem('userToken');
    if (storedUserToken) {
      setLoggedIn(true);
      setUser(JSON.parse(storedUserToken));
    } else {
      setLoggedIn(false);
      setUser(null);
    }

    document.addEventListener('spot-im-login-start', function (event) {
      console.log('spot-im-login-start event detected!');
      navigate('/login');
    });

    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOptions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('spot-im-login-start', () => {});
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleLogin = (value, userInfo) => {
    const userToken = JSON.stringify(userInfo);
    setLoggedIn(value);
    setUser(userInfo);
    localStorage.setItem('userToken', userToken);
    login(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
    setUser(null);
    logoutFromOw();
  };

  const login = (userToken) => {
    startTTH({ userToken, performBEDHandshakeCallback });
  };

  const logoutFromOw = () => {
    logout();
  };

  const checkLoading = (value) => {
    setLoading(value);
  };

  const performBEDHandshakeCallback = async (codeA) => {
    const res = await fetch(`https://ricardo-sso.vercel.app/start-handshake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code_a: codeA,
        userToken: JSON.parse(localStorage.getItem('userToken')),
      }),
    });
    const codeB = await res.text();
    return codeB;
  };

  console.log('USERTOKEN', localStorage.getItem('userToken'));

  const pages = ['Robots', 'Food', 'Dogs'];

  const mappedPageLinks = () => {
    return pages.map((page, index) => (
      <Link
        key={index}
        to={loading ? "#" : page}
        className={loading ? 'disabled-link' : ''}
        page={page}
      >
        {page}
      </Link>
    ));
  };

  const mappedPageRoutes = () => {
    return pages.map((page, index) => {
      let Component;
      switch (page) {
        case 'Robots':
          Component = Robots;
          break;
        case 'Dogs':
          Component = Dogs;
          break;
        case 'Food':
          Component = Food;
          break;
        default:
          Component = Page;
      }
      return <Route key={index} path={`/${page}`} element={<Component />} />;
    });
  };

  return (
    <>
      <header className="home-header">
        <h1>Welcome to Ricardo's SSO Site</h1>
      </header>
      <nav className="navbar">
        <Link to={loading ? "#" : "/"} className={loading ? 'disabled-link' : ''}>
          Home
        </Link>

        {mappedPageLinks()}

        <Link to={'/debugging'} className="debugging">Debugging</Link>

        {!loggedIn ? (
          <Link to={loading ? "#" : "/login"} className={loading ? 'disabled-link' : ''}>
            Login
          </Link>
        ) : (
          <>
            {profileOptions ? (
              <div ref={profileRef} className="profile-options">
                <Link to="/profile" className="profile-link">
                  Profile
                </Link>
                <Link to="#" className="profile-link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            ) : (
              <Link to="#" className="profile-link" onClick={() => setProfileOptions(true)}>
                Profile
              </Link>
            )}
          </>
        )}
      </nav>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {mappedPageRoutes()}
          <Route path="/login" element={<Login handleLogin={handleLogin} checkLoading={checkLoading} loading={loading} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/debugging" element={<Debugging />} />
        </Routes>
      </main>
    </>
  );
}

export default App;