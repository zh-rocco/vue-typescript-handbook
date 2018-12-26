---
sidebarDepth: 1
prev: false
next: ./class.md
---

# 类型进阶

## 声明文件

`declare` 定义的类型只会用于编译时的检查，编译结果中会被删除。

::: tip
`declare` 关键字用于类型声明。我们约定声明文件以 `.d.ts` 为后缀。
:::

### 全局类型

#### 变量

```ts
declare const version = "1.0.0";
```

#### 对象

```ts
interface Item {
  label: string;
  value: string | number;
}
```

::: tip
`interface` 前面的 `declare` 可以省略。
:::

#### 函数

```ts
declare function getName(id: number): string;
```

#### class

```ts
declare class Person {
  private name: string;
  private age: number;
  constructor(name: string, age: number);
  private getName(): string;
}
```

#### namespace

```ts
declare namespace OOO {
  const version = "1.0.0";
  interface Item {
    label: string;
    value: string | number;
  }
  function getName(id: number): string;
  class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number);
    private getName(): string;
  }
}
```

[参考](https://segmentfault.com/a/1190000009247663)

### 手动添加声明文件

通常我们会把类型声明放到一个单独的文件中，这就是声明文件：

```ts
// jQuery.d.ts

declare var jQuery: (string) => any;
```

然后在使用到的文件的开头，用「三斜线指令」表示引用了声明文件：

```ts
/// <reference path="./jQuery.d.ts" />

jQuery("#foo");
```

### 声明文件放到哪里

如果是模块的话，将 `*.d.ts` 放到和源码 `*.js`（或 `*.ts`）同目录，如果是全局变量的话放到哪里都可以，推荐放到 `src/global.d.ts` 内。

### 第三方声明文件

[TypeSearch](https://microsoft.github.io/TypeSearch/)

[npm](https://www.npmjs.com/)

## 模块

开始时模块这一概念包括内部模块和外部模块，现在内部模块称作 **命名空间（`namespace`）**，外部模块则简称为 **模块（`module`）**。

使用 `declare module` 对模块进行类型声明。

### 外部模块

`node.d.ts`

```ts
declare module "url" {
  export interface Url {
    protocol?: string;
    hostname?: string;
    pathname?: string;
  }
  export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url;
}

declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export let sep: string;
}
```

使用

```ts
/// <reference path="node.d.ts" />
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
```

### 外部模块简写

假如你不想在使用一个新模块之前花时间去编写声明，你可以采用声明的简写形式以便能够快速使用它。

```ts
declare module "hot-new-module";
```

简写模块里所有导出的类型将是 `any`。

## 内置对象

### ECMAScript 的内置对象

JavaScript 中有很多 [内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error("Error occurred");
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

### DOM 和 BOM 的内置对象

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function(e: MouseEvent) {
  // Do something
});
```

### 用 TypeScript 写 Node.js

TypeScript 核心库的定义中不包含 Node.js 部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```bash
npm install @types/node --save-dev
```

## 字符串字面量形式

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type TimePeriod = "AM" | "PM";

let timePeriod: TimePeriod;
timePeriod = "AM";
```

## 枚举

枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

枚举使用 `enum` 关键字来定义：

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
```

枚举成员会被赋值为从 `0` 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：

```ts
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true
```

## 声明合并

### 函数的合并

[使用重载定义多个函数类型](#重载)

### 接口的合并

```ts
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}
```

相当于

```ts
interface Alarm {
  price: number;
  weight: number;
}
```

::: warning 注意
合并的属性的类型必须是唯一的。
:::

```ts {5}
interface Alarm {
  price: number;
}
interface Alarm {
  price: string; // 类型不一致，会报错
  weight: number;
}
```

### 类的合并

同接口

## 参考（搬运）

- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)
- [TypeScript 中文网](https://www.tslang.cn/docs/home.html)
- [TypeScript 官网](https://www.typescriptlang.org/)
