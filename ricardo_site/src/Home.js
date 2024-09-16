import React from "react";
import "./styling/Home.css";

function Home() {
  return (
    <div className="home-container">
      <main className="home-content">
        <section className="home-section">
          <h2>Ricardo's SSO Site</h2>
          <p>
            Hi, this is my SSO site. It is in the very earliest stages of development, so you might encounter bugs, poor styling, or missing features. Be patient, geez.
          </p>
        </section>
      </main>
    </div>
  );
}

export default Home;