import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import './styling/Debugging.css';
import noPK from './images/noPk.png'

function Debugging({  }) {



  return (
    <HelmetProvider>
      <Helmet>
        <title>Debugging</title>
      </Helmet>
      <div className="debugging-container">
        <h1>Debugging page</h1>
        <p>This page is intended to showcase some frequent SSO errors that support runs into</p>
        <ul>
          <li>
            <h1></h1>
          </li>
          <li className='error-listing'>
            <h1>Missing Primary Key</h1>
            <p>Use the following credentials to login:</p>
            <p>username: NPK</p>
            <p>password: npk</p>
            <p>In the console, you'll see a codeB returned to you, however, you'll see 'Complete endoing finished with success: false' as shown below:</p>
            <img src={noPK} className='noPK-image'/>
            <p>Explanation: Our system requires a primary key as the primary identifier for the user within the network. If a user does not have a primary key, the TTH process cannot complete itself.</p>
          </li>
        </ul>
        <h2 className='idk'>I'll add more soon. Patience!</h2>
      </div>
    </HelmetProvider>
  );
}

export default Debugging;