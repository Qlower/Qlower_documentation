import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Documentation Qlower",
  tagline: "",
  favicon: "img/favicon.png",
  url: "https://secure.qlower.com",
  baseUrl: "/",
  organizationName: "qlower",
  projectName: "qlower-doc",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  // Schémas ```mermaid dans les pages (modèle de données de la structure d'un load).
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  i18n: {
    defaultLocale: "fr",
    locales: ["fr"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Version 3.0 (Connecteur V3) figée dans versioned_docs/version-3.0 et
          // servie par défaut. docs/ reste la copie de travail de la prochaine version.
          includeCurrentVersion: false,
          lastVersion: "3.0",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Qlower",
      logo: {
        alt: "Logo",
        src: "img/logo-qlower.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Documentation",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownItemsAfter: [],
          dropdownItemsBefore: [],
          dropdownActiveClassDisabled: true,
        },
      ],
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: "Docs",
        //   items: [
        //     {
        //       label: "Tutorial",
        //       to: "/docs/intro",
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Qlower, Inc.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
