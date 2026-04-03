interface Award {
  project: string;
  awards: string;
}

const awards: Award[] = [
  { project: 'Chelsea FC Website', awards: 'Webby Award' },
  { project: 'AS Roma Website', awards: 'IMA' },
  { project: 'World Rugby App', awards: 'IMA, Appy Awards' },
  { project: 'Borjomi — The Deepest Site', awards: 'The FWA, Awwwards, Cannes Lions' },
];

export default function AwardsCard() {
  return (
    <div
      className="w-full rounded-[40px] bg-[#2C2A26] p-8 flex flex-col justify-between"
      style={{ aspectRatio: '524/496' }}
    >
      <div
        className="inline-block self-start px-4 py-2 text-[13px] font-medium text-white rounded-[32px] mb-6"
        style={{
          background: 'rgba(0,0,0,0.35)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        Awards
      </div>

      <div className="flex flex-col gap-5 mt-auto">
        {awards.map((award) => (
          <div key={award.project} className="border-t border-white/10 pt-4">
            <p className="text-[16px] font-bold text-[#FCFCFC] mb-1">{award.project}</p>
            <p className="text-[13px] font-normal text-[#969593]">{award.awards}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
