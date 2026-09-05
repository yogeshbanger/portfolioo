import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import AdminPanel from './components/AdminPanel.jsx';

function MainPortfolio() {
  return (
    <>
      <Navbar />
      <Home />
      <Contact />
      <Resume />
      <Skills />
      <Project />
      <Personal />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <div className="app-container">
        {/* All SEO Tags are injected cleanly from this component */}
        <SEO />
        
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<MainPortfolio />} />
          </Routes>
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}