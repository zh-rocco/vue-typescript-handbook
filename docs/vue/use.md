---
sidebar: auto
sidebarDepth: 3
prev: ./init.md
next: ./vuex.md
---

# 类风格的组件

## 综述（对比 JS）

### JS 语法

对外暴露了一个处理后的 `options` 对象。

```vue
<script>
import Child from "path/to/Child";

export default {
  name: "component-name",
  components: {
    Child,
  },
  props: {
    msg: { type: String, default: "" },
  },
  data() {
    return {
      count: 10,
      price: 99,
    };
  },
  computed: {
    money() {
      return this.count * this.price;
    },
  },
  watch: {
    count(newValue, oldValue) {},
  },
  methods: {
    handleCountChange() {},
  },
  filters: {
    prefix(value) {
      return "$" + value;
    },
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 可以通过 this 访问组件实例
    console.log("beforeRouteLeave");
    next();
  },
};
</script>
```

### TS 语法

对外暴露了一个 Vue 子类，下面会详细介绍。

```vue
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import Child from "path/to/Child.vue";

@Component({
  components: {
    Child,
  },

  /* router hooks */
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 可以通过 this 访问组件实例
    console.log("beforeRouteLeave");
    next();
  },
})
export default class ComponentName extends Vue {
  /* props */
  @Prop({ type: String, default: "" }) private msg!: string;

  /* data */
  private count: number = 10;
  private price = 99;

  /* computed */
  private get money(): number {
    return this.count * this.price;
  }

  /* watch */
  @Watch("count")
  private onCountChanged(newValue: number, oldValue: number): void {}

  /* methods */
  private handleCountChange() {}

  /* instance lifecycle hooks */
  private created() {}
}
</script>
```

## 组件

**JS 语法**

```js
export default {};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
```

[深入理解 Component 装饰器](./component-deep.md)

## props

**JS 语法**

```js
export default {
  props: {
    msg: { type: String, default: "" },
  },
};
```

**TS 语法**

```ts
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop({ type: String, default: "" }) private msg!: string;
}
```

[详细教程](https://github.com/kaorun343/vue-property-decorator#propoptions-propoptions--constructor--constructor---decorator)

::: tip
props name 后添加 `! 修饰符` 是为了防止 [Strict Class Initialization](http://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#strict-class-initialization) 警告。
:::

## data

**JS 语法**

```js
export default {
  data() {
    return {
      count: 10,
      price: 99,
    };
  },
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private count: number = 10;
  private price = 99;
}
```

## computed

**JS 语法**

```js
export default {
  computed: {
    money() {
      return this.count * this.price;
    },
  },
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private get money(): number {
    return this.count * this.price;
  }
}
```

## methods

**JS 语法**

```js
export default {
  methods: {
    handleCountChange() {},
  },
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private handleCountChange() {}
}
```

## watch

**JS 语法**

```js
export default {
  watch: {
    count(newValue, oldValue) {},
  },
};
```

**TS 语法**

```ts
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private count: number = 10;

  @Watch("count")
  private onCountChanged(newValue: number, oldValue: number): void {}
}
```

## lifecycle hooks

**JS 语法**

```js
export default {
  beforeCreate() {},
  created() {},
  beforeDestroy() {},
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  private beforeCreate() {}
  private created() {}
  private beforeDestroy() {}
}
```

## components

**JS 语法**

```js
import Child from "path/to/Child";

export default {
  components: {
    Child,
  },
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";
import Child from "path/to/Child.vue";

@Component({
  components: {
    Child,
  },
})
export default class Home extends Vue {}
```

## router hooks

**JS 语法**

```js
import Child from "path/to/Child";

export default {
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 可以通过 this 访问组件实例
    console.log("beforeRouteLeave");
    next();
  },
};
```

**TS 语法**

```ts
import { Component, Vue } from "vue-property-decorator";

@Component({
  /* router hooks */
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 可以通过 this 访问组件实例
    console.log("beforeRouteLeave");
    next();
  },
})
export default class Home extends Vue {}
```

## 总结

语法变更可以分成 3 类：

- 直接写在类下
  - `data, methods, render, errorCaptured`
  - `computed`，类访问器写法 `get`
  - lifecycle hooks: `beforeCreate, created, beforeMount, mounted, beforeDestroy, destroyed, beforeUpdate, updated, activated`, [参见](https://github.com/vuejs/vue-class-component/blob/master/src/component.ts#L7-L21)
- 需要装饰器：`props, watch`
- 除了上述指明的属性外其余均需要放到 `Component` 装饰器的 options 内，如：
  - `name, components, filters, directives` 等
  - router hooks: `beforeRouteEnter,beforeRouteUpdate, beforeRouteLeave`

## 参考

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
