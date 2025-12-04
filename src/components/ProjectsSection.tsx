import { projects } from '../data/projects';
import ProjectCard from './ProjectCard';

function ProjectsSection() {
  return (
    <section id="projects" className="section" aria-label="Projects">
      <h2 className="section-title">Selected Projects</h2>
      <div className="projects-grid">
        {projects.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

export default ProjectsSection;
