import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Toolkit: grid overlay (Ctrl+G) on every page + /toolkit/motion playground.
// On in `astro dev`, in Vercel preview deployments (branches / PRs) and with TOOLKIT=1.
// Never in the production deployment.
const toolkitOn = (command) =>
  command === 'dev' || process.env.VERCEL_ENV === 'preview' || process.env.TOOLKIT === '1';
const toolkit = () => ({
  name: 'toolkit',
  hooks: {
    'astro:config:setup': ({ command, injectScript, injectRoute }) => {
      if (!toolkitOn(command)) return;
      // Root-relative: Vite resolves it from the project root.
      injectScript('page', `import "/toolkit/grid/overlay/index.ts";`);
      injectRoute({ pattern: '/toolkit/motion', entrypoint: './toolkit/motion/playground.astro' });
    },
  },
});

export default defineConfig({
  output: 'static',
  integrations: [react(), toolkit()],
  vite: { plugins: [tailwindcss()] },
});
