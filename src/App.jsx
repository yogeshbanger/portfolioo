import React from 'react'
import {Route,Routes ,BrowserRouter} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Resume from './components/Resume.jsx'
import Personal from './components/Personal.jsx'
import Skills from './components/Skills.jsx'

import Project from './components/Project.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import {Helmet} from 'react-helmet-async'

export default function App() {
  return (
    <div>
        <Helmet>
        <title>Yogesh Banger | MERN Stack Developer</title>

        <meta
          name="description"
          content="Yogesh Banger is a MERN Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, responsive web development, and cyber security."
        />

        <meta
          name="keywords"
          content="Yogesh Banger, MERN Stack Developer, React Developer, Node.js, Express.js, MongoDB, JavaScript, Full Stack Developer, Portfolio"
        />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://yogeshbanger.vercel.app/" />

        <meta property="og:title" content="Yogesh Banger | MERN Stack Developer" />
        <meta
          property="og:description"
          content="Portfolio of Yogesh Banger showcasing MERN Stack projects and skills."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://yogeshbanger.vercel.app/images/yogesh-profile.webp" />
        <meta property="og:url" content="https://yogeshbanger.vercel.app/" />
      </Helmet>
      <BrowserRouter>
      <Navbar />
      <Home />
      <Contact/>
      <Resume />
      <Skills />
      <Project />
      <Personal />
      <Footer />
     </BrowserRouter>
    </div>
  )
}
