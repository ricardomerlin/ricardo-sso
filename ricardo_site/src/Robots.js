import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import "./styling/Robots.css";
import teslaBot from './images/teslarobot.webp';
import robotFace from './images/robot1.jpg';

function Robots() {
  return (
    <HelmetProvider>
      <div className="robots-container">
        <Helmet>
          <title>Robots page is where I currently am!</title>
          <meta property="og:title" content="Robots Page Metadata" />
          <meta property="og:url" content="https://ricardo-sso.vercel.app/robots" />
          <meta property="og:description" content="Page focused on the robots page" />
          <meta property="og:image" content="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/4fc938a4-9a44-40e7-8025-3973b0c07494/width=450//CUTE_ROBOTS_FLUX_e000005_01_20240917012227.jpeg" />
          <meta property="article:tag" content="Cool" />
          <meta property="article:tag" content="Dumb" />
          <meta property="article:tag" content="Amazing" />
        </Helmet>
        <main className="robots-content">
          <section className="robots-section">
            <h2>The Growing Role of Robots in Modern Society</h2>
            <p>
              In the ever-evolving landscape of technology, robots have become central to numerous industries, revolutionizing the way we approach tasks that range from the mundane to the highly complex. These mechanical marvels, designed with precision and ingenuity, possess capabilities that extend far beyond the human hand. 
            </p>
            <img src={robotFace} className="first-robot-image" />
            <p>
              From autonomous drones soaring through the skies to surgical robots performing delicate operations, robots have seamlessly integrated into our daily lives, enhancing efficiency and accuracy.
            </p>
            <p>
              As advancements in artificial intelligence continue to accelerate, robots are becoming increasingly sophisticated. They can learn from their environment, adapt to new situations, and even exhibit forms of artificial empathy, making them invaluable in sectors like healthcare, manufacturing, and exploration.
            </p>
            <p>
              The potential of robots is virtually limitless, promising a future where they will not only assist but also innovate alongside us, driving humanity towards new frontiers.
            </p>
            <p>
              While the fear of robots replacing human jobs persists, many argue that these machines are creating new opportunities, enabling people to focus on more creative and strategic endeavors. 
            </p>
            <div className="second-image-container">
              <img src={teslaBot} className="second-robot-image" />
            </div>
          </section>
          <OpenWebProvider spotId='sp_5esW6NWZ'>
            <Conversation postId='Robots' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/robots`} />
          </OpenWebProvider>
          <div data-spotim-module="pitc"></div>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default Robots;
