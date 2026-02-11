import { lazy, Suspense, ReactNode } from 'react';
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

// Simple LazySection component inline since we removed it from imports
import { useEffect, useRef, useState } from 'react';

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
