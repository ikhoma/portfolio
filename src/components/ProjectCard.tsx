import { Link, useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  image: string;
  tag: string;
  title: string;
  description: string;
  to?: string;
  externalUrl?: string;
  className?: string;
}

export default function ProjectCard({
  image,
  tag,
  title,
  description,
  to,
  externalUrl,
  className = '',
}: ProjectCardProps) {
  const navigate = useNavigate();
  const sharedImageTransitionName = to === '/cases/emagine' ? 'case-emagine-hero-image' : undefined;

  const handleInternalNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!to) return;
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();

    const documentWithTransition = document as Document & {
      startViewTransition?: (update: () => void | Promise<void>) => unknown;
    };

    if (
      typeof documentWithTransition.startViewTransition !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      navigate(to);
      return;
    }

    documentWithTransition.startViewTransition(() => {
      navigate(to);
    });
  };

  const cardContent = (
    <div
      className={`relative w-full overflow-hidden rounded-[40px] bg-[#2C2A26] group cursor-pointer ${className}`}
      style={{ aspectRatio: '524/496' }}
    >
      {/* Background image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ viewTransitionName: sharedImageTransitionName }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Top row: tag pill + open icon */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        {/* Tag pill */}
        <div
          className="px-4 py-2 text-[13px] font-medium text-white rounded-[32px] backdrop-blur-md"
          style={{
            background: 'rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        >
          {tag}
        </div>

        {/* Open icon */}
        {(to || externalUrl) && (
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md flex-shrink-0"
            style={{
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 13L13 3M13 3H6M13 3V10"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-[20px] font-bold text-white leading-tight mb-1">{title}</h3>
        <p className="text-[14px] font-medium text-[#969593] leading-snug">{description}</p>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} onClick={handleInternalNavigation} className="block no-underline">
        {cardContent}
      </Link>
    );
  }
  if (externalUrl) {
    return (
      <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="block no-underline">
        {cardContent}
      </a>
    );
  }
  return cardContent;
}
