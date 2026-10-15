// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yuhaiin.github.io',
  base: '/documents',
  integrations: [
    starlight({
      title: 'Yuhaiin Docs',
      description: 'Guides and reference for Yuhaiin',
      favicon: '/favicon.ico',
      customCss: ['./src/styles/yuhaiin.css'],
      social: [{ icon: 'github', label: 'Yuhaiin on GitHub', href: 'https://github.com/yuhaiin/yuhaiin' }],
      sidebar: [
        { label: 'Get started', items: [
          { slug: 'guides' },
          { slug: 'guides/install' },
          { slug: 'guides/first-connection' },
          { slug: 'guides/local-proxy' },
          { slug: 'guides/android' },
          { slug: 'guides/tun' },
          { slug: 'guides/troubleshooting' },
          { slug: 'guides/faq' },
          { slug: 'guides/glossary' },
          { slug: 'guides/security' },
        ] },
        { label: 'Using the Web UI', items: [
          { slug: 'features/nodes' },
          { slug: 'features/inbounds' },
          { slug: 'features/routing' },
          { slug: 'features/lists' },
          { slug: 'features/dns' },
          { slug: 'features/monitoring' },
          { slug: 'features/diagnostics' },
          { slug: 'features/backup' },
          { slug: 'features/settings' },
        ] },
        { label: 'Technical reference', items: [
          { slug: 'reference/architecture' },
          { slug: 'reference/configuration' },
          { slug: 'reference/vpn-protocols' },
          { slug: 'guides/build' },
          { label: 'Protocol reference', items: [{ autogenerate: { directory: 'protocol' } }] },
        ] },
        { label: 'Legacy topic links', collapsed: true, items: [
          { label: 'Bypass', items: [{ autogenerate: { directory: 'bypass' } }] },
          { label: 'Resolver', items: [{ autogenerate: { directory: 'resolver' } }] },
          { label: 'Sniffing', items: [{ autogenerate: { directory: 'sniff' } }] },
        ] },
      ],
    }),
  ],
});
