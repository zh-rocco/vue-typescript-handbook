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
        text: "Vue",
        items: [
          { text: "初始化", link: "/vue/init.html" },
          { text: "实战", link: "/vue/use.html" },
          { text: "常见问题", link: "/vue/faq.html" },
          // ...
        ],
      },
      {
        text: "TypeScript",
        items: [
          { text: "类型系统", link: "/typescript/types.html" },
          { text: "类", link: "/typescript/class.html" },
          { text: "泛型", link: "/typescript/generics.html" },
          { text: "装饰器", link: "/typescript/decorator.html" },
          { text: "其他", link: "/typescript/other.html" },
        ],
      },
    ],
    lastUpdated: true,
    repo: "https://github.com/zh-rocco/vue-typescript-handbook",
    docsDir: "docs",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "编辑此页面！",
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
