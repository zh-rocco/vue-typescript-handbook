const { name } = require("../../package.json");

module.exports = {
  base: `/${name}/`,
  title: "Vue TypeScript Handbook",
  description: "使用 TypeScript 开发 Vue 应用。",
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
