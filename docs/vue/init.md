---
sidebar: auto
sidebarDepth: 3
prev: false
next: ./use.md
---

# 项目初始化

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
