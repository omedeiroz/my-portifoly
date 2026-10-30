import React from 'react';
import { about, facts, experience, skills, projects, links } from '../content';

export const About = () => (
  <section className="section section--alt" id="sobre">
    <div className="section-inner about">
      <h2>Sobre</h2>
      <div className="about-body">
        {about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="facts">
        {facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export const Experience = () => (
  <section className="section" id="experiencia">
    <div className="section-inner">
      <h2>Experiência e formação</h2>
      <ol className="timeline">
        {experience.map((item) => (
          <li key={item.role}>
            <p className="timeline-period">{item.period}</p>
            <div>
              <h3>{item.role}</h3>
              <p className="timeline-org">{item.org}</p>
              <p>{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export const Skills = () => (
  <section className="section section--alt" id="habilidades">
    <div className="section-inner">
      <h2>Ferramentas</h2>
      <div className="skills">
        {skills.map((group) => (
          <div key={group.area}>
            <h3>{group.area}</h3>
            <ul>
              {group.items.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Projects = () => (
  <section className="section" id="projetos">
    <div className="section-inner">
      <h2>Projetos</h2>
      <div className="projects">
        {projects.map((p) => (
          <article className="project" key={p.title}>
            <a className="project-image" href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
              <img src={p.image} alt={`Tela do projeto ${p.title}`} loading="lazy" />
            </a>
            <div className="project-text">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <ul className="tags" aria-label="Tecnologias">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
                Abrir {p.title}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const Contact = () => (
  <section className="section section--alt contact" id="contato">
    <div className="section-inner">
      <h2>Vamos conversar</h2>
      <p>Tem um projeto, uma vaga ou uma ideia em mente? Me manda um e&#8209;mail ou me chama no LinkedIn.</p>
      <a className="contact-email" href={`mailto:${links.email}`}>
        {links.email}
      </a>
      <div className="hero-actions">
        <a className="button button--primary" href={`mailto:${links.email}`}>
          Enviar e-mail
        </a>
        <a className="button" href={links.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="button" href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </div>
  </section>
);

export const Footer = () => (
  <footer className="footer">
    <div className="section-inner footer-inner">
      <p>© {new Date().getFullYear()} Arthur Medeiros</p>
      <a href="#inicio">Voltar ao topo</a>
    </div>
  </footer>
);
