import LeftRail from '../components/LeftRail';
import {
  imgAboutHero,
  imgLogoUSGA,
  imgLogoPGA,
  imgLogoAsRoma,
  imgLogoBT,
  imgLogoBorjomi,
  imgLogoFoxSports,
  imgLogoAdidas,
} from '../assets/images';

interface Client {
  name: string;
  logo?: string;
}

const clients: Client[] = [
  { name: 'Chelsea FC' },
  { name: 'USGA', logo: imgLogoUSGA },
  { name: 'PGA Tour', logo: imgLogoPGA },
  { name: 'AS Roma', logo: imgLogoAsRoma },
  { name: 'CHL' },
  { name: 'BT', logo: imgLogoBT },
  { name: 'Borjomi', logo: imgLogoBorjomi },
  { name: 'Fox Sports', logo: imgLogoFoxSports },
  { name: 'NFL' },
  { name: 'Bayern Munich' },
  { name: 'FIS' },
  { name: 'NASCAR' },
  { name: 'Tuborg' },
  { name: 'Adidas', logo: imgLogoAdidas },
  { name: 'PocketBook' },
  { name: 'Concacaf' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#101010]">
      <LeftRail />

      <main style={{ paddingLeft: '276px', paddingRight: '60px', paddingTop: '60px', paddingBottom: '60px' }}>
        {/* Hero image */}
        <img
          src={imgAboutHero}
          alt="Ivan Khoma"
          className="w-full object-cover rounded-[40px] mb-12"
          style={{ height: 'clamp(280px, 40vw, 496px)' }}
        />

        {/* Bio */}
        <div className="max-w-[700px] mb-16">
          <h1
            className="text-[clamp(20px,2.5vw,28px)] font-bold text-[#F5F5F5] leading-tight mb-6"
            style={{ letterSpacing: '-0.5px' }}
          >
            My name is Ivan Khoma, I'm an interface and experience designer based in Kyiv.
          </h1>
          <p className="text-[16px] font-normal text-[#F5F5F5] leading-relaxed mb-4">
            I design digital products that are both functional and beautiful — with a focus on clarity, motion, and systems thinking. Over the past 10+ years I've led design for global sports brands, consumer apps, and enterprise platforms.
          </p>
          <p className="text-[16px] font-normal text-[#F5F5F5] leading-relaxed">
            My work spans from product strategy and UX research through interface design and design systems — always in close collaboration with engineering and product teams.
          </p>
        </div>

        {/* Featured Projects */}
        <section>
          <h2 className="text-[24px] font-bold text-[#F5F5F5] mb-8">Featured Projects</h2>

          <div className="grid grid-cols-4 gap-3">
            {clients.map(({ name, logo }) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-[16px] border border-white/10 px-3 py-4"
                style={{ minHeight: '70px' }}
              >
                {logo ? (
                  <img
                    src={logo}
                    alt={name}
                    className="max-h-8 max-w-full object-contain"
                    style={{ filter: 'brightness(0) invert(1) opacity(0.6)' }}
                  />
                ) : (
                  <span className="text-[12px] font-medium text-[#969593] text-center">{name}</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
