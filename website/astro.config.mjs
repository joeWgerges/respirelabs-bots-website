// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://smartmouthtape.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'pl'],
    routing: {
      prefixDefaultLocale: true
    }
  },
  vite: {
    plugins: [tailwindcss()],
    // Allow Sanity Studio to resolve correctly
    ssr: {
      noExternal: ['sanity', '@sanity/client', '@sanity/vision'],
    },
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/studio'),
    }),
    react(),
  ],
});