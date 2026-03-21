import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Labs',
  tagline: 'Welcome to the Labs!',
  favicon: 'img/favicon.ico',

  url: 'https://ethanlabs.netlify.app/',
  baseUrl: '/',

  organizationName: 'nazethan',
  projectName: 'nazethan.github.io',
  onBrokenLinks: 'warn',

  plugins: [
    async function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions: { plugins: unknown[] }) {
          postcssOptions.plugins.push(require('@tailwindcss/postcss'));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      style: 'dark',
      title: 'Labs',
      logo: {
        alt: 'Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          label: 'Records',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'records_sidebar',
        },
        {
          label: 'Projects',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'projects_sidebar',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://drive.google.com/file/d/1N8lwq9JIaMC_iSP21mvaiiPVT7zRvNDd/view?usp=drive_link',
          position: 'right',
          label: 'Syll',
        },
        {
          href: 'https://github.com/nazethan/labs',
          position: 'right',
          label: 'GH',
        },
        {
          href: 'https://discord.gg/FHBc4NeGT5',
          position: 'right',
          label: 'DC',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `<b>&copy; ${new Date().getFullYear()} &bull; <a href="https://github.com/dorukaysor"><i>Meet the dev</i></a> &bull; Last Updated: ${new Date().toLocaleDateString()}</b>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
