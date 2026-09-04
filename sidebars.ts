import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  mainSidebar: [
    'index',
    {
      type: 'category',
      label: '入门',
      collapsed: false,
      items: [
        'ch01-overview',
        'ch02-installation',
        'ch03-interface',
      ],
    },
    {
      type: 'category',
      label: '数据',
      collapsed: false,
      items: [
        'ch04-projects',
        'ch05-adding-data',
        'ch06-layers-styling',
        'ch07-attribute-table',
      ],
    },
    {
      type: 'category',
      label: '分析',
      items: [
        'ch08-map-controls',
        'ch09-vector-tools',
        'ch10-raster-tools',
        'ch11-sql-workspace',
      ],
    },
    {
      type: 'category',
      label: '扩展',
      items: [
        'ch12-plugins',
        'ch13-advanced',
      ],
    },
    {
      type: 'category',
      label: '附录',
      items: [
        'appendix/glossary',
        'appendix/faq',
        'appendix/references',
        'appendix/changelog',
        'appendix/roadmap',
        'appendix/contributing',
      ],
    },
  ],
};

export default sidebars;
