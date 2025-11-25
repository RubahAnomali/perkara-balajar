import React from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export default function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="nav-inner">
        <div className="brand" aria-label="Site logo">YourName</div>
        <nav aria-label="Primary">
          <div className="nav-links">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}>{s.label}</a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
