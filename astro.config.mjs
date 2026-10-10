// @ts-check
import { defineConfig } from 'astro/config';
import { siteDark, siteLight } from './src/lib/shiki-themes.ts';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://armadra.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    shikiConfig: {
      themes: { dark: siteDark, light: siteLight },
      defaultColor: false,
      wrap: false,
    },
  },
});
