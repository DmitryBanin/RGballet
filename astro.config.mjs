import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rgballet.ru',
  base: '/',
  integrations: [
    sitemap({
      filter: (page) => new URL(page).pathname === '/',
    }),
  ],

  devToolbar: {
    enabled: false,
  },
});
