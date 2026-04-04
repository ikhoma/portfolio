import { useState, useRef, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import {
  imgEmagineHeroBg,
  imgEmagineAboutDash,
  imgEmaginePortraitRight,
  imgEmagineProblemPhoto,
  imgEmagineImpactPhoto,
  imgEmaginePersonaAlex,
  imgEmaginePersonaThomas,
  imgEmaginePersonaMarta,
  imgEmagineUserTestingScreen,
  imgEmagineAvatarConsultant,
  imgEmagineAvatarAgencyAdmin,
  imgEmagineAvatarAgencyUser,
  imgEmagineDashComplete,
  imgEmagineDashIncomplete,
  imgEmagineUsersPermissions,
  imgEmagineUsersPermMobile,
  imgEmagineJobList,
  imgEmagineJobListMobile,
  imgEmagineExecDS1,
  imgEmagineExecQA,
  imgEmagineFooterPhone,
} from '../../assets/images';

const personas = [
  {
    name: 'Alex',
    role: 'IT Consultant',
    img: imgEmaginePersonaAlex,
    quote: '"I want to be considered for relevant roles without spending hours filling out forms — and I want to see that this actually helps me get hired."',
    desc: 'Experienced IT professionals using Emagine Portals to explore contract and long-term opportunities. They actively manage their own profiles, expect transparency in matching, and value efficiency, relevance, and control over how their skills and experience are presented.',
  },
  {
    name: 'Thomas',
    role: 'Agency Admin',
    img: imgEmaginePersonaThomas,
    quote: '"I want confidence that our candidates are represented accurately and that we can deliver fast, high-quality matches to clients."',
    desc: 'Oversees multiple recruiters, candidates, and client accounts. Focused on business results and compliance, with an emphasis on enabling recruiters to deliver consistent hiring outcomes at scale.',
  },
  {
    name: 'Marta',
    role: 'Agency Recruiter',
    img: imgEmaginePersonaMarta,
    quote: '"I need to quickly assess whether a candidate is ready to be submitted — and trust that the data is accurate."',
    desc: 'Day-to-day platform users responsible for creating, updating, and validating candidate profiles. They rely on structured data, match signals, and completeness indicators to shortlist and submit candidates efficiently.',
  },
];

const finalDesignStories = [
  {
    avatar: imgEmagineAvatarConsultant,
    preRole: 'As a ',
    role: 'Consultant',
    want: ' I want to quickly and easily keep profile data up to date and see most relevant jobs',
    desktopImg: imgEmagineDashComplete,
    mobileImg: imgEmagineDashIncomplete,
  },
  {
    avatar: imgEmagineAvatarAgencyAdmin,
    preRole: 'As an ',
    role: 'Agency Admin',
    want: ' I want to quickly review and manage Agency users and contracted Consultants',
    desktopImg: imgEmagineUsersPermissions,
    mobileImg: imgEmagineUsersPermMobile,
  },
  {
    avatar: imgEmagineAvatarAgencyUser,
    preRole: 'As an ',
    role: 'Agency User',
    want: ' I want to quickly and easily search for relevant jobs for my client Consultants',
    desktopImg: imgEmagineJobList,
    mobileImg: imgEmagineJobListMobile,
  },
];

const researchTableHeaders = [
  'Metric/Information',
  'Business Problem',
  'User Need',
  'Opportunities/Features',
];

const researchTableRows = [
  [
    [
      'High onboarding drop-off',
      '30–50% of users abandon onboarding during profile setup.',
      '75% churn in the first week due to friction.',
      'Each extra form field reduces completion by 5–7%.',
    ],
    [
      'Low activation rate.',
      'Half of the potential talent pool never completes onboarding, leading to a shrinking active user base and increased user acquisition costs.',
    ],
    [
      'B2C (candidates): Expect fast, frictionless onboarding with immediate benefit.',
      "B2B (HR agents): Need to quickly and effectively create and maintain client's profiles.",
    ],
    [
      'Streamlined onboarding using progressive disclosure.',
      'Use AI-assisted autofill to reduce manual entry by ~50%, increasing completion by ~30%.',
      'Show early value (job suggestions, insights) after just a few steps.',
    ],
  ],
  [
    [
      'Incomplete candidate profiles',
      '30–50% of users leave critical profile fields blank.',
      'Complete profiles boost match accuracy: 92.8% vs. 74.3%.',
      'Better matches improve long-term hire success by 34%.',
    ],
    [
      'Poor match quality.',
      'Incomplete data undermines recruiter trust and forces more manual work. Time-to-hire increases 2–3× and strong candidates get overlooked.',
    ],
    [
      "B2C: Need a reason to complete profiles – clear “what's in it for me”.",
      "B2B (HR agents): Need to quickly update and manage multiple client's profiles",
    ],
    [
      'Motivate profile completion.',
      'Use progress bars, checklists, and “profile strength” scores.',
      'Apply Zeigarnik + Endowed Progress effects to nudge action.',
      'Allow import from LinkedIn/resume and highlight benefits ("+27% visibility if filled").',
    ],
  ],
  [
    [
      'Lack of perceived early value leads to churn',
      '68% of users cite poor onboarding as reason for churn.',
      '89% will switch platforms after a bad UX.',
      'IT pros want transparency, relevance, and fast results.',
    ],
    [
      'Low retention.',
      'If users do not see value quickly, they disengage. This impacts both B2C (drop in activity) and B2B (less response to jobs), ultimately reducing platform growth and LTV.',
    ],
    [
      'B2C: Need instant confirmation that the platform works. Expect job matches, job notifications and control early.',
      'B2B (HR agents): Need active, engaged and reliable response rates from the Portals',
    ],
    [
      'Value-first onboarding.',
      'Show job matches, skill salary benchmarks, or profile visibility immediately.',
      'Add trust signals (verified profiles, testimonials, success cases).',
      'Maintain momentum with real-time feedback loops.',
    ],
  ],
  [
    [
      'Slow hiring processes',
      'Inefficient matching increases time-to-hire: 6–12 weeks vs. 2–4.',
      'Recruiters lose 20+ hrs/week due to poor data and filtering.',
    ],
    [
      'Extended time-to-hire and lower productivity.',
      'Recruiters waste time screening irrelevant or incomplete candidates. Slow matches increase dropouts, reduce fill rate, and frustrate clients.',
    ],
    [
      'B2C: Expect quick engagement and interview opportunities.',
      'B2B (HR agents): Want fast, confident shortlists. Seek job match indicators and match explainability.',
    ],
    [
      'Data-enhanced matching.',
      'Use AI/ML to improve job-candidate scoring.',
      'Add recruiter dashboards with profile completeness, verified skills, recent activity.',
    ],
  ],
];

function PersonasSlide() {
  return (
    <div
      className="grid gap-x-[32px] gap-y-[32px] h-[720px] p-[32px] shrink-0 w-[1280px]"
      style={{ background: '#494b44', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
    >
      {/* Col 1 — description */}
      <div className="flex flex-col gap-[16px] text-white col-start-1">
        <p className="text-[20px] font-bold leading-normal tracking-[-0.2px]">
          {'Understanding the needs\nof different user types'.split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
        <div className="text-[18px] leading-normal opacity-60">
          <p className="mb-[16px]">Portals have 3 types of users. Consultants, agency admins and agency users, each with different goals and jobs.</p>
          <p>These personas helped build empathy and prioritize features based on real user goals, ensuring that onboarding, data quality, and matching flows address actual user needs rather than assumptions.</p>
        </div>
      </div>

      {/* Col 2-4 — white card */}
      <div className="col-start-2 col-end-5 bg-[#fdfdfd] rounded-[24px] p-[40px] flex flex-col gap-[16px]">
        <p className="text-[32px] text-[#2d2e2a] leading-[32px] tracking-[-0.64px]">Who are our users?</p>
        <div className="flex gap-[32px] items-start">
          {personas.map(({ name, role, img, quote, desc }) => (
            <div key={name} className="flex-1 flex flex-col items-start">
              <p className="text-[14px] italic opacity-60 text-black leading-[18px] mb-3">{quote}</p>
              <div className="h-[240px] w-full flex items-center justify-center mb-3 overflow-hidden rounded-[12px]">
                <img src={img} alt={name} className="h-full w-full object-cover object-top" />
              </div>
              <p className="text-[20px] font-bold text-[#3b3c37] tracking-[-0.18px]">{name}</p>
              <p className="text-[14px] opacity-60 text-black mb-2">{role}</p>
              <p className="text-[14px] text-[#3b3c37] leading-[18px]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserTestingSlide() {
  return (
    <div
      className="grid gap-x-[32px] gap-y-[32px] h-[720px] p-[32px] shrink-0 w-[1280px] relative"
      style={{ background: '#494b44', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}
    >
      {/* Col 1 — description */}
      <div className="flex flex-col gap-[16px] text-white col-start-1">
        <p className="text-[20px] font-bold leading-normal tracking-[-0.2px]">User Testing</p>
        <div className="text-[18px] leading-normal opacity-60 flex flex-col gap-[16px]">
          <p>To validate onboarding efficiency, I conducted usability testing focused on measuring time-to-completion for the full profile setup.</p>
          <p>Using task-based scenarios and think-aloud protocol users completed onboarding without guidance. The sessions helped identify friction points, reduce perceived effort, and optimize the flow by simplifying inputs and improving system feedback.</p>
        </div>
      </div>

      <img
        src={imgEmagineUserTestingScreen}
        alt="User testing session"
        className="absolute rounded-[24px]"
        style={{ left: '344px', top: '32px', width: '904px', height: '656px' }}
      />
    </div>
  );
}

export default function Emagine() {
  const [slide, setSlide] = useState(0);
  const heroImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroImgRef.current) return;
      const offset = window.scrollY * 0.4;
      heroImgRef.current.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#3b3c37] text-white flex flex-col w-full">

      {/* ─── HERO ─── */}
      <div className="relative shrink-0 w-full" style={{ height: '1080px', minHeight: '640px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={heroImgRef}
            src={imgEmagineHeroBg}
            alt="Emagine Portals"
            className="absolute inset-0 w-full object-cover will-change-transform"
            style={{ height: '120%', top: '-10%' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{ backgroundImage: 'linear-gradient(-89.91deg, rgba(0,0,0,0) 56.5%, rgba(0,0,0,0.2) 102.5%)' }}
        />
        <div className="absolute flex flex-col gap-[24px]" style={{ left: '60px', top: '60px', right: '60px' }}>
          <div style={{ fontSize: '108px', lineHeight: '108px', letterSpacing: '-4.32px', color: '#fcfcfc', fontWeight: 'normal' }}>
            <p style={{ margin: 0 }}>Emagine Portals,</p>
            <p style={{ margin: 0 }}>HR Tech Platform</p>
          </div>
          {/* Chips — below title */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex gap-[8px]">
              {['Design system', 'UI design', 'UX Design'].map((c) => (
                <span
                  key={c}
                  className="px-[16px] py-[8px] rounded-[20px] text-[16px] font-medium text-[#fcfcfc] whitespace-nowrap"
                  style={{ border: '1px solid rgba(255,255,255,0.5)' }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="flex gap-[8px]">
              {['Interacton Design', 'Prototyping'].map((c) => (
                <span
                  key={c}
                  className="px-[16px] py-[8px] rounded-[20px] text-[16px] font-medium text-[#fcfcfc] whitespace-nowrap"
                  style={{ border: '1px solid rgba(255,255,255,0.5)' }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
        <BackButton />
      </div>

      {/* ─── CONTENT ─── */}
      <div className="px-[60px] flex flex-col gap-[16px] w-full" style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* About heading */}
        <div className="flex items-start w-full pt-[60px]">
          <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
            About
          </p>
        </div>

        {/* About body — 2 col */}
        <div className="flex gap-[32px] items-start pb-[40px] pt-[16px]">
          <p className="flex-1 text-white" style={{ fontSize: '32px', lineHeight: '40px', letterSpacing: '-0.32px', fontWeight: 'normal' }}>
            Portals is a B2B/B2C HR web platform that enables consultants and HR agencies to create, manage, and maintain structured professional profiles, which are then used by enterprises to match talent with relevant job opportunities.
          </p>
          <div className="flex flex-col items-start shrink-0" style={{ width: '628px' }}>
            <p className="text-white mb-[16px]" style={{ fontSize: '20px', fontWeight: 'normal' }}>My Role</p>
            <ul className="list-disc pl-5 flex flex-col gap-[4px]">
              {[
                'Full ownership of the design system',
                'UX owner of B2B part of the app, dashboards for both B2C/B2B',
                'Research, Prototyping, Usability Testing',
                'Design–engineering alignment',
                'Visual QA before releases',
                'Knowledge sharing and team enablement',
              ].map((item) => (
                <li key={item} className="text-[16px] leading-[20px] tracking-[-0.18px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* About images + Challenge combined */}
        <div className="flex gap-[16px] items-start pb-[80px]">
          {/* Left col */}
          <div className="flex flex-col gap-[40px] shrink-0" style={{ width: '632px' }}>
            {/* Dashboard image */}
            <div className="rounded-[40px] overflow-hidden shrink-0" style={{ height: '392px', background: '#201f14' }}>
              <img src={imgEmagineAboutDash} alt="Emagine dashboard" className="w-full h-full object-cover" style={{ objectPosition: '2.3% 6.63%' }} />
            </div>
            {/* Challenge */}
            <div className="flex flex-col gap-[16px]">
              <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
                Challenge
              </p>
              <div className="text-[16px] text-white leading-[24px]">
                <p className="mb-[16px]">When I joined the project, the platform faced several interconnected problems:</p>
                <ul className="list-disc mb-[16px] pl-6 flex flex-col gap-[4px]">
                  <li>Low profile completion led to poor job-matching relevance</li>
                  <li>Complex onboarding with low completion rates</li>
                  <li>Weak brand consistency, reducing user trust</li>
                  <li>Weak mobile experience</li>
                  <li>Fragmented UI built on inconsistent Material patterns</li>
                  <li>Slow UI delivery and high design–engineering friction</li>
                </ul>
                <p>These issues affected both user activation and business outcomes.</p>
              </div>
            </div>
          </div>
          {/* Right col — tall portrait */}
          <div className="flex-1 rounded-[40px] overflow-hidden shrink-0" style={{ height: '848px' }}>
            <img src={imgEmaginePortraitRight} alt="" className="w-full h-full object-cover" style={{ objectPosition: '-46.4% 0' }} />
          </div>
        </div>

        {/* Research */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
              Research
            </p>
            <div style={{ width: '622px' }}>
              <p className="text-[18px] text-white leading-normal tracking-[-0.18px]">
                Due to the absence of consistent historical product analytics, І used secondary research from HR Tech benchmarks, industry reports, and internal operational insights to define target activation and completion thresholds.
              </p>
            </div>
          </div>
          <div
            className="grid overflow-hidden rounded-[30px] bg-[#f8f8f6]"
            style={{
              width: '1280px',
              height: '744px',
              gridTemplateColumns: 'repeat(4, 320px)',
              gridTemplateRows: '62px 166px 184px 184px 148px',
            }}
          >
            {researchTableHeaders.map((header, index) => (
              <div
                key={header}
                className="border-[#d7d6cf] border-r border-b px-[20px] py-[20px]"
                style={{
                  borderRightWidth: index === researchTableHeaders.length - 1 ? 0 : '1px',
                }}
              >
                <p className="m-0 text-[14px] font-bold leading-[21px] text-[#6f706b]">{header}</p>
              </div>
            ))}

            {researchTableRows.flatMap((row, rowIndex) =>
              row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className="border-[#d7d6cf] border-r border-b px-[20px] py-[20px]"
                  style={{
                    borderRightWidth: cellIndex === row.length - 1 ? 0 : '1px',
                    borderBottomWidth: rowIndex === researchTableRows.length - 1 ? 0 : '1px',
                  }}
                >
                  {cell.map((line, lineIndex) => {
                    const isLead = cellIndex === 1 && lineIndex === 0;
                    return (
                      <p
                        key={line}
                        className="m-0 text-[14px] leading-[18px] text-[#4e4f4a]"
                        style={{ marginBottom: lineIndex === cell.length - 1 ? 0 : '4px' }}
                      >
                        {cellIndex === 0 && lineIndex > 0 ? <span>&bull; </span> : null}
                        <span style={{ fontWeight: isLead ? 700 : 400 }}>{line}</span>
                      </p>
                    );
                  })}
                </div>
              )),
            )}
          </div>
        </div>

        {/* Problem */}
        <div className="flex gap-[16px] items-start" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="flex-1 flex flex-col gap-[16px]">
            <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
              Problem
            </p>
            <p style={{ fontSize: '28px', lineHeight: '40px', letterSpacing: '-0.59px', margin: 0 }}>
              <span className="text-white">How might we </span>
              <span style={{ color: '#cdcdc9' }}>
                reduce early onboarding drop-off and improve сonsultants data completeness by enabling agency users and сonsultants to experience immediate, role-relevant value, so emagine can deliver higher-quality matches and faster hiring outcomes for its clients?
              </span>
            </p>
          </div>
          <div className="flex-1 rounded-[40px] overflow-hidden shrink-0" style={{ height: '392px' }}>
            <img src={imgEmagineProblemPhoto} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Process heading */}
        <div className="flex flex-col items-start">
          <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
            Process
          </p>
        </div>

        {/* Slider */}
        <div className="relative shrink-0" style={{ height: '804px', width: '1280px' }}>
          {/* Mask */}
          <div className="absolute overflow-hidden rounded-[50px]" style={{ top: 0, left: 0, height: '720px', width: '1280px' }}>
            <div
              className="flex items-center"
              style={{ transform: `translateX(-${slide * 1280}px)`, transition: 'transform 0.4s ease' }}
            >
              <PersonasSlide />
              <UserTestingSlide />
            </div>
          </div>
          {/* Nav buttons — outside mask at bottom */}
          <div className="absolute flex gap-[20px] items-center" style={{ top: '740px', left: 0 }}>
            <button
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={slide === 0}
              className="flex items-center justify-center rounded-[72px] disabled:opacity-40 transition-opacity"
              style={{ background: '#bdff00', padding: '20px', boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)' }}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => setSlide((s) => Math.min(1, s + 1))}
              disabled={slide === 1}
              className="flex items-center justify-center rounded-[72px] disabled:opacity-40 transition-opacity"
              style={{ background: '#bdff00', padding: '20px', boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)' }}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Final Design */}
        <div className="flex flex-col gap-[32px] shrink-0 w-full" style={{ paddingTop: '80px' }}>
          <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
            Final Design
          </p>
          <div className="flex flex-col gap-[64px]">
            {finalDesignStories.map(({ avatar, preRole, role, want, desktopImg, mobileImg }) => (
              <div key={role} className="flex flex-col gap-[32px]">
                {/* Story header — centered */}
                <div className="flex flex-col gap-[32px] items-center justify-center">
                  <img src={avatar} alt={role} className="rounded-full object-cover shrink-0" style={{ width: '108px', height: '108px' }} />
                  <p className="text-[20px] tracking-[-0.18px] whitespace-nowrap" style={{ margin: 0 }}>
                    <span style={{ color: '#a4a4a0' }}>{preRole}</span>
                    <span className="text-white">{role}</span>
                    <span style={{ color: '#a4a4a0' }}>{want}</span>
                  </p>
                </div>
                {/* Screenshot panel */}
                <div className="relative shrink-0 w-full" style={{ height: '675px' }}>
                  <div className="absolute inset-0 rounded-[40px]" style={{ background: '#494b44' }} />
                  <img
                    src={desktopImg}
                    alt={`${role} desktop`}
                    className="absolute rounded-[16px]"
                    style={{ left: '45px', top: '85px', height: '504px', width: '917px' }}
                  />
                  <img
                    src={mobileImg}
                    alt={`${role} mobile`}
                    className="absolute rounded-[16px]"
                    style={{ left: '1002px', top: '85px', height: '504px', width: '233px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Execution */}
        <div className="flex flex-col gap-[40px]">
          {/* DS subsection — needs relative wrapper for absolute screenshots */}
          <div className="flex flex-col items-end w-full">
            <div className="flex flex-col w-full relative" style={{ height: '1083.207px' }}>
              {/* Text */}
              <div className="flex flex-col gap-[32px] shrink-0" style={{ paddingTop: '80px', paddingBottom: '40px' }}>
                <p style={{ fontSize: '72px', lineHeight: '72px', color: '#d2ff50', letterSpacing: '-1.44px', fontWeight: 'normal', margin: 0 }}>
                  Execution
                </p>
                <div>
                  <p className="text-[20px] text-white mb-[24px]">Design System &amp; Front-end Modernisation</p>
                  <ul className="list-disc pl-5 flex flex-col gap-[4px]" style={{ color: '#a9a9a9' }}>
                    {[
                      'Rebuilt DS with full tokenization',
                      'Added dark mode, better reflecting emagine\'s brand identity',
                      '+70–80% design system adoption',
                      '35–50% faster UI delivery',
                      '~40% reduction in UI inconsistencies',
                    ].map((item) => (
                      <li key={item} className="text-[16px] leading-[24px]">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Dark panel */}
              <div
                className="relative rounded-[40px] shrink-0 w-full overflow-hidden"
                style={{ height: '675.207px', background: '#494a44' }}
              >
                <img
                  src={imgEmagineExecDS1}
                  alt="Design system screens"
                  className="absolute"
                  style={{ left: '11px', bottom: '0', width: '1269px', height: '624.414px' }}
                />
              </div>
            </div>
          </div>

          {/* QA subsection */}
          <div>
            <p className="text-[20px] text-white mb-[24px]">Quality &amp; Collaboration</p>
            <ul className="list-disc pl-5 flex flex-col gap-[4px]" style={{ color: '#a9a9a9' }}>
              {[
                'Performed deep visual QA pre-release',
                'Found and fixed 50+ UI issues (layout, accessibility, token usage)',
                'Provided developers with code-ready tokens and usage guidelines',
                'Led knowledge-sharing sessions on DS and AI-assisted workflows',
              ].map((item) => (
                <li key={item} className="text-[16px] leading-[24px]">{item}</li>
              ))}
            </ul>
          </div>
          {/* QA panel */}
          <div className="rounded-[40px] relative overflow-hidden shrink-0 w-full" style={{ height: '675px', background: '#494b44' }}>
            <img
              src={imgEmagineExecQA}
              alt="Quality & collaboration"
              className="absolute object-cover"
              style={{ left: '30px', top: '6.21px', width: '1250px', height: '650px' }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgba(70,72,67,0) 82%, rgba(70,72,67,0.2) 100%)' }}
            />
          </div>
        </div>

        {/* Impact */}
        <div className="flex flex-col gap-[40px]" style={{ paddingTop: '80px' }}>
          <div className="flex items-start w-full">
            <p style={{ fontSize: '80px', lineHeight: '80px', color: '#d2ff50', letterSpacing: '-1.6px', fontWeight: 'normal', margin: 0 }}>
              Impact
            </p>
          </div>
          <div className="flex gap-[40px] items-start">
            {/* Impact image */}
            <div className="flex-1 rounded-[40px] overflow-hidden shrink-0" style={{ height: '392px' }}>
              <img src={imgEmagineImpactPhoto} alt="Impact" className="w-full h-full object-cover" />
            </div>
            {/* Metrics */}
            <div className="flex flex-col gap-[32px] shrink-0" style={{ width: '620px' }}>
              {[
                { metric: '+22%', label: 'Activation Rate' },
                { metric: '+30%', label: 'Increase in High-Quality Profiles' },
                { metric: '+18%', label: 'Improvement in Match Relevance' },
                { metric: '-35%', label: 'Time to First Match' },
              ].map(({ metric, label }) => (
                <div key={label} className="flex flex-col items-start">
                  <p className="text-white" style={{ fontSize: '56px', lineHeight: '56px', letterSpacing: '-0.56px', margin: 0 }}>{metric}</p>
                  <p className="text-[16px] leading-[16px] tracking-[-0.5px]" style={{ color: '#a9a9a9', margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>{/* end content */}

      {/* ─── FOOTER ─── */}
      <div className="relative w-full shrink-0 mt-[80px]" style={{ minHeight: '400px' }}>
        <div
          className="px-[60px] py-[80px] flex flex-col gap-[80px]"
          style={{ backgroundImage: 'linear-gradient(-27.47deg, rgba(255,255,255,0) 82.97%, rgba(255,255,255,0.1) 100.71%), linear-gradient(-0.17deg, rgb(11,12,13) 1.11%, rgb(16,17,18) 76.14%, rgb(39,42,45) 99.65%)' }}
        >
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col">
              <p className="font-bold text-[#fcfcfc] leading-[112px] tracking-[-0.2px]" style={{ fontSize: '20px', margin: 0 }}>
                Watch next
              </p>
              <a href="/cases/chelsea" className="no-underline">
                <p className="text-[#fcfcfc] whitespace-nowrap" style={{ fontSize: '112px', lineHeight: '112px', letterSpacing: '-2px', fontWeight: 'normal', margin: 0 }}>
                  Chelsea FC App
                </p>
              </a>
            </div>
            <div>
              <a
                href="/cases/chelsea"
                className="inline-flex items-center justify-center no-underline font-bold"
                style={{ background: '#bdff00', color: '#181818', padding: '20px 28px', borderRadius: '72px', fontSize: '20px', boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)' }}
              >
                Watch
              </a>
            </div>
          </div>
          <p className="text-[20px] tracking-[-0.2px]" style={{ color: '#f0f0f0', opacity: 0.7, width: '200px', margin: 0 }}>
            #productdesign
          </p>
        </div>
        {/* Phone image — overlapping */}
        <img
          src={imgEmagineFooterPhone}
          alt=""
          className="absolute bottom-0 pointer-events-none"
          style={{ right: '60px', height: '531px' }}
        />
      </div>

    </div>
  );
}
