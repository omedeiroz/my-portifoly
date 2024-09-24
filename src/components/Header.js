import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li><Link to="#about">Sobre</Link></li>
          <li><Link to="#experience">Experiência</Link></li>
          <li><Link to="#projects">Projetos</Link></li>
          <li><Link to="#contact">Contato</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
