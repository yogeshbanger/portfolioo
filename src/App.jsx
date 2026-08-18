import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import SEO from './components/SEO.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Resume from './components/Resume.jsx';
import Personal from './components/Personal.jsx';
import Skills from './components/Skills.jsx';
import Project from './components/Project.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <HelmetProvider>
      <div className="app-container">
        {/* All SEO Tags are now injected cleanly from this component */}
        <SEO />
        
        <BrowserRouter>
          <Navbar />
          <Home />
          <Contact />
          <Resume />
          <Skills />
          <Project />
          <Personal />
          <Footer />
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}