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

```bash
vue create vue-typescript
```

![Step - 1](./images/vue-cli-01.png)

![Step - 2](./images/vue-cli-02.png)

## 与 JS 项目对比

![Vue JS&TS](./images/vue-js-ts.png)

## `Component` 的两种风格

`src/views/Home.vue`

**`Vue.extend` 构造器**

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

**`class-style component syntax`**

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
