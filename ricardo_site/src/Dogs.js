import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider } from '@open-web/react-sdk';
import './styling/Dogs.css';
import dog1 from './images/scootieFunny.jpg';
import dog2 from './images/stevieFunny.jpg';

function Dogs({ page }) {
  return (
    <HelmetProvider>
      <div className="dogs-container">
        <Helmet>
          <title>Wow I am on the dogs page</title>
          <meta property="og:title" content="Home Page Metadata" />
          <meta property="og:url" content="https://ricardo-sso.vercel.app/dogs" />
          <meta property="og:description" content="Page focused on the home page" />
          <meta property="og:url" content="https://ricardo-sso.vercel.app/dogs" />
          <meta property="og:image" content="https://hips.hearstapps.com/hmg-prod/images/walking-shih-tzu-royalty-free-image-1682309398.jpg?crop=0.66635xw:1xh;center,top&resize=980:*" />
          <meta property="article:tag" content="Cool" />
          <meta property="article:tag" content="Dumb" />
          <meta property="article:tag" content="Scary" />
        </Helmet>
        <main className="dogs-content">
          <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
          <section className="dogs-section">
            <h2>The Loyal and Loving Nature of Dogs</h2>
            <p>
              Dogs have been loyal companions to humans for thousands of years, earning the title of "man's best friend." Their unwavering loyalty, boundless energy, and affectionate nature make them one of the most beloved pets around the world. 
            </p>
            <img src={dog1} className="dog-image-left" />
            <p>
              Whether serving as family pets, working animals, or therapy dogs, their versatility and intelligence continue to impress.
            </p>
            <p>
              The bond between humans and dogs is unlike any other. From the moment a puppy enters a home, it becomes part of the family, offering unconditional love and companionship. Dogs have an incredible ability to sense human emotions, often providing comfort during times of stress or sadness.
            </p>
            <img src={dog2} className="dog-image-right" />
            <p>
              Their playful antics and joyful spirits bring happiness to those around them, reminding us of the simple pleasures in life. 
            </p>
            <p>
              Beyond companionship, dogs play vital roles in various professions. They serve as guide dogs for the visually impaired, search and rescue dogs, and even as sniffer dogs that help in detecting drugs, explosives, and other hazardous materials. Their keen sense of smell and strong work ethic make them indispensable in these fields.
            </p>
            <p>
              As our understanding of dogs deepens, so does our appreciation for their unique qualities. Each breed, from the tiniest Chihuahua to the largest Great Dane, has its own characteristics and traits, offering something special to dog lovers of all kinds. 
            </p>
          </section>
          <OpenWebProvider spotId='sp_5esW6NWZ'>
            <Conversation postId='Dogs' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`http://localhost:3000/dogs`} />
          </OpenWebProvider>
          <div data-spotim-module="pitc"></div>
        </main>
      </div>
    </HelmetProvider>
  );
}

export default Dogs;
