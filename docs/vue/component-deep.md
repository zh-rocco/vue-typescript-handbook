---
sidebar: auto
sidebarDepth: 3
---

# 深入理解 Component 装饰器（对比 JS）

Vue 通过 [装饰器](/typescript/decorator.md) 实现 `class-style` 语法。

下面通过源码看一下 `Component` 究竟是什么和做了什么：

## 导入 Component 装饰器

```ts
import { Component, Vue } from "vue-property-decorator";
```

## vue-property-decorator

`vue-property-decorator` 中的 `Component` 直接引用自 `vue-class-component`，[详情](https://github.com/kaorun343/vue-property-decorator/blob/master/src/vue-property-decorator.ts#L5-#L12)

```ts {2,9}
import Vue, { PropOptions, WatchOptions } from "vue";
import Component, { createDecorator, mixins } from "vue-class-component";
import { InjectKey } from "vue/types/options";

export type Constructor = {
  new (...args: any[]): any;
};

export { Component, Vue, mixins as Mixins };
```

## vue-class-component

### `Component` 定义

```ts {7-16}
import Vue, { ComponentOptions } from "vue";
import { VueClass } from "./declarations";
import { componentFactory, $internalHooks } from "./component";

export { createDecorator, VueDecorator, mixins } from "./util";

function Component<V extends Vue>(options: ComponentOptions<V> & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC;
function Component<VC extends VueClass<Vue>>(target: VC): VC;
function Component(options: ComponentOptions<Vue> | VueClass<Vue>): any {
  if (typeof options === "function") {
    return componentFactory(options);
  }
  return function(Component: VueClass<Vue>) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys: string[]): void {
  $internalHooks.push(...keys);
};

export default Component;
```

这里使用了 TS 里的 [函数重载](/typescript/types.md#重载)，允许 `@Component` 和 `@Component(options)` 两种写法。

### `componentFactory` 定义

```ts {7}
export function componentFactory(Component: VueClass<Vue>, options: ComponentOptions<Vue> = {}): VueClass<Vue> {
  // ...

  // find super
  const superProto = Object.getPrototypeOf(Component.prototype);
  const Super = superProto instanceof Vue ? (superProto.constructor as VueClass<Vue>) : Vue;
  const Extended = Super.extend(options);

  // ...

  return Extended;
}
```

`componentFactory` 函数通过 [Vue.extend](https://cn.vuejs.org/v2/api/#Vue-extend) 创建一个 Vue 子类，然后 `return` 出去，所以 `Component` 本质上是对 `Vue.extend` 的封装。

### 参考

- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator/blob/master/src/vue-property-decorator.ts#L5-#L12)
- [vue-class-component (index.ts)](https://github.com/vuejs/vue-class-component/blob/master/src/index.ts#L7-L16)
- [vue-class-component (component.ts)](https://github.com/vuejs/vue-class-component/blob/master/src/component.ts#L81)

## 深入理解编译执行过程

### js 下的编译过程

```js
import App from "path/to/App.vue";

console.log(App);
```

输出

```json
{
  "name": "app",
  "components": {},
  "data": function() {},
  "computed": {},
  "watch": {},
  "methods": {},
  "beforeCreate": function() {},
  "created": function() {},
  "beforeDestroy": function() {},
  "render": function() {}
  // ...
}
```

输出结果是一个包含组件选项的对象。

### ts 下的编译过程

```ts
import App from "path/to/App.vue";

console.log(App);
```

输出

```ts
function VueComponent(options) {
  this._init(options);
}
```

这是一个 `Vue` 子类，[参见](https://github.com/vuejs/vue/blob/dev/src/core/global-api/extend.js#L33-L35)，印证了我们上面说的 `Component` 装饰器本质上是对 `Vue.extend` 的封装。

#### 参考

- [Vue.js](https://github.com/vuejs/vue)
- [Vue.extend](https://cn.vuejs.org/v2/api/#Vue-extend)
- [Vue.js 技术揭秘 - createElement](https://ustbhuangyi.github.io/vue-analysis/data-driven/create-element.html)

### 创建 VNode

```ts {4}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

`render` 函数中的 `h` 其实是 `$createElement` 函数，
[参见](https://github.com/vuejs/vue/blob/dev/src/core/instance/render.js#L75)，

Vue.js 利用 `createElement` 方法创建 VNode，[参见](https://github.com/vuejs/vue/blob/dev/src/core/vdom/create-element.js)。

```js {3}
export function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number,
): VNode | Array<VNode> {}
```

`$createElement` 的第一个参数对应 `_createElement` 的第二个参数，以此类推，[参见](https://github.com/vuejs/vue/blob/dev/src/core/instance/render.js#L33)

由 `tag` 参数的类型约束可以看出：

- `string`: 支持使用原生标签创建 VNode `h('div')`
- `Class<Component>`: 支持通过 Vue 子类创建 VNode，也就是 TS 下的创建过程 `h(VueComponent)`
- `Object`: 支持通过配置参数创建 VNode，也就是 JS 下的创建过程 `h({ render: function() {} })`
- `Function`: [参见](https://cn.vuejs.org/v2/guide/render-function.html#函数式组件)
