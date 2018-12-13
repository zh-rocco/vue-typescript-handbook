---
sidebar: auto
sidebarDepth: 3
prev: ./decorator.md
next: false
---

# 常见问题

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

### 例子

```ts
import foo = require("foo");
let bar: foo;
```

将会编译成 JavaScript：

```ts
let bar;
```
