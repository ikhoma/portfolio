import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Chelsea from './pages/cases/Chelsea';
import FIBA from './pages/cases/FIBA';
import Emagine from './pages/cases/Emagine';
import Jack from './pages/cases/Jack';

export default function App() {
  return (
    <BrowserRouter>
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
