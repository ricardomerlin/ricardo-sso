import React from "react";
import "./styling/Home.css";

function Home() {
  return (
    <div className="home-container">
      <main className="home-content">
        <section className="home-section">
          <h2>The Art and Science of Building Houses</h2>
          <p>
            Building a house is both an art and a science, blending creativity with engineering precision to create functional and aesthetically pleasing living spaces. From the initial design and planning phases to the final touches, each step in the construction process is crucial in shaping the final outcome.
          </p>
          <p>
            The journey begins with thoughtful design, where architects and designers collaborate to envision a structure that meets the needs and preferences of the future occupants. This phase involves creating detailed blueprints, selecting materials, and considering factors like layout, natural light, and energy efficiency.
          </p>
          <p>
            Once the design is finalized, construction begins. This phase involves a range of activities, from laying the foundation and framing the structure to installing plumbing, electrical systems, and finishing touches. Skilled tradespeople work meticulously to ensure that each aspect of the build adheres to high standards of quality and safety.
          </p>
          <p>
            The final result is a well-crafted home that not only serves as a place of refuge but also reflects the vision and effort invested in its creation. Building a house is a complex process that requires coordination, expertise, and a commitment to excellence, resulting in a space where families can create lasting memories and enjoy the comfort of their own home.
          </p>
        </section>
      </main>
      <footer className="home-footer">
        <p>© 2024 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;