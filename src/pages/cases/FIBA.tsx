import BackButton from '../../components/BackButton';
import Chip from '../../components/Chip';
import FooterCTA from '../../components/FooterCTA';
import {
  imgFibaHero,
  imgFibaPhone,
  imgFibaAction1,
  imgFibaLogo,
  imgFibaBlue,
  imgFibaChallenge,
  imgFibaDesignSystem,
  imgFibaAds,
} from '../../assets/images';

const chips = [
  'Design leadership', 'Design system', 'User interface design',
  'Wireframing', 'Prototyping', 'App Template',
];

export default function FIBA() {
  return (
    <div className="min-h-screen bg-[#101010] text-white">
      <BackButton />

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        <img
          src={imgFibaHero}
          alt="FIBA"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/40 to-transparent" />

        {/* Phone mockup */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 h-[70vh]">
          <img src={imgFibaPhone} alt="FIBA App" className="h-full object-contain" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-[60px] pb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {chips.map((c) => <Chip key={c} label={c} />)}
          </div>
          <h1
            className="text-[80px] font-bold text-[#FCFCFC] leading-none mb-4 max-w-[900px]"
            style={{ letterSpacing: '-3px' }}
          >
            International<br />Basketball Federation
          </h1>
          <p className="text-[20px] font-medium text-[#969593] max-w-[600px] leading-relaxed">
            FIBA
          </p>
          <div className="flex gap-12 mt-8">
            {[
              { label: 'Client', value: 'FIBA' },
              { label: 'Domain', value: 'Sports' },
              { label: 'Year', value: '2021' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[12px] text-[#7F7F7F] uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[16px] font-medium text-[#FCFCFC]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[56px] font-bold text-white leading-none mb-0" style={{ letterSpacing: '-2px' }}>
              About
            </h2>
          </div>
          <div>
            <p className="text-[20px] font-normal text-[#FCFCFC] leading-relaxed mb-6">
              The FIBA app is a mobile application that serves as a comprehensive hub for basketball enthusiasts worldwide — covering live scores, standings, statistics, and video content across all FIBA competitions.
            </p>
            <p className="text-[14px] text-[#969593] leading-relaxed">
              FIBA is the world governing body for basketball, overseeing international competitions including the Basketball World Cup. The app serves millions of fans across 213 member federations.
            </p>
          </div>
        </div>
      </section>

      {/* Image grid */}
      <section className="px-[60px] mb-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-[40px] overflow-hidden" style={{ background: '#d70000', height: '400px' }}>
            <img src={imgFibaAction1} alt="" className="w-full h-full object-cover mix-blend-overlay opacity-80" />
          </div>
          <div className="rounded-[40px] overflow-hidden" style={{ background: '#1e1ec8', height: '400px' }}>
            <img src={imgFibaBlue} alt="" className="w-full h-full object-cover mix-blend-overlay opacity-70" />
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-white mb-6" style={{ letterSpacing: '-1px' }}>Challenge</h2>
            <p className="text-[20px] text-[#FCFCFC] leading-relaxed">
              The challenge was to expand the client's brand vision for various annual championships, enhancing fan engagement through personalised experiences while strategically placing ads to generate revenue.
            </p>
          </div>
          <div className="rounded-[40px] overflow-hidden" style={{ height: '400px' }}>
            <img src={imgFibaChallenge} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="px-[60px] py-20" style={{ background: '#1e1ec8' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[40px] font-bold text-white mb-6" style={{ letterSpacing: '-1px' }}>
                Design System
              </h2>
              <p className="text-[16px] text-white/70 leading-relaxed mb-6">
                A robust design system played a key role in organizing elements and establishing a versatile template for FIBA's mobile applications across all annual championships.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-[20px] bg-white/10">
                <span className="text-[32px] font-bold text-[#BDFF00]">−40%</span>
                <span className="text-[14px] text-white/70">screen delivery time</span>
              </div>
            </div>
            <div className="rounded-[40px] overflow-hidden" style={{ height: '360px' }}>
              <img src={imgFibaDesignSystem} alt="Design System" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FIBA logo + brand */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-8 mb-12">
          <img src={imgFibaLogo} alt="FIBA" className="h-16 object-contain" />
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-white mb-6" style={{ letterSpacing: '-1px' }}>
              Strategic Ad Placement
            </h2>
            <p className="text-[16px] text-[#969593] leading-relaxed">
              Integrating contextual advertising seamlessly within the fan experience — respecting content flow while maximising revenue opportunities for the federation.
            </p>
          </div>
          <div className="rounded-[40px] overflow-hidden" style={{ height: '360px' }}>
            <img src={imgFibaAds} alt="Ad placement" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* App store links */}
      <section className="px-[60px] pb-20 max-w-[1400px] mx-auto">
        <div className="flex gap-4">
          <a
            href="https://apps.apple.com/us/app/fiba-basketball-world-cup-2023/id1309578910"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-[20px] text-[14px] font-medium text-white no-underline border border-white/20 hover:border-white/40 transition-colors"
          >
            App Store ↗
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.fiba.worldcup&hl=en&gl=US"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-[20px] text-[14px] font-medium text-white no-underline border border-white/20 hover:border-white/40 transition-colors"
          >
            Google Play ↗
          </a>
        </div>
      </section>

      <FooterCTA nextLabel="Emagine Portals" nextTo="/cases/emagine" />
    </div>
  );
}
