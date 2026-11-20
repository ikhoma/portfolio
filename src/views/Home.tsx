import LeftRail from '../components/LeftRail';
import ProjectCard from '../components/ProjectCard';
import AwardsCard from '../components/AwardsCard';
import {
  imgChelseaCard,
  imgFibaCard,
  imgEmagineCard,
  imgJackCard,
} from '../assets/images';

const projects = [
  {
    image: imgChelseaCard,
    tag: 'Cases',
    title: 'Chelsea FC',
    description: 'The Fifth Stand App redesign',
    to: '/cases/chelsea',
  },
  {
    image: imgFibaCard,
    tag: 'Cases',
    title: 'FIBA',
    description: 'International Basketball Federation App',
    to: '/cases/fiba',
  },
  {
    image: imgEmagineCard,
    tag: 'Cases',
    title: 'Emagine Portals',
    description: 'HR Tech Platform',
    to: '/cases/emagine',
  },
  {
    image: imgJackCard,
    tag: 'Cases',
    title: 'Jack of All Homes',
    description: 'Home Management App',
    to: '/cases/jack',
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#101010' }}>
      <LeftRail />

      {/* Main content — 276px left offset on desktop (60px rail + 200px width + 16px gap) */}
      <main style={{ paddingLeft: 'clamp(16px, 276px, 276px)', paddingRight: '60px', paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '1064px' }}>
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}

          {/* Awards card */}
          <div>
            <AwardsCard />
          </div>
        </div>
      </main>
    </div>
  );
}
