import React from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Experience from './components/Experience.jsx'
import Personal from './components/Personal.jsx'
import Skills from './components/Skills.jsx'
import Footer from './components/Fotter.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <Experience/>
      <Personal />
      <Skills />
      <Footer />
     
    </div>
  )
}
