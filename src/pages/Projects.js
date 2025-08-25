import React from 'react';
import '../styles/Projects.css';
import typingTestPhoto from '../assets/typing-test.png';
import valorantdle from '../assets/valorantdle.png';


const projects = [
  {
    title: 'Typing-test',
    description: 'Um site para treinar e testar o quão rápido e eficiente você consegue digitar um texto.',
    image: typingTestPhoto, 
    techStack: 'HTML, CSS e JS',
    url: 'https://typing-test-phi-puce.vercel.app/',
  },
  {
    title: 'Valorantdle',
    description: 'Inspirado em loldle.com. Nesse site você deve adivinhar qual é o personagem do jogo Valorant.',
    image: valorantdle, 
    techStack: 'React',
    url: 'https://valorantdle.vercel.app/',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2>Meus Projetos</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <a href={`${project.url}`} target="_blank" rel="noopener noreferrer">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
            </a>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <a href={`${project.url}`} target="_blank" rel="noopener noreferrer" className="link-project">
              <div className="project-details">
                <h4>Tecnologias Utilizadas:</h4>
                <p>{project.techStack}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
