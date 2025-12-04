const skillGroups: { title: string; items: string[] }[] = [
  { title: 'Frontend', items: ['Ngelantur'] },
  { title: 'Backend', items: ['Bahasa Kalbu'] },
  { title: 'DevOps', items: ['Arknights'] },
  { title: 'Testing', items: ['Elden Ring'] },
];

function SkillsSection() {
  return (
    <section id="skills" className="section" aria-label="Skills">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skillGroups.map(g => (
          <div key={g.title} className="skill-group">
            <h4>{g.title}</h4>
            <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
