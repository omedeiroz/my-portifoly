import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hero from './components/Hero';
import Skills from './components/Skills';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Hero />
        <Skills />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
