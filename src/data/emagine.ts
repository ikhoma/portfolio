import {
  imgEmaginePersonaAlex,
  imgEmaginePersonaThomas,
  imgEmaginePersonaMarta,
  imgEmagineAvatarConsultant,
  imgEmagineAvatarAgencyAdmin,
  imgEmagineAvatarAgencyUser,
  imgEmagineDashComplete,
  imgEmagineDashIncomplete,
  imgEmagineUsersPermissions,
  imgEmagineUsersPermMobile,
  imgEmagineJobList,
  imgEmagineJobListMobile,
} from '../assets/images';

export const personas = [
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

export const finalDesignStories = [
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

export const researchTableHeaders = [
  'Metric/Information',
  'Business Problem',
  'User Need',
  'Opportunities/Features',
];

export const researchTableRows = [
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

