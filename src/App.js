import React, { useCallback, useState } from 'react';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import { About, Experience, Skills, Projects, Contact, Footer } from './components/Sections';
import './styles/site.css';

// A intro roda em todo carregamento da página, exceto para quem prefere menos animação.
const shouldShowIntro = () => {
  try {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return true;
  }
};

function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  const finishIntro = useCallback(() => setShowIntro(false), []);

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
