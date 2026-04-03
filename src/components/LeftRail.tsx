import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { label: 'About me', to: '/about', external: false },
  {
    label: 'Download resume',
    to: 'https://drive.google.com/file/d/1S5gzhkGH7XrjGotsp0RGcC86gWjyT2ff/view?usp=sharing',
    external: true,
  },
  {
    label: 'LinkedIn',
    to: 'https://www.linkedin.com/in/ivan-khoma-22691871/',
    external: true,
  },
];

export default function LeftRail() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop left rail — fixed, 200px wide, starting at left:60px */}
      <aside style={{ position: 'fixed', top: 0, left: '60px', width: '200px', height: '100%', paddingTop: '60px', zIndex: 40, display: 'flex', flexDirection: 'column' }} className="hidden lg:flex">
        <NavLink to="/" className="no-underline">
          <p className="text-[20px] font-bold text-[#E8E8E8] leading-tight mb-1">Ivan Khoma</p>
          <p className="text-[14px] font-normal text-[#7F7F7F] leading-tight mb-8">Product Designer</p>
        </NavLink>

        <nav className="flex flex-col gap-4">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-normal text-[#969593] hover:text-[#FCFCFC] transition-colors no-underline"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `text-[14px] font-normal no-underline transition-colors ${
                    isActive ? 'text-[#FCFCFC]' : 'text-[#969593] hover:text-[#FCFCFC]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </nav>
      </aside>

      {/* Mobile top nav */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#101010]/90 backdrop-blur-sm border-b border-white/5">
        <NavLink to="/" className="no-underline">
          <p className="text-[16px] font-bold text-[#E8E8E8]">Ivan Khoma</p>
        </NavLink>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
        </button>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#101010]/95 backdrop-blur-sm flex flex-col items-start justify-center px-8 gap-6 pt-16">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-[24px] font-medium text-[#FCFCFC] no-underline"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.label}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-[24px] font-medium text-[#FCFCFC] no-underline"
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>
      )}
    </>
  );
}
