import { memo } from 'react';

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'About Me', href: '#about' },
  { label: 'Contact', href: '#contact' }
] as const;

function Header() {
  return (
    <header className="site-header" role="banner">
      <div className="nav-inner discord-nav-inner">
        <div className="brand discord-brand" aria-label="Site logo">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">Foxxy</span>
        </div>
        <nav className="discord-nav-links" aria-label="Primary">
          {navLinks.map(link => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
