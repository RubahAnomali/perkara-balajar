import { Project } from '../data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card" role="article" aria-labelledby={`project-${project.id}`}>
      <h3 id={`project-${project.id}`}>{project.name}</h3>
      <p className="desc">{project.description}</p>
      <ul className="tech-list" aria-label="Technologies used">
        {project.tech.map(t => <li key={t} className="tech">{t}</li>)}
      </ul>
      <div className="links">
        {project.repo && <a href={project.repo} target="_blank" rel="noopener noreferrer">Code ↗</a>}
        {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo ↗</a>}
      </div>
    </div>
  );
}
