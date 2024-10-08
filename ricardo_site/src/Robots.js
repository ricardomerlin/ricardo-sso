import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import "./styling/Robots.css";

function Robots() {
  return (
    <HelmetProvider>
      <div className="robots-container">
        <Helmet>
          <title>Robots page is where I currently am!</title>
          <meta property="og:title" content="Robots Page Metadata" />
          <meta property="og:url" content="http://localhost:3000/robots" />
          <meta property="og:description" content="Page focused on the robots page" />
          <meta property="article:tag" content="Cool" />
          <meta property="article:tag" content="Dumb" />
          <meta property="article:tag" content="Amazing" />
        </Helmet>
        <main className="robots-content">
          <section className="robots-section">
            <h2>The Growing Role of Robots in Modern Society</h2>
            <p>
              In the ever-evolving landscape of technology, robots have become central to numerous industries, revolutionizing the way we approach tasks that range from the mundane to the highly complex. These mechanical marvels, designed with precision and ingenuity, possess capabilities that extend far beyond the human hand. From autonomous drones soaring through the skies to surgical robots performing delicate operations, robots have seamlessly integrated into our daily lives, enhancing efficiency and accuracy.
            </p>
            <p>
              As advancements in artificial intelligence continue to accelerate, robots are becoming increasingly sophisticated. They can learn from their environment, adapt to new situations, and even exhibit forms of artificial empathy, making them invaluable in sectors like healthcare, manufacturing, and exploration. The potential of robots is virtually limitless, promising a future where they will not only assist but also innovate alongside us, driving humanity towards new frontiers.
            </p>
            <p>
              While the fear of robots replacing human jobs persists, many argue that these machines are creating new opportunities, enabling people to focus on more creative and strategic endeavors. As we stand on the cusp of a robotic renaissance, the relationship between humans and robots is one of collaboration, with each complementing the other’s strengths. The future of robots is not just about automation but about empowering humanity to achieve more than ever before.
            </p>
          </section>
          <div data-spotim-module="pitc" data-vertical-view="true"></div>
        </main>
      </div>
      <OpenWebProvider spotId='sp_5esW6NWZ'>
        <Conversation postId='Robots' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/food`} />
      </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Robots;
