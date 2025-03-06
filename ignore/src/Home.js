import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./styling/Home.css";
import Scootie from './images/scootiePretty.jpg'

function Home() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Home</title>
        <meta property="og:title" content="Home Page Metadata" />
        <meta property="og:url" content="" />
        <meta property="og:description" content="Page focused on the home page" />
      </Helmet>
      <div>
        <main className="home-main">
          <section className="left-empty">
          </section>
          <section className="middle-home-section">
            <h3>Ricardo's SSO Site</h3>
            <p>
              Hi, this is my SSO site. It is in the very earliest stages of
              development, so you might encounter bugs, poor styling, or
              missing features. Be patient, geez.
            </p>
            <p>
              Ever wondered why SSO is important? Probably not, but I'll tell
              you anyway. It saves users from the nightmare of remembering too many
              passwords. This way, you can log in once and enjoy your time without
              worrying about whether your favorite dog's name (as your password) 
              has been compromised.
            </p>
            <p>
              Speaking of dogs, I love them. Here's a quick dog fact: Did you know
              that dogs have been our companions for over 14,000 years? That's longer
              than most people have stuck to any gym membership! Dogs are truly the
              best. And on this site, we celebrate both dogs and the beautiful
              technology that keeps your accounts safe.
            </p>
            <p>
              Thanks for stopping by. If you want to stay logged in, we've got you
              covered. Just be sure not to forget which dog-inspired password you used.
              More features coming soon... or not. I'm on dog-walking duty.
            </p>
          </section>
          <section className="right-ads">
            <p>This bar is where the ads will live. For now, a photo of my dog!</p>
            <img src={Scootie} className="home-image"/>

          </section>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default Home;