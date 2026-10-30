import typingTest from './assets/typing-test.png';
import valorantdle from './assets/valorantdle.png';

// Todo o texto do site fica aqui, para editar sem mexer nos componentes.

export const links = {
  github: 'https://github.com/omedeiroz',
  linkedin: 'https://www.linkedin.com/in/arthur-medeiros-7582a7290/',
};

export const hero = {
  name: 'Arthur Medeiros',
  role: 'Analista de dados e desenvolvedor em Juiz de Fora.',
  summary:
    'Construo pipelines e rotinas de dados em SQL Server e desenvolvo aplicações web, do banco de dados até a interface.',
};

export const about = [
  'Trabalho com dados educacionais na Fundação CAEd, ligada à UFJF. No dia a dia, escrevo rotinas de ETL, migro bases entre sistemas e valido se os números batem do começo ao fim.',
  'Estudo Análise e Desenvolvimento de Sistemas na Faculdades Integradas Vianna Júnior. O que mais gosto é o back-end: modelar dados, escrever consultas e garantir que a informação chegue certa ao outro lado.',
];

export const facts = [
  { label: 'Onde', value: 'Juiz de Fora, MG' },
  { label: 'Trabalho', value: 'Fundação CAEd / UFJF' },
  { label: 'Formação', value: 'Análise e Desenvolvimento de Sistemas' },
];

export const experience = [
  {
    role: 'Analista de dados',
    org: 'Fundação CAEd / UFJF',
    period: 'Atual',
    description:
      'Desenvolvo pipelines e rotinas de ETL em SQL Server, conduzo migrações de dados e faço a validação e conciliação de bases educacionais, integrando dados de plataformas escolares estaduais.',
  },
  {
    role: 'Análise e Desenvolvimento de Sistemas',
    org: 'Faculdades Integradas Vianna Júnior',
    period: 'Em andamento',
    description: 'Graduação tecnológica com foco em desenvolvimento de software, banco de dados e engenharia de requisitos.',
  },
];

export const skills = [
  { area: 'Dados', items: ['SQL Server', 'T-SQL', 'ETL', 'Migração de dados', 'Validação e conciliação'] },
  { area: 'Back-end', items: ['Java', 'C#', 'Node.js'] },
  { area: 'Front-end e mobile', items: ['React', 'React Native', 'JavaScript', 'HTML', 'CSS'] },
];

export const projects = [
  {
    title: 'Typing-test',
    description: 'Site para treinar digitação e medir sua velocidade e precisão em um texto.',
    image: typingTest,
    stack: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://typing-test-phi-puce.vercel.app/',
  },
  {
    title: 'Valorantdle',
    description: 'Jogo de adivinhação diário inspirado no Loldle: descubra qual é o agente de Valorant a partir das dicas.',
    image: valorantdle,
    stack: ['React'],
    url: 'https://valorant-dle.vercel.app/',
  },
];
