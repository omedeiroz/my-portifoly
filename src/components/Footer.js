import React from 'react';
import '../styles/Footer.css';

const Footer = () => {

  const linkedin = "https://www.linkedin.com/in/arthur-medeiros-7582a7290/"
  const github = "https://github.com/medeirosdevv"

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Arthur Medeiros. Todos os direitos reservados.</p>
        <ul className="footer-socials">
          <li>
            <a href={`${github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={`${linkedin}`} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
