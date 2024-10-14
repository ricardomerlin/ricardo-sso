import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import './styling/Food.css';
import dishImage1 from './images/burger.webp';
import dishImage2 from './images/pasta.jpg';

function Food() {

  return (
    <HelmetProvider>
      <div className="food-container">
        <Helmet>
          <title>Wow this is dumb!</title>
          <meta property="og:title" content="Food Page Metadata" />
          <meta property="og:url" content="https://ricardo-sso.vercel.app/food" />
          <meta property="og:description" content="Page focused on the food page" />
          <meta property="article:tag" content="Interesting" />
          <meta property="article:tag" content="What" />
          <meta property="article:tag" content="Cool" />
        </Helmet>
        <main className="food-content">
          <section className="food-section">
            <h2>The Joy and Diversity of Food</h2>
            <img src={dishImage1} alt="Delicious dish 1" className="food-image-right" />
            <p>
              Food is more than just sustenance; it is an experience that brings people together, a celebration of culture, and a form of creative expression. 
            </p>
            <p>
              Across the globe, food is an integral part of every society, reflecting traditions, history, and the environment. From the rich spices of Indian cuisine to the delicate flavors of Japanese sushi, the diversity of food is as vast as the world itself.
            </p>
            <img src={dishImage2} alt="Delicious dish 2" className="food-image-left" />
            <p>
              The joy of food lies in its ability to evoke memories, connect us with loved ones, and introduce us to new experiences.
            </p>
            <p>
              Whether it's a home-cooked meal shared with family, a street food adventure in a bustling city, or a fine dining experience in a renowned restaurant, food has the power to create lasting impressions and bring joy to our lives.
            </p>
            <p>
              As our understanding of nutrition evolves, so does our approach to food. Today, there is a growing emphasis on healthy eating, sustainability, and mindful consumption.
            </p>
          </section>
          <OpenWebProvider spotId='sp_5esW6NWZ'>
            <Conversation postId='Food' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/food`} />
          </OpenWebProvider>
          <div data-spotim-module="pitc"></div>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default Food;
