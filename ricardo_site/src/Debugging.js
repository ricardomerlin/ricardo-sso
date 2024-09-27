import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import './styling/Debugging.css';

function Debugging({  }) {
  return (
    <HelmetProvider>
      <div className="debugging-container">
        <h1>Debugging page</h1>
      </div>
    </HelmetProvider>
  );
}

export default Debugging;