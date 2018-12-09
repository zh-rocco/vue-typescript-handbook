const { name } = require("../../package.json");

module.exports = {
  base: `/${name}/`,
  title: "Vue Typescript Handbook",
  description: "Let's develop vue app with typescript.",
  themeConfig: {
    sidebar: "auto",
    nav: [
      // ...
      { text: "首页", link: "/" },
      { text: "TS 基础", link: "/typescript-basics/" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      "@vuepress/search",
      {
        searchMaxSuggestions: 10,
      },
    ],
  ],
};
