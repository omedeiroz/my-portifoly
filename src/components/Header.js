import React from 'react';

const nav = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
];

const Header = () => (
  <header className="header">
    <div className="header-inner">
      <a className="header-name" href="#inicio">
        Arthur Medeiros
      </a>
      <nav aria-label="Seções">
        <ul>
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
