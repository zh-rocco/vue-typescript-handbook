---
sidebarDepth: 1
prev: false
next: ./class.md
---

# 类型基础

## 示例

**JS 语法**

```js
let isPending = true;
let num = 10;
let str = "Rocco";
let u = undefined;
let n = null;
let arr = [1, 2, 3];
let obj = { a: 1, b: 2, c: 3 };
```

**TS 语法**

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

## 原始数据类型

| JavaScript 数据类型 | TypeScript 类型 |
| :-----------------: | :-------------: |
|       布尔值        |    `boolean`    |
|        数值         |    `number`     |
|       字符串        |    `string`     |
|      空值 `*`       |     `void`      |
|        null         |     `null`      |
|      undefined      |   `undefined`   |

**说明：**

::: warning 注意
声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined`。

`undefined` 类型的变量只能被赋值为 `undefined`，`null` 类型的变量只能被赋值为 `null`。
:::

::: tip
在任意值上访问任何属性都是允许的，也允许调用任何方法。

声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
:::

## 类型推断

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

## 对象的类型

使用关键字 `interfaces` 来定义对象的类型。

```ts
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};
```

下面的写法也可以，比较灵活，但是无法复用。

```ts
let tom: {
  name: string;
  age: number;
} = {
  name: "Tom",
  age: 25,
};
```

### 可选属性

```ts {3}
interface Person {
  name: string;
  age?: number;
}
```

### 任意属性

```ts {4}
interface Person {
  name: string;
  age?: number;
  [propName: string]: string;
}
```

上面的写法有类型错误。

::: warning 注意
一旦定义了任意属性，那么确定属性和可选属性都必须是它的子属性。
:::

修改

```ts {4,6}
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}
```

### 只读属性

```ts {2}
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
```

### 接口继承

使用 `extends` 可以实现接口继承。

#### 接口继承接口

```ts
interface Alarm {
  alert();
}

interface LightableAlarm extends Alarm {
  lightOn();
  lightOff();
}
```

#### 接口继承类

```ts
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

## 数组的类型

### 「类型 + 方括号」表示法

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
let f: (number | string)[] = [1, 1, 2, 3, "5"];
```

### 泛型表示法

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

### 接口表示法

```ts
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

## 函数的类型

### 函数声明

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

::: tip
输入多余的（或者少于要求的）参数，是不被允许的。
:::

### 用接口定义函数的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

如果函数还有自己的类型和方法：

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {};
  counter.interval = 123;
  counter.reset = function() {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 可选参数

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");
```

::: warning 注意
可选参数后面不允许再出现必须参数。
:::

### 重载

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(
      x
        .toString()
        .split("")
        .reverse()
        .join(""),
    );
  } else if (typeof x === "string") {
    return x
      .split("")
      .reverse()
      .join("");
  }
}
```

## 联合类型

联合类型使用 `|` 分隔每个类型。

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
```

## 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 语法

`<类型>值` 或 `值 as 类型`

::: tip
推荐使用 `值 as 类型`，兼容性更好，支持 `tsx`。
:::

### 示例

`<类型>值`：

```ts
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```

`值 as 类型`：

```ts
function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
```

::: danger 警告
类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的。
:::

```ts
function toBoolean(something: string | number): boolean {
  return <boolean>something;
}
```

## 参考（搬运）

- [TypeScript 入门教程](https://github.com/xcatliu/typescript-tutorial)
- [TypeScript 中文网](https://www.tslang.cn/docs/home.html)
- [TypeScript 官网](https://www.typescriptlang.org/)
