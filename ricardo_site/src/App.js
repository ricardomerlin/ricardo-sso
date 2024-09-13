import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Robots from './Robots';
import Dogs from './Dogs';
import Food from './Food';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Page from './Page';
import './styling/App.css';
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import { startTTH } from '@open-web/react-sdk';
import { logout } from '@open-web/react-sdk';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState(['Robots', 'Food', 'Dogs']);
  const [selectedPage, setSelectedPage] = useState('');
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setUser(null);
    logoutFromOw();
  };

  const login = () => {
    const userToken = localStorage.getItem('token');
    startTTH({ userToken, performBEDHandshakeCallback });
  };
  
  const logoutFromOw = () => {
    logout();
  };

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

  const mappedPageLinks = () => {
    return pages.map((page, index) => (
      <Link key={index} to={page} page={page} onClick={() => switchCurrentPage(page)}>
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

  const switchCurrentPage = (value) => {
    setSelectedPage(value);
  };

  const goToNonArticle = () => {
    setSelectedPage(null);
  };

  return (
    <>
      <header className="home-header">
        <h1>Welcome to Ricardo's SSO Site</h1>
      </header>

      <nav className="navbar">
        <Link to="/" onClick={goToNonArticle}>Home</Link>
        {mappedPageLinks()}
        {!loggedIn ? <Link to="/login" onClick={goToNonArticle}>Login</Link> : <Link onClick={handleLogout}>Logout</Link>}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {mappedPageRoutes()}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {selectedPage ? 
        <OpenWebProvider spotId='sp_5esW6NWZ'>
          <Conversation postId={selectedPage} className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/${selectedPage}`} />
        </OpenWebProvider>
        :
        null
        }
      </main>
    </>
  );
}

export default App;
