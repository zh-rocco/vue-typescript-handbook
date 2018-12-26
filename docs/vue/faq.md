---
sidebar: auto
sidebarDepth: 2
prev: ./use.md
next: false
---

# 常见问题

## `vue-property-decorator`

[文档](https://github.com/kaorun343/vue-property-decorator)

依赖 [`vue-class-component`](https://github.com/vuejs/vue-class-component)，内置 7 个装饰器和 1 个方法，允许使用 class-style component 语法书写 Vue 组件。

- [`@Component`](https://github.com/vuejs/vue-class-component#example) (from vue-class-component)
- [`@Prop`](https://github.com/kaorun343/vue-property-decorator#propoptions-propoptions--constructor--constructor---decorator)
- [`@Watch`](https://github.com/kaorun343/vue-property-decorator#watchpath-string-options-watchoptions---decorator)
- [`@Model`](https://github.com/kaorun343/vue-property-decorator#modelevent-string-options-propoptions--constructor--constructor---decorator)
- [`@Emit`](https://github.com/kaorun343/vue-property-decorator#emitevent-string-decorator)
- [`@Inject`](https://github.com/kaorun343/vue-property-decorator#providekey-string--symbol--injectoptions--from-injectkey-default-any---injectkey-decorator)
- [`@Provide`](https://github.com/kaorun343/vue-property-decorator#providekey-string--symbol--injectoptions--from-injectkey-default-any---injectkey-decorator)
- [`Mixins`](https://github.com/vuejs/vue-class-component#using-mixins) (from vue-class-component)

## `shims-vue.d.ts`

```ts
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```

由于 TypeScript 默认并不支持 `*.vue` 后缀的文件，所以在 vue 项目中引入的时候需要创建一个 `vue-shim.d.ts` 文件，放在项目项目对应使用目录下，例如 src/vue-shim.d.ts

意思是告诉 TypeScript `*.vue` 后缀的文件可以交给 vue 模块来处理。

而在代码中导入 `*.vue` 文件的时候，需要写上 `.vue` 后缀。原因还是因为 TypeScript 默认只识别 `*.ts` 文件，不识别 `*.vue` 文件：

```ts
import Component from "components/component.vue";
```

**参考：**

- [modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [重写类型的动态查找](https://jkchao.github.io/typescript-book-chinese/project/modules.html#%E9%87%8D%E5%86%99%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8A%A8%E6%80%81%E6%9F%A5%E6%89%BE)

## 使用 Vue prototype 上的方法

```ts {6}
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private mounted() {
    this.$loading();
  }
}
```

TypeScript 报错：`Property '$loading' does not exist ...`

**解决办法：**

添加 TS 类型声明文件 `src/global.d.ts`

```ts
import Vue from "vue";

declare module "vue/types/vue" {
  interface Vue {
    $loading: any;
  }
}
```

## 项目中引用 `*.js` 文件

`src/views/Home.vue`

```ts {2}
import { Component, Vue } from "vue-property-decorator";
import Print from "@/utils/print/index.js";

@Component
export default class Home extends Vue {
  private handlePrint() {
    new Print(this.$refs.print);
  }
}
```

TypeScript 警告：`Could not find a declaration file for module '@/utils/print.js'`

**解决办法：**

1. 添加 `src/utils/print.d.ts` 类型文件

_简单起见，这里使用了 `any` 类型。_

```ts
declare const Print: any;
export default Print;
```

2. 修改 `src/utils/print.js`，添加类型引用

```js {1}
/// <reference path="./print.d.ts" />

export default class Print {
  // ...
}
```

3. 修改引用，去掉 `.js` 后缀

`src/views/Home.vue`

```ts {2}
import { Component, Vue } from "vue-property-decorator";
import Print from "@/utils/print/index";

@Component
export default class Home extends Vue {
  private handlePrint() {
    new Print(this.$refs.print);
  }
}
```

相关阅读：[三斜指令](/typescript/types.html#手动添加声明文件)

## 使用 Node 全局变量 `process.env.*`

1. 安装 Node 类型文件

```bash
npm i -D @types/node
```

2. 修改 `tsconfig.json`

```js
{
  // ...
  "types": ["node"]
  // ...
}
```

## 使用第三方库

### 有类型文件

这种类型的库允许直接在 TS 项目中使用。

::: tip
查看库的 `package.json` 中有无 `typings` 或 `types` 字段。
:::

例如：

- [Vue](https://github.com/vuejs/vue/blob/dev/package.json#L9)
- [moment](https://github.com/moment/moment/blob/develop/package.json#L27)

### 无类型文件，有对应的 `@types/*` 包

[TypeSearch](https://microsoft.github.io/TypeSearch/)

例如：

- [@types/lodash](https://www.npmjs.com/package/@types/lodash)
- [@types/express](https://www.npmjs.com/package/@types/express)

在项目中安装依赖

```bash
npm i -S @types/*
```

### 无类型文件，无对应的 `@types/*` 包

在项目中手动添加类型文件，以 `gt-native-wap-bridge-sdk` 为例：

`src/global.d.ts`

```ts
declare module "gt-native-wap-bridge-sdk";
```

[参考](/typescript/types.md#外部模块简写)

## `window` 上添加全局变量

`src/global.d.ts`

```ts
interface Window {
  __oa__: any;
}
```

## 不要使用 `undefined` 作为 class property 的初始值

```ts
@Component
class MyComp extends Vue {
  // Will not be reactive
  foo = undefined;

  // Will be reactive
  bar = null;

  data() {
    return {
      // Will be reactive
      baz: undefined,
    };
  }
}
```

[参考](https://github.com/vuejs/vue-class-component#undefined-will-not-be-reactive)

## `*.vue` 文件的编译过程

**JS:** `*.vue` --> `vue-loader` --> `js (html, css)` --> `babel-loader` --> `*.js`

**TS:** `*.vue` --> `vue-loader` --> `ts (html, css)` --> `ts-loader` --> `babel-loader` --> `*.js`
