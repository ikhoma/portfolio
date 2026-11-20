import BackButton from '../../components/BackButton';
import Chip from '../../components/Chip';
import FooterCTA from '../../components/FooterCTA';
import {
  imgJackHero,
  imgJackDevices,
  imgJackBlue,
  imgJackPhone,
  imgJackServicerBar,
  imgJackSetupPanel,
  imgJackDesktop,
  imgJackContents,
  imgJackDarkPanel,
} from '../../assets/images';

const chips = [
  'User interface design', 'Design system', 'Personas',
  'User Flows', 'Jobs to be Done', 'Prototyping',
];

const personas = [
  {
    name: 'Customer',
    role: 'Property owner',
    bg: '#e3e8ef',
    textColor: '#1f1f1f',
    desc: 'A homeowner who needs to track maintenance, schedule services, and manage their property easily.',
  },
  {
    name: 'Family Member',
    role: "Owner's relative",
    bg: '#3b82f6',
    textColor: '#ffffff',
    desc: 'A family member who helps manage the home remotely and stays informed about property status.',
  },
  {
    name: 'Servicer',
    role: 'Private entrepreneur',
    bg: '#2651d0',
    textColor: '#ffffff',
    desc: 'An independent contractor who receives and manages job requests from homeowners.',
  },
  {
    name: 'Service Pro',
    role: 'Service company manager',
    bg: '#0b1b5b',
    textColor: '#ffffff',
    desc: 'A business managing multiple servicers and client relationships through the platform.',
  },
];

export default function Jack() {
  return (
    <div className="min-h-screen bg-white text-[#1f1f1f]">
      <BackButton />

      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '600px' }}>
        <img
          src={imgJackHero}
          alt="Jack of All Homes"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Device set */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[65vh]">
          <img src={imgJackDevices} alt="App devices" className="h-full object-contain" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-[60px] pb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {chips.map((c) => <Chip key={c} label={c} />)}
          </div>
          <h1
            className="text-[80px] font-bold text-[#FCFCFC] leading-none mb-4 max-w-[800px]"
            style={{ letterSpacing: '-3px' }}
          >
            Jack of All Homes<br />Management App
          </h1>
          <p className="text-[20px] font-medium text-[#3b82f6] max-w-[500px] leading-relaxed">
            Home management app for owners, family, servicers, and pros
          </p>
          <div className="flex gap-12 mt-8">
            {[
              { label: 'Client', value: 'Jack of All Homes' },
              { label: 'Domain', value: 'SaaS Real Estate' },
              { label: 'Year', value: '2022' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[12px] text-white/50 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-[16px] font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-[56px] font-bold text-[#1f1f1f] leading-none mb-0" style={{ letterSpacing: '-2px' }}>
              About
            </h2>
          </div>
          <div>
            <p className="text-[20px] font-normal text-[#1f1f1f] leading-relaxed mb-6">
              The Jack of All Homes app revolutionises the home improvement experience by connecting homeowners with trusted professionals, simplifying property management, and providing easy access to home maintenance services.
            </p>
            <p className="text-[15px] text-[#9e9e9e] leading-relaxed">
              From scheduling a repair to tracking your property inventory, the app handles every aspect of home ownership in one place.
            </p>
          </div>
        </div>
      </section>

      {/* Image gallery */}
      <section className="px-[60px] mb-6 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 rounded-[40px] overflow-hidden relative" style={{ height: '480px', background: '#c8daf8' }}>
            <img src={imgJackBlue} alt="" className="w-full h-full object-cover" />
            <div className="absolute right-8 bottom-0 h-[90%]">
              <img src={imgJackPhone} alt="App screen" className="h-full object-contain" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex-1 rounded-[40px] overflow-hidden" style={{ background: '#e3e8ef' }}>
              <img src={imgJackServicerBar} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Property Setup */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-[#1f1f1f] mb-6" style={{ letterSpacing: '-1px' }}>
              Property Setup
            </h2>
            <p className="text-[16px] text-[#9e9e9e] leading-relaxed">
              A streamlined onboarding flow that guides homeowners through setting up their property profile — capturing the information needed to connect them with the right services from day one.
            </p>
          </div>
          <div className="rounded-[40px] overflow-hidden" style={{ height: '440px', background: '#c8daf8' }}>
            <img src={imgJackSetupPanel} alt="Property Setup" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Personas */}
      <section className="px-[60px] py-20" style={{ background: '#f5f7fa' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[40px] font-bold text-[#1f1f1f] mb-12" style={{ letterSpacing: '-1px' }}>
            Personas
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {personas.map(({ name, role, bg, textColor, desc }) => (
              <div
                key={name}
                className="p-8 rounded-[40px] flex flex-col"
                style={{ background: bg, minHeight: '280px' }}
              >
                <h3
                  className="text-[24px] font-bold mb-1"
                  style={{ color: textColor }}
                >
                  {name}
                </h3>
                <p
                  className="text-[13px] mb-4"
                  style={{ color: textColor, opacity: 0.7 }}
                >
                  {role}
                </p>
                <p
                  className="text-[14px] leading-relaxed mt-auto"
                  style={{ color: textColor, opacity: 0.8 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Desktop — Service Pro */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <h2 className="text-[40px] font-bold text-[#1f1f1f] mb-8" style={{ letterSpacing: '-1px' }}>
          Service Pro — Desktop
        </h2>
        <div className="rounded-[40px] overflow-hidden" style={{ height: '500px' }}>
          <img src={imgJackDesktop} alt="Desktop app" className="w-full h-full object-cover" />
        </div>
        <p className="text-[16px] text-[#9e9e9e] mt-6 max-w-[600px]">
          Table view is the best option for administrative tasks — giving service companies full visibility over their team, clients, and active jobs.
        </p>
      </section>

      {/* Home Contents */}
      <section className="px-[60px] py-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[40px] font-bold text-[#1f1f1f] mb-6" style={{ letterSpacing: '-1px' }}>
              Home Contents Management
            </h2>
            <p className="text-[16px] text-[#9e9e9e] leading-relaxed">
              We've made it easy and quick to manage systems and appliances — track warranties, schedule maintenance, and get reminders before things break.
            </p>
          </div>
          <div>
            <div className="rounded-[40px] overflow-hidden mb-4" style={{ height: '240px' }}>
              <img src={imgJackContents} alt="Home Contents" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[40px] overflow-hidden" style={{ height: '240px', background: '#14148b' }}>
              <img src={imgJackDarkPanel} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* App links */}
      <section className="px-[60px] pb-20 max-w-[1400px] mx-auto">
        <div className="flex gap-4">
          <a
            href="https://apps.apple.com/us/app/jack-of-all-homes-house-car/id1600721271"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-[20px] text-[14px] font-medium text-[#1f1f1f] no-underline border border-[#1f1f1f]/20 hover:border-[#1f1f1f]/40 transition-colors"
          >
            App Store ↗
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.jackofallhomes.jackcustomer"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-[20px] text-[14px] font-medium text-[#1f1f1f] no-underline border border-[#1f1f1f]/20 hover:border-[#1f1f1f]/40 transition-colors"
          >
            Google Play ↗
          </a>
        </div>
      </section>

      <div style={{ background: '#101010' }}>
        <FooterCTA nextLabel="FIBA Mobile Apps" nextTo="/cases/fiba" />
      </div>
    </div>
  );
}
