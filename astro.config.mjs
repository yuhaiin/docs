// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Yuhaiin Docs',
			favicon: './favicon.ico',
			logo: {
				src: './favicon.ico',
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
			],
		}),
	],
});
