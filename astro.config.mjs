// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://armadra.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
