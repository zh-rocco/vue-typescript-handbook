---
sidebar: auto
sidebarDepth: 3
prev: ./decorator.md
next: false
---

# 其他

## `declare interface` 和 `interface` 的区别

无区别，因为 `interface` 默认就是 `declare`，[详见](https://stackoverflow.com/questions/38683155/difference-between-interface-and-declare-interface)。

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

## `tsconfig.json` 配置详解

### 基础

`tsconfig.json`

```js
{
  "compilerOptions": {},                    // 编译选项
  "include": [],                            // 包含的目录
  "exclude": []                             // 排除的目录
}
```

### 编译选项

```js
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

### 参考

- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9)
