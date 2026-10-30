import React, { useCallback, useState } from 'react';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import { About, Experience, Skills, Projects, Contact, Footer } from './components/Sections';
import './styles/site.css';

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
    <>
      {showIntro && <Intro onFinish={finishIntro} />}
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
