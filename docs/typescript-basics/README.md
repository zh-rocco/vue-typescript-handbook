---
sidebar: auto
sidebarDepth: 3
---

# TypeScript 基础

## 类型系统

### 示例

JavaScript

```js
let isPending = true;
let count = 10;
let name = "Rocco";
let u = undefined;
let n = null;
```

TypeScript

```ts
let isPending: boolean = true;
```

### JS 数据类型 和 TS 数据类型对应表

| JavaScript 数据类型 | TypeScript 类型 |
| :-----------------: | :-------------: |
|       布尔值        |    `boolean`    |
|        数值         |    `number`     |
|       字符串        |    `string`     |
|      空值 `*`       |     `void`      |
|        null         |     `null`      |
|      undefined      |   `undefined`   |

**说明：**

::: warning
声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`。
:::

## 参考

- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)

## 目录

[[toc]]
