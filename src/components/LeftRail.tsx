const links = [
  { label: 'About me', href: '/about' },
  { label: 'Download resume', href: 'https://drive.google.com/file/d/1S5gzhkGH7XrjGotsp0RGcC86gWjyT2ff/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ivan-khoma-22691871/' },
];

export default function LeftRail() {
  const navigation = links.map(link => <a key={link.label} href={link.href}
    target={link.href.startsWith('https:') ? '_blank' : undefined}
    rel={link.href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{link.label}</a>);
  return <>
    <aside className="portfolio-rail">
      <a href="/" className="portfolio-name">Ivan Khoma<span>Product Designer</span></a>
      <nav aria-label="Main navigation">{navigation}</nav>
    </aside>
    <header className="portfolio-mobile-nav">
      <a href="/" className="portfolio-name">Ivan Khoma</a>
      <details><summary>Menu</summary><nav aria-label="Mobile navigation">{navigation}</nav></details>
    </header>
  </>;
}
