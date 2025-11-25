export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  repo?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio Website',
    description: 'This website! Built with React, TypeScript, and Vite. Features a responsive layout, accessible navigation, and a contact form.',
    tech: ['React', 'TypeScript', 'Vite', 'CSS'],
    repo: 'https://github.com/youruser/portfolio',
    demo: 'https://your-portfolio-demo-link.com'
  }
];
