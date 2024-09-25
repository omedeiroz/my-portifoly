import React from 'react';
import About from './About';
import Projects from './Projects';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <About />
      <Projects />
    </div>
  );
};

export default Home;
