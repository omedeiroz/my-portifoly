import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><a href="#about">Sobre</a></li>
          <li><a href="#projects">Projetos</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
