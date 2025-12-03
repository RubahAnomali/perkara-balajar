import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'light' || saved === 'dark') ? (saved as 'light' | 'dark') : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <header className="site-header" role="banner">
      <div className="nav-inner">
        <div className="brand" aria-label="Site logo">Foxxy</div>
        <nav aria-label="Primary">
          <div className="nav-links">
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`}>{s.label}</a>
            ))}
          </div>
        </nav>
        <button className="button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? 'Light' : 'Dark'} mode
        </button>
      </div>
    </header>
  );
}
