import { Link } from 'react-router-dom';

interface FooterCTAProps {
  nextLabel: string;
  nextTo: string;
  phoneImage?: string;
}

export default function FooterCTA({ nextLabel, nextTo, phoneImage }: FooterCTAProps) {
  return (
    <footer
      className="relative mt-24 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 40%, #000 100%)',
        minHeight: '320px',
      }}
    >
      <div className="relative z-10 flex flex-col items-start justify-center px-[60px] py-16 max-w-[1400px] mx-auto">
        <p className="text-[13px] font-medium text-[#969593] uppercase tracking-widest mb-3">
          Watch next
        </p>
        <h2 className="text-[40px] font-bold text-white mb-8 leading-tight">{nextLabel}</h2>
        <div className="flex items-center gap-4">
          <Link
            to={nextTo}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[72px] text-[15px] font-bold text-black no-underline transition-opacity hover:opacity-90"
            style={{ background: '#D2FF50' }}
          >
            Watch
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H6M13 3V10"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span className="text-[13px] font-medium text-[#969593]">#productdesign</span>
        </div>
      </div>

      {phoneImage && (
        <img
          src={phoneImage}
          alt=""
          className="absolute right-[60px] bottom-0 h-[280px] object-contain pointer-events-none"
        />
      )}
    </footer>
  );
}
