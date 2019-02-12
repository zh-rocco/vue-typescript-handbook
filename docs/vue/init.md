---
sidebar: auto
sidebarDepth: 3
prev: false
next: ./use.md
---

# 项目初始化

## 前言

TypeScript 适不适合在 vue 业务开发中使用？

- 问题的本质其实很简单：因为当初 API 的设计根本就没有考虑类型系统。Vue 的组件本质上就是一个 “包含了描述组件选项的对象”。必须要承认的是，2.x 的 TS 支持显然跟 React 和 Angular 是有差距的，这也是为什么 3.0 要加强这一块。([尤雨溪](https://www.zhihu.com/question/310485097/answer/591869966))
- 当前版本下，肯定是不适合的，因为在 vue 的设计中存在逻辑断层。([匿名用户](https://www.zhihu.com/question/310485097/answer/586029603))
- 目前，不合适，倒也不是说不行，就是绕，纠结。([Jim Liu](https://www.zhihu.com/question/310485097/answer/587279797))
- 真实感受，和 ts 结合 vue 没 angular 和 react 爽，但也不是不能用。([s 牵着你的笑容](https://www.zhihu.com/question/310485097/answer/586474353))

**结论：目前能用但是不好用。**

## 入门参考

- [TypeScript 支持 — Vue.js](https://cn.vuejs.org/v2/guide/typescript.html)
- [TypeScript-Vue-Starter](https://github.com/Microsoft/TypeScript-Vue-Starter)
  <!-- - [vue-starter](https://github.com/devCrossNet/vue-starter) -->

## 安装脚手架

```bash
yarn global add @vue/cli

// OR

npm i -g @vue/cli
```

## 创建项目

### STEP 1

```bash
vue create <project name>
```

### STEP 2

选择 `vue cli preset`: **Manually select features**

### STEP 3

![features](./images/vue-cli-02.png)

## 与 JS 项目对比

![Vue JS&TS](./images/vue-js-ts.png)

## `Component` 的两种风格

通过 [**Manually select features**](#step-3) 过程中的 **Use class-style component syntax** 指定

#### `Vue.extend` 构造器

```vue
<script lang="ts">
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

export default Vue.extend({
  name: "home",
  components: {
    HelloWorld,
  },
});
</script>
```

#### `class-style component syntax`

```vue
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
```
