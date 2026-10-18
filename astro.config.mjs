import { defineConfig } from 'astro/config';

const isTimeweb = process.env.DEPLOY_TARGET === 'timeweb';

export default defineConfig({
  site: isTimeweb
    ? 'https://cb007521.tw1.ru'
    : 'https://dmitrybanin.github.io',

  base: isTimeweb ? '/' : '/RGballet',

  devToolbar: {
    enabled: false,
  },
});