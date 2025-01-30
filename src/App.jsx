import React from 'react';
import HeroSection from './dashbord/hero';
import "./index.css"
import { Header } from './dashbord/Header';
import Footer from './dashbord/Footer';
import Hero from './dashbord/HeroOg';
import EmergencyContactForm from './dashbord/emergencyContact';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <Header/>
      <HeroSection />
      <EmergencyContactForm />
      <Footer />
    </div>
  );
}

export default App;
