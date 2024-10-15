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
          <title>Food</title>
          <meta property="og:title" content="Food Page Metadata" />
          <meta property="og:url" content="https://ricardo-sso.vercel.app/food" />
          <meta property="og:description" content="Page focused on the food page" />
          <meta property="og:image" content="https://www.wholesomeyum.com/wp-content/uploads/2023/06/wholesomeyum-Best-Burger-Recipe-12.jpg" />
          <meta property="article:tag" content="Interesting" />
          <meta property="article:tag" content="What" />
          <meta property="article:tag" content="Cool" />
        </Helmet>
        <main className="food-content">
          <section className="food-section">
            <h2>The Joy and Diversity of Food</h2>
            <p>
              Food is more than just sustenance; it is an experience that brings people together, a celebration of culture, and a form of creative expression. Every dish tells a story, whether it's a family recipe passed down through generations or a new culinary innovation pushing the boundaries of flavor and technique. 
            </p>
            <img src={dishImage1} alt="Delicious dish 1" className="food-image-right" />
            <p>
              Across the globe, food is an integral part of every society, reflecting traditions, history, and the environment. From the rich spices of Indian cuisine to the delicate flavors of Japanese sushi, the diversity of food is as vast as the world itself. Each region boasts its own unique ingredients and cooking methods, influenced by geography, climate, and cultural exchanges over centuries.
            </p>
            <p>
              The way food brings people together is truly remarkable. A simple meal shared among friends can spark conversations, strengthen bonds, and create unforgettable memories. The act of cooking itself can be a form of meditation, allowing people to slow down, focus, and take joy in the process of creating something nourishing and delicious.
            </p>
            <p>
              The joy of food lies in its ability to evoke memories, connect us with loved ones, and introduce us to new experiences. For many, the smell of a familiar dish can transport them back to their childhood or remind them of a special person or moment in time. Food can also be a window into different cultures, allowing us to explore unfamiliar ingredients, techniques, and flavors without ever leaving the kitchen or dining table.
            </p>
            <p>
              Whether it's a home-cooked meal shared with family, a street food adventure in a bustling city, or a fine dining experience in a renowned restaurant, food has the power to create lasting impressions and bring joy to our lives. It’s not just about eating to survive; it’s about celebrating life, sharing experiences, and exploring the endless possibilities of flavors and textures that the world of food has to offer.
            </p>
            <img src={dishImage2} alt="Delicious dish 2" className="food-image-left" />
            <p>
              As our understanding of nutrition evolves, so does our approach to food. Today, there is a growing emphasis on healthy eating, sustainability, and mindful consumption. People are more conscious than ever about where their food comes from, how it is produced, and the impact it has on the planet. Farm-to-table movements, organic farming, and plant-based diets are just a few examples of how people are striving to make healthier and more ethical food choices.
            </p>
            <p>
              This shift towards mindful eating doesn’t mean sacrificing taste or enjoyment. In fact, many chefs and home cooks alike are finding creative ways to elevate plant-based dishes, incorporate sustainably sourced ingredients, and reduce food waste, all while maintaining the rich, vibrant flavors that make eating such a pleasure. 
            </p>
            <p>
              In the end, food is a universal language. It transcends borders and cultures, offering a way for people to connect, celebrate, and express themselves. Whether you're enjoying a simple meal at home or embarking on a culinary adventure in a foreign land, food has the power to unite us, nourish our bodies, and feed our souls.
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
