import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Labs',
  tagline: 'Welcome to the Labs!',
  favicon: 'img/favicon.ico',

  url: 'https://ethanlabs.netlify.app/', // Your website URL
  baseUrl: '/',

  organizationName: 'nazethan', // Usually your GitHub org/user name.
  projectName: 'nazethan.github.io', // Usually your repo name.
  onBrokenLinks: 'warn',

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
        /**
        {
          label: 'Guides',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'guides_sidebar',
        },
        */
        {
          href: 'https://drive.google.com/file/d/1N8lwq9JIaMC_iSP21mvaiiPVT7zRvNDd/view?usp=drive_link',
          position: 'right',
          label: 'Syllabus',
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
        }
      ],
    },
    footer: {
      style: 'dark',
      copyright: `&copy; ${new Date().getFullYear()} All Rights Reserved &bull; Developed by <a href="https://github.com/dorukaysor">Doruk</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
