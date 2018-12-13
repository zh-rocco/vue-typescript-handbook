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
      {
        text: "TypeScript",
        items: [
          { text: "基础", link: "/typescript/types.html" },
          { text: "类", link: "/typescript/class.html" },
          { text: "泛型", link: "/typescript/generics.html" },
          { text: "装饰器", link: "/typescript/decorator.html" },
          { text: "常见问题", link: "/typescript/other.html" },
        ],
      },
    ],
    lastUpdated: true,
    repo: "https://github.com/zh-rocco/vue-typescript-handbook",
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
    "@vuepress/back-to-top",
  ],
};
