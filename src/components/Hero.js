import React from 'react';
import profilePicture from '../assets/foto_de_perfil.jpg';
import { hero } from '../content';
import { pine, rnd } from './forest';

// Silhueta da floresta na base do hero, igual à da intro.
const W = 1440;
const H = 200;
const farTrees = [];
const nearTrees = [];
for (let i = 0; i < 30; i++) {
  const hgt = 110 + rnd(i, 2) * 80;
  farTrees.push(pine((i / 29) * W + (rnd(i, 1) - 0.5) * 40, H - 4, hgt, hgt * 0.55));
}
for (let i = 0; i < 18; i++) {
  const hgt = 70 + rnd(i, 4) * 60;
  nearTrees.push(pine((i / 17) * W + (rnd(i, 3) - 0.5) * 60, H + 4, hgt, hgt * 0.6));
}

const Hero = () => (
  <section className="hero" id="inicio">
    <div className="hero-inner">
      <div className="hero-text">
        <h1>{hero.name}</h1>
        <p className="hero-role">{hero.role}</p>
        <p className="hero-summary">{hero.summary}</p>
        <div className="hero-actions">
          <a className="button button--primary" href="#projetos">
            Ver projetos
          </a>
          <a className="button" href="#contato">
            Falar comigo
          </a>
        </div>
      </div>

      <div className="hero-portrait">
        <svg className="hero-rings" viewBox="-150 -150 300 300" aria-hidden="true">
          <circle r="148" />
          <circle r="126" />
          <circle r="104" />
          <g transform="translate(-96,-96) rotate(45)">
            <line x1="-120" y1="0" x2="-10" y2="0" stroke="#c9b48a" strokeWidth="2.4" />
            <path d="M0,0 L-14,-5 L-10,0 L-14,5 Z" fill="#d7dde0" />
            <path d="M-100,0 L-117,-8 L-123,-8 L-109,0 Z" fill="#b8412f" />
            <path d="M-100,0 L-117,8 L-123,8 L-109,0 Z" fill="#b8412f" />
          </g>
        </svg>
        <img src={profilePicture} alt="Foto de Arthur Medeiros" width="180" height="180" />
      </div>
    </div>

    <svg className="hero-forest" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d={farTrees.join(' ')} fill="#183427" />
      <path d={nearTrees.join(' ')} fill="#0b1913" />
    </svg>
  </section>
);

export default Hero;
