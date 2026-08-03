import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'GeoLibre 使用手册',
  tagline: '开源 GIS 平台完全使用指南',
  favicon: 'img/favicon.ico',

  url: 'https://wangdwn.github.io',
  baseUrl: '/geolibre-manual/',

  organizationName: 'wangdwn',
  projectName: 'geolibre-manual',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    format: 'md',
    mermaid: false,
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          numberPrefixParser: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'GeoLibre 手册',
      logo: {
        alt: 'GeoLibre',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/opengeos/GeoLibre',
          label: 'GeoLibre',
          position: 'right',
        },
        {
          href: 'https://github.com/wangdwn/geolibre-manual',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            { label: 'GeoLibre 概述', to: '/ch01-overview' },
            { label: '安装与部署', to: '/ch02-installation' },
            { label: '术语表', to: '/appendix/glossary' },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GeoLibre 官方',
              href: 'https://geolibre.org',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/opengeos/GeoLibre',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '作者 GitHub',
              href: 'https://github.com/wangdwn',
            },
            {
              label: '报告问题',
              href: 'https://github.com/wangdwn/geolibre-manual/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GeoLibre 手册项目。基于 MIT 协议发布。`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'sql', 'python', 'rust', 'yaml'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
