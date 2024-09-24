import React from 'react';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
