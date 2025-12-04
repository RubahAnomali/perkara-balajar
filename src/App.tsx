import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LazySection from './components/LazySection';
import './styles/global.css';

// Lazy load non-critical sections
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <div className="portfolio-root">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
          <LazySection>
            <ProjectsSection />
          </LazySection>
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
          <LazySection>
            <AboutSection />
          </LazySection>
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
          <LazySection>
            <SkillsSection />
          </LazySection>
        </Suspense>
        <Suspense fallback={<div style={{ minHeight: '200px' }} />}>
          <LazySection>
            <ContactSection />
          </LazySection>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}
