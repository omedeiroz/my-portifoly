import React from "react";
import '../styles/Skills.css';

const skills = [
    { name: 'Java', logo: 'https://cdn-icons-png.flaticon.com/512/226/226777.png', description: 'Dominância em desenvolvimento backend com Java.' },
    { name: 'React', logo: 'https://cdn-icons-png.flaticon.com/512/1126/1126012.png', description: 'Desenvolvimento de interfaces modernas com React.' },
    { name: 'React Native', logo: 'https://cdn-icons-png.flaticon.com/512/1183/1183672.png', description: 'Criação de apps mobile usando React Native.' },
    { name: 'C#', logo: 'https://cdn-icons-png.flaticon.com/512/6132/6132221.png', description: 'Desenvolvimento de aplicações usando C#.' },
    { name: 'JavaScript', logo: 'https://cdn-icons-png.flaticon.com/512/919/919828.png', description: 'Desenvolvimento frontend dinâmico com JS.' },
    { name: 'Node.js', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968322.png', description: 'Backend com alta performance usando Node.js.' },
    { name: 'HTML5', logo: 'https://cdn-icons-png.flaticon.com/512/919/919827.png', description: 'Estruturação de páginas web com HTML5.' },
    { name: 'CSS3', logo: 'https://cdn-icons-png.flaticon.com/512/919/919826.png', description: 'Estilização avançada de layouts com CSS3.' }
  ];
  
  const Skills = () => {
    return (
      <section className="skills-section">
        <h2>Linguagens de Dominância</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <img src={skill.logo} alt={`${skill.name} logo`} className="skill-logo" />
              <h3>{skill.name}</h3>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Skills;