import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import './styling/Debugging.css';

function Debugging({  }) {

  useEffect(() => {
    getSSOErrors()
  }, [])

  const getSSOErrors = () => {
    fetch('http://localhost:3001/sso_errors')
  }




  return (
    <HelmetProvider>
      <div className="debugging-container">
        <h1>Debugging page</h1>
        <p>This page is intended to showcase some frequent SSO errors that support runs into</p>
        <ul>
          <li>This is first</li>
          <li>This is second</li>
        </ul>
      </div>
    </HelmetProvider>
  );
}

export default Debugging;