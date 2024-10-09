import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import './styling/Food.css';

function Food() {

  return (
    <HelmetProvider>
      <div className="food-container">
        <Helmet>
          <title>Wow this is dumb!</title>
          <meta property="og:title" content="Food Page Metadata" />
          <meta property="og:url" content="http://localhost:3000/food" />
          <meta property="og:description" content="Page focused on the food page" />
          <meta property="article:tag" content="Interesting" />
          <meta property="article:tag" content="What" />
          <meta property="article:tag" content="Cool" />
        </Helmet>
        <main className="food-content">
          <section className="food-section">
            <h2>The Joy and Diversity of Food</h2>
            <p>
              Food is more than just sustenance; it is an experience that brings people together, a celebration of culture, and a form of creative expression. Across the globe, food is an integral part of every society, reflecting traditions, history, and the environment. From the rich spices of Indian cuisine to the delicate flavors of Japanese sushi, the diversity of food is as vast as the world itself.
            </p>
            <p>
              The joy of food lies in its ability to evoke memories, connect us with loved ones, and introduce us to new experiences. Whether it's a home-cooked meal shared with family, a street food adventure in a bustling city, or a fine dining experience in a renowned restaurant, food has the power to create lasting impressions and bring joy to our lives.
            </p>
            <p>
              As our understanding of nutrition evolves, so does our approach to food. Today, there is a growing emphasis on healthy eating, sustainability, and mindful consumption. People are becoming more aware of where their food comes from, how it is produced, and its impact on the environment. This awareness is leading to a shift towards organic, locally-sourced ingredients and plant-based diets, as well as a renewed appreciation for traditional cooking methods.
            </p>
            <p>
              Food is also a medium of creativity, where chefs and home cooks alike can experiment with flavors, textures, and presentations. The art of cooking and the pleasure of eating are universal, transcending language and borders. Whether you're a seasoned foodie or someone who simply enjoys a good meal, the world of food offers endless possibilities to explore, enjoy, and savor.
            </p>
          </section>
          <div data-spotim-module="pitc" data-vertical-view="true"></div>
        </main>
      </div>
      <OpenWebProvider spotId='sp_5esW6NWZ'>
        <Conversation postId='Food' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/food`} />
      </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Food;
