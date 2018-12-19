---
sidebar: auto
sidebarDepth: 3
prev: ./decorator.md
next: false
---

# 其他

## 重写类型的动态查找

可以通过 `declare module 'somePath'` 来声明一个全局模块的方式，用来解决查找模块路径的问题：

`globals.d.ts`

```ts
declare module "foo" {
  // some variable declarations
  export var bar: number;
}
```

接着

`anyOtherTsFileInYourProject.ts`

```ts
import * as foo from "foo";
// TypeScript 将假设（在没有做其他查找的情况下）
// foo 是 { bar: number }
```

## 只导入类型

使用 `import/require` 语法。

```ts
import foo = require("foo");
```

它实际上只做了两件事：

- 导入 foo 模块的所有类型信息
- 确定 foo 模块运行时的依赖关系

例如：

```ts
import foo = require("foo");
let bar: foo;
```

将会编译成 JavaScript：

```ts
let bar;
```

## `interface` 和 `type` 的区别

`interface` 和 `type` 都可以用来声明类型，例如：

```ts
interface Point {
  a: number;
  b: number;
}

type Point = {
  a: number;
  b: number;
};
```

它们的区别是什么？

### 相同点

1. 都可以被 `implements`

```ts
type Point1 = {
  x: number;
  y: number;
};

interface Point2 {
  z: number;
}

class point implements Point1, Point2 {
  x = 0;
  y = 0;
  z = 0;
}
```

### 不同点

1. `interface` 可以被 `extends`，而 `type` 不可以

```ts
interface Point {
  x: number;
  y: number;
}

interface Point1 extends Point {
  z: number;
}
```

2. 同名的 `interface` 会自动合并，而同名的 `type` 会报错

```ts
interface Point {
  x: number;
  y: number;
}

interface Point {
  z: number;
}
```

3. `interface` 只可以声明对象类型，而 `type` 可以声明任意类型

```ts
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type ObjectStatics = typeof Object;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>; right: Tree<T> };
```

### 参考

- [Typescript: Interfaces vs Types](https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types)
- [Type Aliases](https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#310-type-aliases)

## `bind` `call` `apply`

[TypeScript 3.2](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-2.html)之后增加了对
`bind、call、apply` 方法的类型检测，记得升级 TypeScript。
