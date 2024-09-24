import React, { useState, useEffect } from 'react';
import '../styles/Hero.css';
import profilePicture from '../assets/foto_de_perfil.jpg'

const Hero = () => {
  const fullText = 'Arthur Medeiros\n Full-Stack Developer'; 
  const [text, setText] = useState(''); 
  const [index, setIndex] = useState(0); 
  const [isDeleting, setIsDeleting] = useState(false); 
  const [speed, setSpeed] = useState(150); 

  useEffect(() => {
    const type = () => {

      if (!isDeleting && index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
        setSpeed(150); 
      }

      else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000); 
      }

      else if (isDeleting && index > 0) {
        setText((prev) => prev.slice(0, -1)); 
        setIndex(index - 1);
        setSpeed(100); 
      }

      else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [index, isDeleting, speed, fullText]);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-image">
          <img src={profilePicture} alt="Arthur Medeiros" />
        </div>
        <h1 className="hero-name">
          {text}
          <span className="cursor">|</span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
