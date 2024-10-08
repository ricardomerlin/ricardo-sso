import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Robots from './Robots';
import Dogs from './Dogs';
import Food from './Food';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Page from './Page';
import Profile from './Profile'
import Debugging from './Debugging';
import './styling/App.css';
import { startTTH } from '@open-web/react-sdk';
import { logout } from '@open-web/react-sdk';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const [profileOptions, setProfileOptions] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      setLoggedIn(true);
      setUser(user);
    } else {
      setLoggedIn(false);
      setUser(null);
    }

    document.addEventListener('spot-im-login-start', function(event) {
      console.log('spot-im-login-start event detected!');
      navigate('/login');
    });

    return () => {
      document.removeEventListener('spot-im-login-start', () => {});
    };
  }, [navigate]);

  const handleLogin = (value, userInfo) => {
    setLoggedIn(value);
    setUser(userInfo);
    login();
  };

  const userToken = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
    logoutFromOw();
  };

  const login = () => {
    startTTH({ userToken, performBEDHandshakeCallback });
  };
  
  const logoutFromOw = () => {
    logout();
  };

  const checkLoading = (value) => {
    console.log(value)
    setLoading(value)
  }

  console.log(loading)

  const performBEDHandshakeCallback = async (codeA) => {
    const res = await fetch(`https://ricardo-sso.onrender.com/start-handshake`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code_a: codeA,
        userToken: JSON.parse(localStorage.getItem('user')),
      }),
    });
  
    const codeB = await res.text();
    return codeB;
  };


  const pages = ['Robots', 'Food', 'Dogs']

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
        <Link
          to={loading ? "#" : "/"}
          className={loading ? 'disabled-link' : ''}
        >
          Home
        </Link>
        
        {mappedPageLinks()}

        <Link
          to={'/debugging'}
          className='debugging'
        >Debugging</Link>
        
        {!loggedIn ? (
        <Link
          to={loading ? "#" : "/login"}
          className={loading ? 'disabled-link' : ''}
        >
          Login
        </Link>
      ) : (
        <>
          {profileOptions ? (
            <>
              <Link to="/profile" className="profile-link">
                Profile
              </Link>
              <Link 
              to={'#'}
              onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link
              to="#"
              className="profile-link"
              onClick={() => setProfileOptions(true)}
            >
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
          <Route path="/login" element={<Login handleLogin={handleLogin} checkLoading={checkLoading} loading={loading}/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/debugging" element={<Debugging />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
