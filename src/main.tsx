import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initServiceWorker } from './lib';

// Force scroll to top immediately
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Disable browser scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Initialize PWA support
initServiceWorker();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
