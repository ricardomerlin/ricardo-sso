import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider, PopularInTheCommunity, Spotlight, Reactions, TopicTracker } from '@open-web/react-sdk';
import './styling/Cats.css';
import cat1 from './images/catFunny.avif';
import cat2 from './images/cuteCat1.jpeg';

function Cats({ loggedIn }) {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Cats</title>
        <meta property="og:title" content="Cats" />
        <meta property="og:url" content="https://ricardo-sso.vercel.app/cats" />
        <meta property="og:description" content="Page focused on cats" />
        <meta property="og:image" content="https://www.dailypaws.com/thmb/Yix7KXWpI3xRjBT6Sva00pYYFVk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/tiny-white-kitten-873941684-2000-0bac130389984aba9751de5e5e50d25f.jpg" />
        <meta property="article:tag" content="Feline" />
        <meta property="article:tag" content="Companion" />
        <meta property="article:tag" content="Animals" />
        <meta property="article:tag" content="Cats" />
        <meta property="article:author" content="Ricardo Merlin" />
      </Helmet>
      <OpenWebProvider spotId='sp_UXF0qHNN'>
        <main>
          <div className="cats-container">
            <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
            <section className="cats-section">
              <h2>The Independent and Playful Nature of Cats</h2>
              <p>
                Cats have charmed their way into human hearts for thousands of years, showcasing their playful spirit and unique personalities. Often regarded as mysterious creatures, their independent nature and affectionate behaviors make them beloved companions around the world.
              </p>
              <p>
                From household pets to revered symbols in various cultures, their elegance and grace captivate many.
              </p>
              <img src={cat1} className="cat-image-left" alt="Funny Cat" />
              <p>
                The bond between humans and cats can be quite profound. Many cat owners appreciate the quiet companionship they offer, with cats often curling up on laps or purring contentedly beside their humans. Their ability to sense moods makes them perfect companions during times of stress or loneliness.
              </p>
              <p>
                Cats exhibit a range of playful antics, from chasing laser pointers to pouncing on imaginary prey, providing endless entertainment. 
              </p>
              <p>
                Beyond their companionship, cats also play significant roles in various ecosystems. They help control rodent populations and contribute to maintaining ecological balance. Their agility and hunting instincts are traits that have been honed over thousands of years.
              </p>
              <img src={cat2} className="cat-image-right" alt="Funny Cat" />
              <p>
                Each cat has its distinct personality, from the energetic and curious to the laid-back and cuddly. Breeds like the Siamese are known for their vocal nature, while Persian cats are often appreciated for their calm demeanor. Understanding a cat’s behavior and preferences can enhance the owner-pet relationship.
              </p>
              <p>
                Cats can also foster social connections among their owners. Cat cafes and online communities create spaces where cat lovers can share stories, tips, and experiences, building friendships over their shared love for these creatures.
              </p>
              <p>
                For those living alone, cats can provide companionship and a sense of purpose. Their playful nature and affectionate moments can brighten up even the loneliest of days.
              </p>
              <p>
                While cats may sometimes seem aloof, their loyalty and love are evident. They teach us to appreciate quiet moments, the joys of play, and the beauty of independence.
              </p>
            </section>
            <section className='right-section'>
              {/* <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div> */}
              <TopicTracker postId='Cats' postUrl='https://ricardo-sso.vercel.app/cats' />;
              <Spotlight className='spotlight'/>
              <PopularInTheCommunity postId='Cats' postUrl='https://ricardo-sso.vercel.app/cats' />
            </section>
          </div>
          <Conversation postId='Cats' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`https://ricardo-sso.vercel.app/cats`} />
          <Reactions isSidebar='true' postId='Cats' postUrl='https://ricardo-sso.vercel.app/cats' />
        </main>
      </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Cats;
