import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Conversation, OpenWebProvider, PopularInTheCommunity, Spotlight, Reactions, TopicTracker } from '@open-web/react-sdk';
import './styling/Dogs.css';

function Toys({ page }) {
  const user = JSON.parse(localStorage.getItem('user')); // Parse the user data

  const postUserData = async () => {
    if (user) {
      const postData = {
        authorName: user.displayName || 'Unknown User',
        postName: 'What kind of toys do you like?'
      };

      try {
        const response = await fetch('https://ricardo-sso.vercel.app/toys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });

        if (!response.ok) {
          console.error('Failed to post user data:', await response.text());
        } else {
          console.log('User data posted successfully.');
        }
      } catch (error) {
        console.error('Error posting user data:', error);
      }
    } else {
      console.log('No user data available.');
    }
  };

  useEffect(() => {
    postUserData(); // Automatically post user data on page load
  }, []);

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
        <script 
          async 
          src="https://launcher.spot.im/spot/sp_5esW6NWZ"
          data-spotim-module="spotim-launcher"
          data-seo-enabled="true">
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context":"https://schema.org",
            "@type":"DiscussionForumPosting",
            "@id":"https://ricardo-sso.vercel.app/Toys",
            "headline":"What kind of toys do you like?",
            "name": "What kind of toys do you like from the name?",
            "author": {
              "@type": "Person",
              "name": "haecceity123"
            },
            "interactionStatistic": {
              "@type": "InteractionCounter",
              "interactionType": "https://schema.org/CommentAction",
              "userInteractionCount": 25
            }
          })}
        </script>
      </Helmet>
      <OpenWebProvider spotId='sp_5esW6NWZ'>
        <main>
          <div className="dogs-container">
            <div data-openweb-ad="" data-row="1" data-column="1" data-page-type="independent_ad_hp"></div>
            <section className="dogs-section">
              <h1>What kind of toys do you like?</h1>
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
              <TopicTracker postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />
              <Spotlight className='spotlight'/>
              <PopularInTheCommunity postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />
            </section>
          </div>
          <Conversation postId='Toys' className='owConv' articleTags={['tag1','tag2','tag3']} postUrl={`https://ricardo-sso.vercel.app/toys`} />
          <Reactions isSidebar='true' postId='Toys' postUrl='https://ricardo-sso.vercel.app/toys' />
          <button onClick={postUserData} className="random-button">
            Post User Data
          </button>
        </main>
      </OpenWebProvider>
    </HelmetProvider>
  );
}

export default Toys;