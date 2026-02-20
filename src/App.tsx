import { lazy, Suspense, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components';
import Hero from './components/Hero';
import { SchemaScripts } from './components/ui';
import './styles/global.css';

const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const AboutSection = lazy(() => import('./components/AboutSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Footer = lazy(() => import('./components/Footer'));

const SectionFallback = () => <div style={{ minHeight: '200px' }} />;

interface LazySectionWrapperProps {
  children: ReactNode;
}

const LazySectionWrapper = ({ children }: LazySectionWrapperProps) => (
  <Suspense fallback={<SectionFallback />}>
    <LazySection>{children}</LazySection>
  </Suspense>
);

function LazySection({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? children : null}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function HomePage() {
  return <Portfolio />;
}

function Portfolio() {
  // Use useLayoutEffect to scroll before browser paints
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    // Additional scroll reset after render
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Remove any hash from URL that might cause scroll
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Enable smooth scroll after initial load
    setTimeout(() => {
      document.documentElement.classList.add('loaded');
    }, 100);
  }, []);

  return (
    <div className="portfolio-root">
      <SchemaScripts />
      <Header />
      <main id="main" className="discord-home">
        <Hero />
        <LazySectionWrapper>
          <ProjectsSection />
        </LazySectionWrapper>
        <LazySectionWrapper>
          <SkillsSection />
        </LazySectionWrapper>
        <LazySectionWrapper>
          <AboutSection />
        </LazySectionWrapper>
        <LazySectionWrapper>
          <ContactSection />
        </LazySectionWrapper>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}