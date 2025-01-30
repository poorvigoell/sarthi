import React from 'react';
import HeroSection from './dashbord/hero';
import "./index.css"
import { Header } from './dashbord/Header';
import Footer from './dashbord/Footer';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
}

export default App;
