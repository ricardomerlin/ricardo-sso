import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider, PopularInTheCommunity, Spotlight, Reactions, TopicTracker } from '@open-web/react-sdk';
import './styling/Dogs.css';
import dog1 from './images/scootieFunny.jpg';
import dog2 from './images/stevieFunny.jpg';

function Dogs({ loggedIn }) {

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dogs</title>
        <meta property="og:title" content="Dogs" />
        <meta property="og:url" content="https://ricardo-sso.vercel.app/dogs" />
        <meta property="og:description" content="Page focused on the dogs page" />
        <meta property="og:image" content="https://hips.hearstapps.com/hmg-prod/images/walking-shih-tzu-royalty-free-image-1682309398.jpg?crop=0.66635xw:1xh;center,top&resize=980:*" />
        <meta property="article:tag" content="Kind" />
        <meta property="article:tag" content="Companion" />
        <meta property="article:tag" content="Animals" />
        <meta property="article:tag" content="Veterinary" />
        <meta property="article:tag" content="Dogs" />
        <meta property="article:author" content="Ricardo Merlin" />
        <meta name="spotim-ads" content="disable-all" />
      </Helmet>
      <OpenWebProvider spotId='sp_UXF0qHNN'>
        <main>
          <div className="dogs-container">
            <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
            <section className="dogs-section">
              <h2>The Loyal and Loving Nature of Dogs</h2>
              <p>
                Dogs have been loyal companions to humans for thousands of years, earning the title of "man's best friend." Their unwavering loyalty, boundless energy, and affectionate nature make them one of the most beloved pets around the world. 
              </p>
              <p>
                Whether serving as family pets, working animals, or therapy dogs, their versatility and intelligence continue to impress.
              </p>
              <img src={dog1} className="dog-image-left" />
              <p>
                The bond between humans and dogs is unlike any other. From the moment a puppy enters a home, it becomes part of the family, offering unconditional love and companionship. Dogs have an incredible ability to sense human emotions, often providing comfort during times of stress or sadness.
              </p>
              <p>
                Their playful antics and joyful spirits bring happiness to those around them, reminding us of the simple pleasures in life. 
              </p>
              <p>
                Beyond companionship, dogs play vital roles in various professions. They serve as guide dogs for the visually impaired, search and rescue dogs, and even as sniffer dogs that help in detecting drugs, explosives, and other hazardous materials. Their keen sense of smell and strong work ethic make them indispensable in these fields.
              </p>
              <img src={dog2} className="dog-image-right" />
              <p>
                Dogs are known for their incredible loyalty, and some breeds are especially famous for this trait. The German Shepherd, for instance, is not only a beloved pet but also widely used in police and military work due to its intelligence and obedience. Meanwhile, breeds like the Golden Retriever and Labrador Retriever are often chosen as service dogs for their gentle nature and eagerness to please.
              </p>
              <p>
                Each dog has its unique personality, and their quirks can bring endless joy to their owners. Whether it's a Shih Tzu that loves to lounge on the couch or a Border Collie that needs constant mental stimulation, there is a dog for every lifestyle. Training is a crucial part of a dog's life, and while some breeds are more stubborn than others, the bond formed during this process can be incredibly rewarding.
              </p>
              <p>
                Dogs also have a remarkable ability to bring people together. Dog parks, walking trails, and pet-friendly cafes have become popular gathering spots for dog lovers. The shared love for these four-legged friends often sparks conversations, creating a sense of community among strangers.
              </p>
              <p>
                For those who live alone, dogs can provide a sense of purpose and routine. Taking them for daily walks, feeding them, and simply caring for them brings structure to the day. Their presence is also a great source of comfort, as they are always there to greet their owners with excitement and unconditional love after a long day.
              </p>
              <p>
                Despite the work and responsibility that comes with owning a dog, their companionship and loyalty more than make up for it. They teach us patience, kindness, and remind us to enjoy the little things in life.
              </p>
            </section>
            <section className='right-section'>
              <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
              <TopicTracker postId='Dogs' postUrl='https://ricardo-sso.vercel.app/dogs' />;
              <Spotlight className='spotlight'/>
              <PopularInTheCommunity postId='Dogs' postUrl='https://ricardo-sso.vercel.app/dogs' />
              <div data-spotim-module="messages-count" data-post-id="Dogs"></div>
            </section>
          </div>
          <Conversation postId='Dogs' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`https://ricardo-sso.vercel.app/dogs`} />
          <Reactions isSidebar='true' postId='Dogs' postUrl='https://ricardo-sso.vercel.app/dogs' />
        </main>
        </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Dogs;
