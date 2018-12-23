---
sidebar: auto
sidebarDepth: 3
prev: ./init.md
next: ./faq.md
---

# 实战

## 对比 JS

`*.js`

```vue
<script>
import Child from "path/to/Child.vue";

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
  beforeRouteEnter(to, from, next) {},
};
</script>
```

`*.ts`

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
  private count = 10;
  private price = 99;

  /* computed */
  private get money() {
    return this.count * this.price;
  }

  /* watch */
  @Watch("count")
  private onCountChanged(newValue: number, oldValue: number) {}

  /* methods */
  private handleCountChange() {}

  /* instance lifecycle Hooks */
  private created() {}
}
</script>
```

## 组件

```vue
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
