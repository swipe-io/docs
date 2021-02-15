module.exports = {
  title: 'Swipe',
  tagline: 'Генерация транспортного слоя',
  url: 'https://swipeio.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'swipe-io', // Usually your GitHub org/user name.
  projectName: 'Swipe', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Swipe',
      // logo: {
      //   alt: 'Swipe',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          to: 'docs/installation',
          activeBasePath: 'docs',
          label: 'Документация',
          position: 'left',
        },
        {to: 'docs/rest', label: 'Руководство', position: 'left'},
        {to: 'docs/enums_client', label: 'Особенности', position: 'left'},
        {
          href: 'https://github.com/swipe-io/swipe',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Документация',
          items: [
            {
              label: 'Начало работы',
              to: 'docs/installation',
            },
          ],
        },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Блог',
        //       to: 'blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/swipe-io/swipe',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SwipeIO. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'index',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
