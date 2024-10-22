import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider, PopularInTheCommunity, Spotlight, Reactions, TopicTracker } from '@open-web/react-sdk';
import './styling/Dogs.css';
import dog1 from './images/scootieFunny.jpg';
import dog2 from './images/stevieFunny.jpg';

function Toys({ page }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Dogs</title>
        <meta property="og:title" content="Dogs" />
        <meta property="og:url" content="https://ricardo-sso.vercel.app/dogs" />
        <meta property="og:description" content="Page focused on the dogs page" />
        <meta property="og:image" content="https://hips.hearstapps.com/hmg-prod/images/walking-shih-tzu-royalty-free-image-1682309398.jpg?crop=0.66635xw:1xh;center,top&resize=980:*" />
        <meta property="article:tag" content="Kind" />
        <meta property="article:tag" content="Cute" />
        <meta property="article:tag" content="Action" />
        <meta property="article:tag" content="Figures" />
        <meta property="article:tag" content="Toys" />
        <meta property="article:author" content="Ricardo Merlin" />
      </Helmet>
      <OpenWebProvider spotId='sp_5esW6NWZ'>
        <main>
          <div className="dogs-container">
            <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
            <section className="dogs-section">
              <h2>The Loyal and Loving Nature of Toys</h2>
              <p>Explore the World of Imagination with Our Toy Collection!</p>

              <p>Unleash creativity and fun with our diverse range of toys designed for children of all ages! From cuddly plush animals to exciting action figures, each toy is crafted to inspire imaginative play and adventure.</p>

              <p><strong>Features:</strong></p>
              <ul>
                  <li><strong>Durable and Safe:</strong> Made with high-quality, non-toxic materials that ensure safety during playtime.</li>
                  <li><strong>Interactive Elements:</strong> Many toys come with lights, sounds, or movement features to engage and entertain.</li>
                  <li><strong>Educational Value:</strong> Encourage learning through play with toys that promote problem-solving, motor skills, and creativity.</li>
              </ul>

              <p><strong>Perfect for Every Occasion:</strong> Whether it's a birthday, holiday, or just because, our toys make the perfect gift! Watch as your child’s face lights up with joy and excitement.</p>

              <p><strong>Join the Adventure:</strong> With endless possibilities for play, our toys help create unforgettable memories. Explore our collection today and find the perfect companion for your child's adventures!</p>
            </section>
            <section className='right-section'>
              <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
              <TopicTracker postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />;
              <Spotlight className='spotlight'/>
              <PopularInTheCommunity postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />
            </section>
          </div>
          <Conversation postId='Toys' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`https://ricardo-sso.vercel.app/toys`} />
          <Reactions isSidebar='true' postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />
        </main>
        </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Toys;