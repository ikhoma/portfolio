import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Chelsea from './pages/cases/Chelsea';
import FIBA from './pages/cases/FIBA';
import Emagine from './pages/cases/Emagine';
import Jack from './pages/cases/Jack';

function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const scrollStorageKey = `scroll:${location.pathname}${location.search}${location.hash}`;

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = 'auto';
      };
    }
  }, []);

  useEffect(() => {
    const persistScrollPosition = () => {
      sessionStorage.setItem(
        scrollStorageKey,
        JSON.stringify({ x: window.scrollX, y: window.scrollY }),
      );
    };

    persistScrollPosition();
    window.addEventListener('scroll', persistScrollPosition, { passive: true });

    return () => {
      persistScrollPosition();
      window.removeEventListener('scroll', persistScrollPosition);
    };
  }, [scrollStorageKey]);

  useEffect(() => {
    if (navigationType === 'POP') {
      const savedPosition = sessionStorage.getItem(scrollStorageKey);

      if (savedPosition) {
        const { x, y } = JSON.parse(savedPosition) as { x: number; y: number };
        window.scrollTo(x, y);
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [location.key, navigationType, scrollStorageKey]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cases/chelsea" element={<Chelsea />} />
        <Route path="/cases/fiba" element={<FIBA />} />
        <Route path="/cases/emagine" element={<Emagine />} />
        <Route path="/cases/jack" element={<Jack />} />
      </Routes>
    </BrowserRouter>
  );
}
