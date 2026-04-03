import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import {
  imgChelseaHeroBg,
  imgChelseaPhone1Frame,
  imgChelseaPhone1Screen,
  imgChelseaPhone2Frame,
  imgChelseaPhone2Screen,
  imgChelseaFCPhoto,
  imgChelseaPhone14Silver,
  imgChelseaSlide1,
  imgChelseaSlide2,
  imgChelseaSlide3,
  imgChelseaDarkHeader,
  imgChelseaProtoFollow,
  imgChelseaProtoWatch,
  imgChelseaProtoConnect,
  imgChelseaMatchPhone1,
  imgChelseaMatchPhone2,
  imgChelseaMatchPhone3,
  imgChelseaFooterPhone,
  imgChelseaIconLineChart,
  imgChelseaIconGoal,
  imgChelseaIconBrain,
} from '../../assets/images';

const slides = [imgChelseaSlide1, imgChelseaSlide2, imgChelseaSlide3];

export default function Chelsea() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => setCurrentSlide((s) => Math.max(0, s - 1));
  const nextSlide = () => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1));

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#101010]">
      <BackButton />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-black" style={{ height: '1080px' }}>
        <img
          src={imgChelseaHeroBg}
          alt="Chelsea FC Stadium"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
            opacity: 0.5,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        {/* Text block */}
        <div className="absolute flex flex-col gap-[24px]" style={{ left: '60px', top: '60px' }}>
          <p
            className="font-normal text-[#fcfcfc]"
            style={{
              fontSize: '112px',
              lineHeight: '112px',
              letterSpacing: '-4px',
              width: '988px',
            }}
          >
            Chelsea, The Fifth Stand App
          </p>
          <p
            className="font-normal text-[#fcfcfc]"
            style={{
              fontSize: '20px',
              lineHeight: '1.2',
              letterSpacing: '-0.2px',
              width: '294px',
            }}
          >
            Mobile product redesign focused on engagement, habit, and match-day experience.
          </p>
        </div>

        {/* Phone 2 — left, larger */}
        <div
          className="absolute"
          style={{ left: '208px', top: '294px', height: '667px', width: '632px' }}
        >
          <img
            src={imgChelseaPhone2Frame}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 2 }}
          />
          <img
            src={imgChelseaPhone2Screen}
            alt="Chelsea App"
            className="absolute w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        </div>

        {/* Phone 1 — right, smaller */}
        <div
          className="absolute"
          style={{ left: '801px', top: '256px', height: '693px', width: '287px' }}
        >
          <img
            src={imgChelseaPhone1Frame}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 2 }}
          />
          <img
            src={imgChelseaPhone1Screen}
            alt="Chelsea App"
            className="absolute w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        </div>
      </section>

      {/* ── About / Global Fan Engagement Platform ── */}
      <section className="relative overflow-hidden bg-[#f5f5f5]" style={{ height: '1100px' }}>
        {/* Chelsea FC photo — left, offset */}
        <div
          className="absolute rounded-[50px] overflow-hidden"
          style={{ left: '-196px', top: '80px', height: '825px', width: '1236px' }}
        >
          <img
            src={imgChelseaFCPhoto}
            alt="Chelsea FC"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 26%, rgba(0,0,0,0.5) 100%)',
            }}
          />
        </div>

        {/* iPhone 14 Pro Silver — overlapping photo */}
        <div
          className="absolute"
          style={{ left: 'calc(33.33% + 35px)', top: '328px', height: '877px', width: '571px' }}
        >
          <img
            src={imgChelseaPhone14Silver}
            alt="Chelsea App on iPhone"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* "Global Fan Engagement Platform" title */}
        <p
          className="absolute font-normal text-[#050608]"
          style={{
            left: 'calc(50% + 8px)',
            top: '80px',
            width: '652px',
            fontSize: '112px',
            lineHeight: '112px',
            letterSpacing: '-4.48px',
          }}
        >
          Global Fan Engagement Platform
        </p>

        {/* Project meta */}
        <div
          className="absolute flex flex-col gap-[4px] text-[20px]"
          style={{ left: 'calc(66.67% - 9px)', top: '520px' }}
        >
          <p className="font-bold leading-[1.2] text-[#050608]">Project</p>
          <p className="font-normal leading-[1.2] text-[#7f7f7f]">Client / Chelsea FC</p>
          <p className="font-normal leading-[1.2] text-[#7f7f7f]">Domain / Sports</p>
          <p className="font-normal leading-[1.2] text-[#7f7f7f]">Year / 2020</p>
        </div>

        {/* Description paragraphs */}
        <div
          className="absolute text-[20px] font-normal text-[#050608]"
          style={{
            left: 'calc(66.67% - 9px)',
            top: '700px',
            width: '416px',
            lineHeight: '1.2',
            letterSpacing: '-0.2px',
          }}
        >
          <p style={{ marginBottom: '24px' }}>
            The redesign of Chelsea FC's The 5th Stand focused on transforming a static news app
            into a content platform that unified fan experience, engagement insights, and business
            goals.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Grounded in fan research and analytics, the challenge was clear yet complex: create a
            product that feels emotional and also demonstrates impact through measurable results.
          </p>
          <p>
            Fans already loved the club; they needed a platform that recognized their passion and
            delivered relevant, personalized experiences.
          </p>
        </div>
      </section>

      {/* ── Research & Discovery ── */}
      <section className="bg-[#f5f5f5]" style={{ padding: '80px 60px' }}>
        <div className="w-[1280px]">
          {/* Divider */}
          <div className="w-full h-px bg-[#101010] mb-[48px]" />

          {/* Top row */}
          <div className="flex gap-[16px] items-end">
            {/* Left column */}
            <div className="flex-1 flex flex-col gap-[48px]">
              <div className="flex flex-col gap-[24px]">
                <p
                  className="font-bold text-[#101010]"
                  style={{ fontSize: '48px', lineHeight: '1', letterSpacing: '-0.48px' }}
                >
                  Research &amp; Discovery
                </p>
                <p
                  className="font-normal text-[#101010]"
                  style={{
                    fontSize: '20px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.4px',
                    width: '632px',
                  }}
                >
                  The goal was to discover what motivates fans to open the app and what keeps them
                  coming back
                </p>
              </div>
              <div className="flex flex-col gap-[12px]" style={{ width: '632px' }}>
                <p
                  className="font-bold text-[#101010]"
                  style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
                >
                  What we studied
                </p>
                <ul
                  className="list-disc font-normal text-[#101010]"
                  style={{
                    fontSize: '20px',
                    lineHeight: '1.2',
                    letterSpacing: '-0.2px',
                    paddingLeft: '30px',
                  }}
                >
                  <li style={{ marginBottom: '8px' }}>User behaviour around match days</li>
                  <li style={{ marginBottom: '8px' }}>Entry points and navigation patterns</li>
                  <li style={{ marginBottom: '8px' }}>Content consumption vs interaction</li>
                  <li>Timing and emotional states</li>
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="flex-1 flex flex-col gap-[12px]" style={{ height: '176px' }}>
              <p
                className="font-bold text-[#101010]"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                Key insight
              </p>
              <p
                className="font-normal text-[#101010]"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                Fans don't follow linear journeys — they jump between sections to build a mental
                model of the match.
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative mt-[48px]" style={{ height: '804px', width: '1280px' }}>
            {/* Slide mask */}
            <div
              className="absolute top-0 left-0 overflow-hidden bg-white"
              style={{ height: '720px', width: '1280px', borderRadius: '50px' }}
            >
              <div
                className="flex"
                style={{
                  transform: `translateX(-${currentSlide * 1280}px)`,
                  transition: 'transform 0.3s ease',
                }}
              >
                {slides.map((src, i) => (
                  <div key={i} className="shrink-0 relative" style={{ height: '720px', width: '1280px' }}>
                    <img
                      src={src}
                      alt={`Research slide ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="absolute flex gap-[20px]" style={{ top: '740px', left: 0 }}>
              <button
                onClick={prevSlide}
                className="flex items-center justify-center font-bold text-[#101010]"
                style={{
                  background: '#bdff00',
                  padding: '20px',
                  borderRadius: '72px',
                  boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)',
                  fontSize: '20px',
                  width: '64px',
                  height: '64px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ‹
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-center font-bold text-[#101010]"
                style={{
                  background: '#bdff00',
                  padding: '20px',
                  borderRadius: '72px',
                  boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)',
                  fontSize: '20px',
                  width: '64px',
                  height: '64px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Framing the Problem ── */}
      <section className="bg-[#f5f5f5]" style={{ padding: '80px 60px' }}>
        <div className="w-[1280px]">
          {/* Divider */}
          <div className="w-full h-px bg-[#101010] mb-[48px]" />

          <p
            className="font-bold text-[#101010] mb-[48px]"
            style={{ fontSize: '48px', lineHeight: '1', letterSpacing: '-0.48px' }}
          >
            Framing the Problem
          </p>

          <div className="flex gap-[48px] text-[#101010]" style={{ fontSize: '20px' }}>
            {/* Left — HMW */}
            <p className="font-normal" style={{ width: '632px', lineHeight: '1.2', letterSpacing: '-0.4px' }}>
              <span className="font-bold">How might we</span>
              {' design a mobile experience that sustains emotional proximity between fans and the club throughout the season, not just during matchday peaks?'}
            </p>

            {/* Right — Challenges & KPIs */}
            <div className="flex flex-col gap-[12px]" style={{ width: '632px' }}>
              <p className="font-bold" style={{ lineHeight: '1.4', letterSpacing: '-0.2px' }}>
                Challenges &amp; KPIs
              </p>
              <ul
                className="list-disc font-normal"
                style={{ lineHeight: '1.2', letterSpacing: '-0.2px', paddingLeft: '30px' }}
              >
                <li style={{ marginBottom: '8px' }}>Low motivation to register → ↑ activation</li>
                <li style={{ marginBottom: '8px' }}>Weak match-day experience → ↑ session duration</li>
                <li style={{ marginBottom: '8px' }}>No reason to return post-match → ↑ retention</li>
                <li style={{ marginBottom: '8px' }}>Fragmented navigation → ↓ time-to-content</li>
                <li>Lack of fan identity → ↑ community interactions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark Section ── */}
      <section
        className="relative"
        style={{
          background:
            'linear-gradient(0.54deg, rgb(11,12,13) 0.2%, rgb(16,17,18) 94.6%, rgb(42,44,47) 99.8%)',
        }}
      >
        {/* Decorative header overlay */}
        <div className="absolute top-0 left-0 right-0" style={{ height: '272px' }}>
          <img
            src={imgChelseaDarkHeader}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* 5b — Designing for Measurable Impact */}
        <div style={{ padding: '80px 60px 64px', paddingTop: '340px' }}>
          <div className="w-[1276px] flex items-start gap-[16px]">
            <div className="flex-1 flex flex-col gap-[32px]">
              <div className="flex gap-[24px] items-start">
                <p
                  className="font-bold text-[#fcfcfc] flex-1"
                  style={{ fontSize: '48px', lineHeight: '1', letterSpacing: '-0.48px', minWidth: '524px', maxWidth: '524px' }}
                >
                  Designing for{'\n'}Measurable Impact
                </p>
                <p
                  className="font-normal text-[#fcfcfc]"
                  style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.4px', width: '632px', flexShrink: 0 }}
                >
                  Using defined KPIs, we generated ideas that connect emotion with measurable
                  engagement.
                </p>
              </div>
              <div className="flex flex-col gap-[12px]" style={{ width: '632px', marginLeft: 'calc(524px + 16px)' }}>
                <p
                  className="font-bold text-[#fcfcfc]"
                  style={{ fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.2px' }}
                >
                  Key Concepts
                </p>
                <ul
                  className="list-disc font-normal text-[#fcfcfc]"
                  style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px', paddingLeft: '30px' }}
                >
                  <li style={{ marginBottom: '8px' }}>Onboarding "Join the Team" → clarify value, ↑ activation</li>
                  <li style={{ marginBottom: '8px' }}>Match-Day Live Hub → real-time interaction, ↑ session time</li>
                  <li style={{ marginBottom: '8px' }}>Match Prediction + Leaderboards → gamified loop, shareable results, ↑ retention &amp; organic reach</li>
                  <li style={{ marginBottom: '8px' }}>Video Access for Registered Users → exclusive content, ↑ registrations</li>
                  <li>Personalized Post-Match Feed → relevant content, ↑ loyalty</li>
                </ul>
              </div>
              <p
                className="font-normal text-[#fcfcfc]"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.4px', width: '632px', marginLeft: 'calc(524px + 16px)' }}
              >
                Each feature mapped to a KPI — turning insights into data-informed design decisions.
              </p>
            </div>
          </div>
        </div>

        {/* 5c — From Ideas to Interactive Flows */}
        <div style={{ padding: '80px 60px' }}>
          <div className="w-[1280px]">
            <div className="w-full h-px mb-[48px]" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div className="flex gap-[16px] items-start text-[#fcfcfc]">
              <div className="flex-1 flex flex-col gap-[48px]">
                <p
                  className="font-bold"
                  style={{ fontSize: '48px', lineHeight: '1', letterSpacing: '-0.96px', width: '524px' }}
                >
                  From Ideas to Interactive Flows
                </p>
                <div className="flex flex-col gap-[12px]" style={{ width: '632px' }}>
                  <p className="font-bold" style={{ fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.2px' }}>
                    Focus Areas
                  </p>
                  <ul
                    className="list-disc font-normal"
                    style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px', paddingLeft: '30px' }}
                  >
                    <li style={{ marginBottom: '8px' }}>Rebuilt information architecture → Consume · Participate · Belong</li>
                    <li style={{ marginBottom: '8px' }}>Created mid- to hi-fi prototypes across iOS, Android, and Web</li>
                    <li style={{ marginBottom: '8px' }}>Evaluated navigation clarity and hierarchy with internal team</li>
                    <li>Achieved +25% faster content access and fewer navigation errors</li>
                  </ul>
                </div>
              </div>
              <p
                className="flex-1 font-normal"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                We translated core concepts into testable prototypes to validate structure, clarity,
                and engagement paths.
              </p>
            </div>
          </div>
        </div>

        {/* 5d — Testing & Validation */}
        <div style={{ padding: '80px 60px' }}>
          <div className="w-[1280px]">
            <div className="w-full h-px mb-[48px]" style={{ background: 'rgba(255,255,255,0.2)' }} />
            <div className="flex gap-[16px] items-start text-[#fcfcfc]">
              <div className="flex-1 flex flex-col gap-[48px]">
                <p
                  className="font-bold"
                  style={{ fontSize: '48px', lineHeight: '1', letterSpacing: '-0.96px', width: '524px' }}
                >
                  Testing &amp; Validation
                </p>
                <div className="flex flex-col gap-[12px]" style={{ width: '632px' }}>
                  <p className="font-bold" style={{ fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.2px' }}>
                    Focus Areas
                  </p>
                  <ul
                    className="list-disc font-normal"
                    style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px', paddingLeft: '30px' }}
                  >
                    <li style={{ marginBottom: '8px' }}>Navigation paths and hierarchy comprehension</li>
                    <li style={{ marginBottom: '8px' }}>Onboarding clarity and visual priority</li>
                    <li style={{ marginBottom: '8px' }}>Cross-platform consistency (iOS · Android · Web)</li>
                    <li>Measured task completion and click accuracy → +25% faster access to key content</li>
                  </ul>
                </div>
              </div>
              <p
                className="flex-1 font-normal"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                We tested interactive prototypes within the product and dev teams to evaluate
                clarity and flow.
              </p>
            </div>
          </div>
        </div>

        {/* 5e — Three iPhone wireframes */}
        <div className="flex gap-[70px] justify-center" style={{ padding: '0 60px 80px' }}>
          {[
            { src: imgChelseaProtoFollow, label: '1.0 Follow' },
            { src: imgChelseaProtoWatch, label: '2.0 Watch' },
            { src: imgChelseaProtoConnect, label: '3.0 Connect' },
          ].map(({ src, label }) => (
            <div key={label} className="flex flex-col items-center gap-[24px]">
              <div
                className="relative overflow-hidden"
                style={{ height: '709px', width: '360px' }}
              >
                <img src={src} alt={label} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <p
                className="font-bold text-white text-center"
                style={{ fontSize: '20px', lineHeight: '1.2' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Match Prediction & Leaderboards ── */}
      <section className="bg-[#f5f5f5]" style={{ padding: '80px 60px' }}>
        <div className="w-[1280px]">
          <div className="w-full h-px bg-[#101010] mb-[48px]" />
          <div className="flex gap-[16px]">
            <p
              className="font-bold text-[#101010]"
              style={{
                fontSize: '48px',
                lineHeight: '48px',
                letterSpacing: '-0.96px',
                width: '524px',
                flexShrink: 0,
              }}
            >
              Match Prediction{'\n'}&amp; Leaderboards
            </p>
            <div className="flex-1 flex flex-col gap-[32px]">
              <p
                className="font-normal text-[#101010]"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                Fans forecast scores, earn points, and climb shareable leaderboards — fueling social
                reach.
              </p>
              <div className="flex flex-col gap-[16px]">
                {[
                  {
                    icon: imgChelseaIconLineChart,
                    text: 'Metric link: ↑ Returning users · ↑ Retention · ↑ Social engagement',
                  },
                  {
                    icon: imgChelseaIconGoal,
                    text: 'KPI goal: +10–15 % week-over-week retention · +5 % organic traffic',
                  },
                  {
                    icon: imgChelseaIconBrain,
                    text: 'Drives competition, community, and viral sharing.',
                  },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex gap-[16px] items-start">
                    <img src={icon} alt="" className="shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }} />
                    <p
                      className="font-normal text-[#101010]"
                      style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3 phones */}
          <div className="flex gap-[32px] justify-center mt-[80px]">
            {[imgChelseaMatchPhone1, imgChelseaMatchPhone2, imgChelseaMatchPhone3].map((src, i) => (
              <div
                key={i}
                className="relative overflow-hidden"
                style={{ height: '709px', width: '360px' }}
              >
                <img src={src} alt={`Match Prediction screen ${i + 1}`} className="absolute inset-0 w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second-Screen Match Centre ── */}
      <section className="bg-[#f5f5f5]" style={{ padding: '80px 60px' }}>
        <div className="w-[1280px]">
          <div className="w-full h-px bg-[#101010] mb-[48px]" />
          <div className="flex gap-[16px]">
            <p
              className="font-bold text-[#101010]"
              style={{
                fontSize: '48px',
                lineHeight: '48px',
                letterSpacing: '-0.96px',
                width: '524px',
                flexShrink: 0,
              }}
            >
              Second-Screen{'\n'}Match Centre
            </p>
            <div className="flex-1 flex flex-col gap-[32px]">
              <p
                className="font-normal text-[#101010]"
                style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
              >
                Live updates, commentary, and interactive stats turned the app into a real-time match
                companion.
              </p>
              <div className="flex flex-col gap-[16px]">
                {[
                  {
                    icon: imgChelseaIconLineChart,
                    text: 'Metric link: ↑ Session duration · ↑ Match-day interactions',
                  },
                  {
                    icon: imgChelseaIconGoal,
                    text: 'KPI goal: +15–20 % average session time increase',
                  },
                  {
                    icon: imgChelseaIconBrain,
                    text: 'Satisfies dual-screen habits; keeps fans active during play.',
                  },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex gap-[16px] items-start">
                    <img src={icon} alt="" className="shrink-0" style={{ width: '24px', height: '24px', marginTop: '2px' }} />
                    <p
                      className="font-normal text-[#101010]"
                      style={{ fontSize: '20px', lineHeight: '1.2', letterSpacing: '-0.2px' }}
                    >
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="relative overflow-hidden"
        style={{
          background:
            'linear-gradient(-27.47deg, rgba(255,255,255,0) 83%, rgba(255,255,255,0.1) 101%), linear-gradient(-0.17deg, rgb(11,12,13) 1%, rgb(16,17,18) 76%, rgb(39,42,45) 100%)',
          padding: '80px 60px',
        }}
      >
        <div className="flex flex-col gap-[80px]">
          {/* Top block */}
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col">
              <p
                className="font-bold text-[#fcfcfc]"
                style={{ fontSize: '20px', lineHeight: '112px', letterSpacing: '-0.2px' }}
              >
                Watch next
              </p>
              <p
                className="font-normal text-[#fcfcfc] whitespace-nowrap"
                style={{ fontSize: '112px', lineHeight: '112px', letterSpacing: '-2px' }}
              >
                Jack of All Homes
              </p>
            </div>
            {/* Watch button — centered via px-[540px] */}
            <div style={{ paddingLeft: '540px' }}>
              <button
                onClick={() => navigate('/cases/jack')}
                className="font-bold text-[#181818]"
                style={{
                  background: '#bdff00',
                  padding: '20px 28px',
                  borderRadius: '72px',
                  fontSize: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0px 4px 30px 0px rgba(191,253,16,0.2)',
                }}
              >
                Watch
              </button>
            </div>
          </div>

          {/* Hashtag */}
          <p
            className="font-normal"
            style={{ fontSize: '20px', lineHeight: '1.3', letterSpacing: '-0.2px', color: '#f0f0f0', opacity: 0.7, width: '200px' }}
          >
            #productdesign
          </p>
        </div>

        {/* Footer phone */}
        <div
          className="absolute overflow-hidden"
          style={{ right: '60px', bottom: 0, height: '531px', width: '551px' }}
        >
          <img
            src={imgChelseaFooterPhone}
            alt="Jack of All Homes App"
            className="absolute left-0 w-full"
            style={{ height: '146.97%', top: '0.06%', objectFit: 'cover' }}
          />
        </div>
      </footer>
    </div>
  );
}
