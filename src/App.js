import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Intro from './components/Intro';
import './styles/global.css';

// A intro aparece uma vez por sessão e é pulada para quem prefere menos animação.
const shouldShowIntro = () => {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem('introSeen') !== '1';
  } catch {
    return true;
  }
};

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem('introSeen', '1');
    } catch {}
    setShowIntro(false);
  }, []);

  return (
    <Router>
      {showIntro && <Intro onFinish={finishIntro} />}
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
