import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styling/Home.css";

function Home() {
  return (
    <HelmetProvider>
      <div className="home-container">
        <Helmet>
          <title>This is the Home Page</title>
          <meta property="og:title" content="Home Page Metadata" />
          <meta property="og:url" content="www.google.com" />
          <meta property="og:description" content="Page focused on the home page" />
        </Helmet>
        <main className="home-content">
          <section className="home-section">
            <h3>Ricardo's SSO Site</h3>
            <p>
              Hi, this is my SSO site. It is in the very earliest stages of development, so you might encounter bugs, poor styling, or missing features. Be patient, geez.
            </p>
          </section>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default Home;