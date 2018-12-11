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
let num = 10;
let str = "Rocco";
let u = undefined;
let n = null;
let arr = [1, 2, 3];
let obj = { a: 1, b: 2, c: 3 };
```

TypeScript

```ts
let isPending: boolean = true;
let num: number = 10;
let str: string = "Rocco";
let u: undefined = undefined;
let n: null = null;
let arr: number[] = [1, 2, 3];
let obj: object = { a: 1, b: 2, c: 3 };

let a: any; // 任意类型
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

- 声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`。
- `undefined` 类型的变量只能被赋值为 `undefined`，`null` 类型的变量只能被赋值为 `null`。
  :::

::: tip

- 在任意值上访问任何属性都是允许的，也允许调用任何方法。
- 声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
  :::

### 类型推断

```ts
let isPending = true;
let num = 10;
let str = "Rocco";
let u = undefined;
let n = null;
let arr = [1, 2, 3];
let obj = { a: 1, b: 2, c: 3 };

let a; // 任意类型
```

等同

```ts
let isPending: boolean = true;
let num: number = 10;
let str: string = "Rocco";
let u: undefined = undefined;
let n: null = null;
let arr: number[] = [1, 2, 3];
let obj: object = { a: 1, b: 2, c: 3 };

let a: any; // 任意类型
```

### 联合类型

联合类型使用 `|` 分隔每个类型。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

### 接口（对象的类型）

## 参考

- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)

## 目录

[[toc]]
