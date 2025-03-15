// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Yuhaiin Docs',
			favicon: './public/favicon.ico',
			logo: {
				src: './public/favicon.ico',
			},
			social: {
				github: 'https://github.com/yuhaiin/yuhaiin',
			},
			sidebar: [
				{
					label: 'Start',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Protocol',
					autogenerate: { directory: 'protocol' },
				},
				{
					label: 'Bypass',
					autogenerate: { directory: 'bypass' }
				},
				{
					label: "Resolver",
					autogenerate: { directory: 'resolver' }
				},
				{
					label: "Sniff",
					autogenerate: { directory: 'sniff' }
				},
				{
					label: "Latency",
					autogenerate: { directory: 'latency' }
				}
			],
		}),
	],
});
