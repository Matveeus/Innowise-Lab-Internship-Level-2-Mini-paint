import React from 'react';
import Header from '../components/header/Header';
import WelcomeMessage from '../components/main-page/WelcomeMessage';
import Gallery from '../components/main-page/Gallery';

function Home() {
  return (
    <>
      <Header />
      <WelcomeMessage />
      <Gallery />
    </>
  );
}

export default Home;
