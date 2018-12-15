---
sidebar: auto
---

# 实战

## 组件

```vue
<template>
  <div class="home" ref="print">
    <button @click="handlePrint">打印</button> <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Vue + TypeScript" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import Print from "@/utils/print";
import { calendar } from "@/utils/calendar/calendar";

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  private handlePrint() {
    new Print(this.$refs.print).init();
  }

  private mounted() {
    window.console.log(calendar);
    if (this.$loading) {
      this.$loading();
    }
  }
}
</script>
```

## props

```ts
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  @Prop(Number) propA!: number;
  @Prop({ default: "default value" }) propB!: string;
  @Prop([String, Boolean]) propC!: string | boolean;
}
```

is equivalent to

```ts
export default {
  props: {
    propA: { type: Number },
    propB: { default: "default value" },
    propC: { type: [String, Boolean] },
  },
};
```

::: tip
props name 后添加 [`!` 修饰符](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html) 是为了防止 [Strict Class Initialization](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html) 警告。
:::

## watch

```ts
import { Vue, Component, Watch } from "vue-property-decorator";

@Component
export default class YourComponent extends Vue {
  @Watch("child")
  onChildChanged(val: string, oldVal: string) {}

  @Watch("person", { immediate: true, deep: true })
  onPersonChanged(val: Person, oldVal: Person) {}
}
```

is equivalent to

```ts
export default {
  watch: {
    child: {
      handler: "onChildChanged",
      immediate: false,
      deep: false,
    },
    person: {
      handler: "onPersonChanged",
      immediate: true,
      deep: true,
    },
  },
  methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged(val, oldVal) {},
  },
};
```
